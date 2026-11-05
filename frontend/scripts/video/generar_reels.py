"""
Generador de reels de marca para Samm Nail Studio (placeholder hasta tener video real).

Motor: NumPy + Pillow dibujan cada fotograma y se envian en crudo a FFmpeg (H.264).
Todo es open source y local. Salida en frontend/public/videos/.

Uso:
    python generar_reels.py                 # renderiza manos y pies (MP4 + poster JPG)
    python generar_reels.py manos           # solo uno
    python generar_reels.py --preview 1 4 9 # guarda PNG de esos segundos (control de calidad)
"""

import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS, DUR = 720, 1280, 30, 12.0
SS = 3  # supermuestreo para bordes suaves
ROOT = Path(__file__).resolve().parent
FONTS = ROOT / "fonts"
OUT = ROOT.parents[1] / "public" / "videos"

# Paleta de la web (globals.css)
ESPRESSO = (20, 16, 14)
ROSE = (200, 146, 123)
CREAM = (250, 248, 245)
MUTED = (200, 189, 180)
BARE = (238, 216, 206)

# ---------------------------------------------------------------------------
# Utilidades de tiempo
# ---------------------------------------------------------------------------
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def seg(t, a, b):
    return clamp((t - a) / (b - a))


def eo(x):
    return 1 - (1 - x) ** 3


def eio(x):
    return x * x * (3 - 2 * x)


def lerp(a, b, x):
    return a + (b - a) * x


def window(t, t0, t1, fade_in=0.6, fade_out=0.45):
    """Opacidad de un elemento visible entre t0 y t1."""
    return eo(seg(t, t0, t0 + fade_in)) * (1 - eio(seg(t, t1 - fade_out, t1)))


def sstep(x, a, b):
    x = np.clip((x - a) / (b - a), 0, 1)
    return x * x * (3 - 2 * x)


# ---------------------------------------------------------------------------
# Texto
# ---------------------------------------------------------------------------
def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


F_TAG = font("plus-jakarta-sans-latin-700-normal.ttf", 17)
F_TITLE = font("cormorant-garamond-latin-300-normal.ttf", 82)
F_SUB = font("plus-jakarta-sans-latin-400-normal.ttf", 21)
F_LABEL = font("cormorant-garamond-latin-400-italic.ttf", 46)
F_SMALL = font("plus-jakarta-sans-latin-700-normal.ttf", 14)
F_STEP = font("cormorant-garamond-latin-500-normal.ttf", 38)
F_STEPN = font("plus-jakarta-sans-latin-700-normal.ttf", 15)

_text_cache = {}


def text_mask(txt, fnt, tracking=0):
    key = (txt, id(fnt), tracking)
    if key in _text_cache:
        return _text_cache[key]
    asc, desc = fnt.getmetrics()
    if tracking == 0:
        width = int(fnt.getlength(txt)) + 8
        m = Image.new("L", (width, asc + desc + 8), 0)
        ImageDraw.Draw(m).text((4, 4), txt, font=fnt, fill=255)
    else:
        widths = [fnt.getlength(c) for c in txt]
        width = int(sum(widths) + tracking * (len(txt) - 1)) + 8
        m = Image.new("L", (width, asc + desc + 8), 0)
        d, x = ImageDraw.Draw(m), 4
        for c, wd in zip(txt, widths):
            d.text((x, 4), c, font=fnt, fill=255)
            x += wd + tracking
    _text_cache[key] = m
    return m


def put_text(frame, txt, fnt, cx, cy, col, alpha, tracking=0, rise=18, left=False):
    if alpha <= 0.004:
        return
    m = text_mask(txt, fnt, tracking)
    if alpha < 0.999:
        lut = [int(v * alpha) for v in range(256)]
        m = m.point(lut)
    dy = (1 - alpha) * rise
    x = cx if left else cx - m.width / 2
    frame.paste(Image.new("RGB", m.size, col), (int(x), int(cy - m.height / 2 + dy)), m)


# ---------------------------------------------------------------------------
# Formas suaves (poligonos con supermuestreo)
# ---------------------------------------------------------------------------
def poly_mask(pts, pad=4):
    x0, y0 = np.floor(pts.min(0)).astype(int) - pad
    x1, y1 = np.ceil(pts.max(0)).astype(int) + pad
    bw, bh = int(x1 - x0), int(y1 - y0)
    m = Image.new("L", (bw * SS, bh * SS), 0)
    ImageDraw.Draw(m).polygon([((x - x0) * SS, (y - y0) * SS) for x, y in pts], fill=255)
    return m.resize((bw, bh), Image.LANCZOS), int(x0), int(y0)


def paste_color(frame, col, mask, x, y, alpha=1.0):
    if alpha <= 0.004:
        return
    if alpha < 0.999:
        mask = mask.point([int(v * alpha) for v in range(256)])
    frame.paste(Image.new("RGB", mask.size, col), (x, y), mask)


def paste_array(frame, rgb, alpha, x, y):
    """rgb: HxWx3 float, alpha: HxW 0..1"""
    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    m = Image.fromarray(np.clip(alpha * 255, 0, 255).astype(np.uint8), "L")
    frame.paste(img, (x, y), m)


def superellipse(rx, ry, p, n=72, cx=0.0, cy=0.0):
    a = np.linspace(0, 2 * np.pi, n, endpoint=False)
    c, s = np.cos(a), np.sin(a)
    x = rx * np.sign(c) * np.abs(c) ** (2 / p)
    y = ry * np.sign(s) * np.abs(s) ** (2 / p)
    return np.stack([x + cx, y + cy], 1)


def transform(pts, angle_deg, tx, ty, scale=1.0):
    a = math.radians(angle_deg)
    ca, sa = math.cos(a), math.sin(a)
    x, y = pts[:, 0] * scale, pts[:, 1] * scale
    return np.stack([x * ca - y * sa + tx, x * sa + y * ca + ty], 1)


# ---------------------------------------------------------------------------
# Geometria de uña (con morphing entre formas)
# ---------------------------------------------------------------------------
SHAPES = {
    #            alto lateral, ancho punta, exponente punta
    "cuadrada": (0.84, 1.00, 7.0),
    "almendra": (0.52, 0.94, 1.55),
    "coffin": (0.84, 0.64, 7.0),
    "stiletto": (0.40, 0.92, 1.05),
    "pedi": (0.50, 0.98, 2.8),
}


def nail_outline(shape, w, L, n_arc=14, n_side=22, n_tip=30):
    """Contorno en coordenadas locales: cuticula en (0,0), punta en (0,-L)."""
    ys_r, wt_r, p = SHAPES[shape] if isinstance(shape, str) else shape
    b = w * 0.20
    phi = np.linspace(0, np.pi / 2, n_arc, endpoint=False)
    arc = np.stack([(w / 2) * np.sin(phi), b * np.cos(phi)], 1)
    ys = L * ys_r
    s = np.linspace(0, 1, n_side, endpoint=False)
    side = np.stack([lerp(w / 2, w * wt_r / 2, s ** 1.4), -ys * s], 1)
    a = np.linspace(0, np.pi / 2, n_tip)
    wt = w * wt_r / 2
    tip = np.stack([wt * np.cos(a) ** (2 / p), -ys - (L - ys) * np.sin(a) ** (2 / p)], 1)
    right = np.concatenate([arc, side, tip])
    left = right[1:-1][::-1] * np.array([-1, 1])
    return np.concatenate([right, left])


def morph_shape(a, b, x):
    pa, pb = np.array(SHAPES[a]), np.array(SHAPES[b])
    return tuple(lerp(pa, pb, x))


# ---------------------------------------------------------------------------
# Render de una uña con esmalte liquido, brillo y cromado
# ---------------------------------------------------------------------------
def shade(col, d, q, t, kind):
    if kind == "chrome":
        band = 0.5 + 0.5 * np.sin(d * 4.2 + q * 0.6 + t * 2.0)
        side = 0.75 + 0.25 * np.cos(np.clip(q, -1, 1) * np.pi / 2)
        dark, light = np.array([140, 92, 74.0]), np.array([246, 222, 204.0])
        rgb = (dark + (light - dark) * (band ** 1.3)[..., None]) * side[..., None]
    else:
        c = np.array(col, np.float32)
        k = (0.78 + 0.22 * np.cos(np.clip(q, -1, 1) * np.pi / 2)) * (0.92 + 0.12 * np.clip(d, 0, 1))
        rgb = c * k[..., None]
    return rgb


def draw_nail(frame, shape, w, L, angle, bx, by, t, old, new, p, gloss=1.0, sweep=None, french=0.0):
    pts = transform(nail_outline(shape, w, L), angle, bx, by)
    mask, x0, y0 = poly_mask(pts, pad=14)
    M = np.asarray(mask, np.float32) / 255
    hh, ww = M.shape

    # Sombra suave
    sh = mask.point([int(v * 0.42) for v in range(256)]).filter(ImageFilter.GaussianBlur(7))
    frame.paste(Image.new("RGB", sh.size, (6, 4, 3)), (x0 + 4, y0 + 9), sh)

    yy, xx = np.mgrid[0:hh, 0:ww].astype(np.float32)
    xx += x0 + 0.5
    yy += y0 + 0.5
    a = math.radians(angle)
    ax, ay = math.sin(a), -math.cos(a)  # cuticula -> punta
    px, py = -ay, ax
    d = ((xx - bx) * ax + (yy - by) * ay) / L
    q = ((xx - bx) * px + (yy - by) * py) / (w / 2)

    old_col, old_kind = old
    new_col, new_kind = new
    rgb_old = shade(old_col, d, q, t, old_kind) if old_col else np.zeros((hh, ww, 3), np.float32) + np.array(BARE, np.float32)
    rgb_new = shade(new_col, d, q, t, new_kind)

    thr = p * 1.45 - 0.25 + 0.035 * np.sin(q * 4.0 + t * 7.0)
    F = np.clip((thr - d) / 0.05, 0, 1) if p < 1 else np.ones_like(d)
    rgb = rgb_old * (1 - F[..., None]) + rgb_new * F[..., None]
    a_old = 0.22 if old_col is None else 1.0
    alpha = M * (a_old * (1 - F) + F)

    # Menisco brillante en el frente del liquido
    if 0 < p < 1:
        front = np.exp(-(((d - thr) / 0.035) ** 2)) * M
        rgb += (255 - rgb) * (front * 0.45)[..., None]

    # Punta francesa
    if french > 0:
        tip_line = 1.0 - 0.26 * french + 0.10 * q ** 2
        FT = np.clip((d - tip_line) / 0.03, 0, 1)
        rgb = rgb * (1 - FT[..., None]) + np.array([252, 248, 244.0]) * FT[..., None]
        alpha = np.maximum(alpha, M * FT)

    # Brillo de gel (franja) y barrido de luz
    painted = np.maximum(F, 0.0 if old_col is None else 1.0)
    g = np.exp(-(((q + 0.42) / 0.17) ** 2)) * sstep(d, 0.10, 0.30) * (1 - sstep(d, 0.74, 0.94)) * 0.5 * gloss * painted
    rgb += (255 - rgb) * g[..., None]
    if sweep is not None:
        sw = np.exp(-(((d - sweep + q * 0.12) / 0.09) ** 2)) * 0.5 * painted
        rgb += (255 - rgb) * sw[..., None]

    # Contorno fino (sobre todo visible en uña desnuda)
    edge = np.clip(M * (1 - M) * 4, 0, 1)
    rgb = rgb * (1 - edge[..., None] * 0.6) + np.array(ROSE, np.float32) * edge[..., None] * 0.6
    alpha = np.maximum(alpha, edge * 0.7)

    paste_array(frame, rgb, alpha, x0, y0)
    return pts


# ---------------------------------------------------------------------------
# Fondos, particulas, destellos
# ---------------------------------------------------------------------------
LW, LH = 180, 320
_vy, _vx = np.mgrid[0:LH, 0:LW].astype(np.float32)
U, V = _vx / LW, _vy / LH


def glow_bg(t, top, bottom, glows):
    base = np.array(top, np.float32) * (1 - V[..., None]) + np.array(bottom, np.float32) * V[..., None]
    for cx, cy, r, col, amp in glows:
        d2 = (U - cx) ** 2 + ((V - cy) * (H / W)) ** 2
        base += np.exp(-d2 / (r * r))[..., None] * np.array(col, np.float32) * amp
    vig = 1 - 0.55 * (((U - 0.5) * 1.3) ** 2 + ((V - 0.5) * 1.1) ** 2)
    base *= vig[..., None]
    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)


def water_bg(t):
    x, y = U * 9.0, V * 16.0
    v = np.sin(x * 1.3 + t * 0.9) + np.sin(y * 0.8 - t * 1.1 + x * 0.4) + np.sin((x + y) * 0.7 + t * 0.6)
    caustic = np.exp(-(v ** 2) * 2.2)
    top, bottom = np.array([34, 24, 22.0]), np.array([16, 12, 11.0])
    base = top * (1 - V[..., None]) + bottom * V[..., None]
    base += caustic[..., None] * np.array([200, 146, 123.0]) * 0.22 * (0.5 + 0.5 * V[..., None])
    d2 = (U - 0.5) ** 2 + ((V - 0.52) * 1.6) ** 2
    base += np.exp(-d2 / 0.09)[..., None] * np.array([120, 80, 66.0]) * 0.55
    vig = 1 - 0.6 * (((U - 0.5) * 1.3) ** 2 + ((V - 0.5) * 1.1) ** 2)
    base *= vig[..., None]
    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)


def soft_disc(r):
    s = int(r * 4)
    yy, xx = np.mgrid[0:s, 0:s].astype(np.float32) - s / 2
    dd = np.sqrt(xx ** 2 + yy ** 2) / r
    a = np.clip(1.15 - dd, 0, 1) ** 1.6 * 0.85 + np.exp(-(dd ** 2) * 1.5) * 0.15
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8), "L")


def ring_sprite(r):
    s = int(r * 2 + 8)
    m = Image.new("L", (s * SS, s * SS), 0)
    dr = ImageDraw.Draw(m)
    c = s * SS / 2
    dr.ellipse([c - r * SS, c - r * SS, c + r * SS, c + r * SS], outline=200, width=int(1.6 * SS))
    dr.ellipse([c - r * 0.55 * SS, c - r * 0.75 * SS, c - r * 0.15 * SS, c - r * 0.35 * SS], fill=170)
    return m.resize((s, s), Image.LANCZOS)


def star_sprite(R):
    s = int(R * 3)
    big = Image.new("L", (s * SS, s * SS), 0)
    c = s * SS / 2
    pts = []
    for i in range(8):
        rr = (R if i % 2 == 0 else R * 0.16) * SS
        a = i * math.pi / 4 - math.pi / 2
        pts.append((c + rr * math.cos(a), c + rr * math.sin(a)))
    ImageDraw.Draw(big).polygon(pts, fill=255)
    m = big.resize((s, s), Image.LANCZOS)
    glow = soft_disc(R * 0.45).resize((s, s))
    return Image.fromarray(np.maximum(np.asarray(m), (np.asarray(glow) * 0.55).astype(np.uint8)), "L")


class Particles:
    def __init__(self, n, seed, rmin, rmax, speed, kind="bokeh"):
        rng = np.random.default_rng(seed)
        self.x = rng.uniform(0, W, n)
        self.y = rng.uniform(0, H, n)
        self.r = rng.uniform(rmin, rmax, n)
        self.a = rng.uniform(0.10, 0.38, n)
        self.ph = rng.uniform(0, 2 * np.pi, n)
        self.sp = rng.uniform(0.5, 1.0, n) * speed
        self.col = [ROSE if rng.random() < 0.6 else CREAM for _ in range(n)]
        maker = soft_disc if kind == "bokeh" else ring_sprite
        self.sprites = [maker(r) for r in self.r]

    def draw(self, frame, t, alpha=1.0):
        for i in range(len(self.r)):
            y = (self.y[i] - t * self.sp[i] * 30) % (H + 160) - 80
            x = self.x[i] + math.sin(t * 0.6 + self.ph[i]) * 18
            tw = 0.75 + 0.25 * math.sin(t * 1.7 + self.ph[i])
            sp = self.sprites[i]
            paste_color(frame, self.col[i], sp, int(x - sp.width / 2), int(y - sp.height / 2), self.a[i] * tw * alpha)


def draw_ring(frame, cx, cy, r, ry, col, alpha, width=2.0):
    if alpha <= 0.004 or r < 2:
        return
    bw, bh = int(r * 2 + 10), int(ry * 2 + 10)
    m = Image.new("L", (bw * SS, bh * SS), 0)
    ImageDraw.Draw(m).ellipse([5 * SS, 5 * SS, (bw - 5) * SS, (bh - 5) * SS], outline=255, width=max(1, int(width * SS)))
    m = m.resize((bw, bh), Image.LANCZOS)
    paste_color(frame, col, m, int(cx - bw / 2), int(cy - bh / 2), alpha)


def pill(frame, cx, cy, w, h, col, alpha):
    if alpha <= 0.004:
        return
    m = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle([1, 1, w * SS - 2, h * SS - 2], radius=h * SS // 2, outline=255, width=int(1.5 * SS))
    m = m.resize((w, h), Image.LANCZOS)
    paste_color(frame, col, m, int(cx - w / 2), int(cy - h / 2), alpha)


def fade_black(frame, k):
    if k >= 0.999:
        return frame
    return Image.blend(Image.new("RGB", frame.size, ESPRESSO), frame, max(0.0, k))


def nail_state(events, t, start_offset):
    """events: [(t0, dur, (color, kind))]. Devuelve (anterior, nuevo, progreso)."""
    prev, cur, p = (None, "gel"), (None, "gel"), 1.0
    for t0, dur, paint in events:
        s = t0 + start_offset
        if t >= s:
            prev, cur = cur, paint
            p = eo(seg(t, s, s + dur))
    if cur[0] is None and cur[1] != "chrome":
        return (None, "gel"), (BARE, "gel"), 0.0
    return prev, cur, p


# ---------------------------------------------------------------------------
# REEL 1 · MANOS
# ---------------------------------------------------------------------------
MANOS_NAILS = [  # angulo, ancho, largo
    (-27, 68, 170), (-13.5, 80, 205), (0, 87, 222), (13.5, 80, 207), (27, 70, 178)
]
PIVOT = (360, 1265)
RADIUS = 480
NUDE, ROSE_GEL, BERRY = (232, 196, 180), (214, 150, 140), (122, 62, 72)
MANOS_PAINT = [(1.2, 1.2, (NUDE, "gel")), (3.2, 1.0, (ROSE_GEL, "gel")), (4.5, 1.0, (BERRY, "gel")), (8.5, 0.9, ((0, 0, 0), "chrome"))]
MANOS_SHAPES = [(0.0, "almendra"), (5.7, "cuadrada"), (6.4, "coffin"), (7.1, "stiletto"), (7.8, "almendra")]
SHAPE_LABEL = {"cuadrada": "Cuadrada", "almendra": "Almendra", "coffin": "Coffin", "stiletto": "Stiletto"}

bokeh_manos = Particles(34, 7, 6, 26, 0.55)
star = star_sprite(13)
_rng_s = np.random.default_rng(3)
SPARKS = [(float(_rng_s.uniform(150, 570)), float(_rng_s.uniform(470, 820)), float(_rng_s.uniform(8.8, 10.4))) for _ in range(14)]


def shape_at(t):
    cur = MANOS_SHAPES[0][1]
    for i in range(len(MANOS_SHAPES) - 1, 0, -1):
        t0, sh = MANOS_SHAPES[i]
        if t >= t0:
            x = eio(seg(t, t0, t0 + 0.45))
            return morph_shape(MANOS_SHAPES[i - 1][1], sh, x), (sh if x > 0.5 else MANOS_SHAPES[i - 1][1])
    return SHAPES[cur], cur


def frame_manos(t):
    sway = math.sin(t * 0.5) * 0.08
    fr = glow_bg(t, (30, 22, 20), (14, 11, 10), [
        (0.5 + 0.18 * math.sin(t * 0.35), 0.45 + 0.05 * math.cos(t * 0.3), 0.33, ROSE, 0.42),
        (0.15, 0.1, 0.35, (122, 62, 72), 0.3),
    ])
    bokeh_manos.draw(fr, t)

    # Cabecera
    put_text(fr, "SAMM NAIL STUDIO", F_TAG, W / 2, 140, ROSE, window(t, 0.2, 11.6), tracking=7, rise=0)
    put_text(fr, "Manicura Rusa", F_TITLE, W / 2, 228, CREAM, window(t, 0.6, 9.9))
    put_text(fr, "Cutícula impecable · Acabado espejo", F_SUB, W / 2, 302, MUTED, window(t, 0.9, 9.9))
    put_text(fr, "Tu set, a tu medida", F_TITLE, W / 2, 228, CREAM, window(t, 10.1, 11.7))
    put_text(fr, "Gel · Estructura · Nail Art", F_SUB, W / 2, 302, MUTED, window(t, 10.3, 11.7))

    shape, shape_name = shape_at(t)
    intro = eo(seg(t, 0.15, 1.1))
    sweep = lerp(-0.4, 1.5, seg(t, 9.0, 10.0)) if 9.0 <= t <= 10.0 else None
    for i, (ang, w, L) in enumerate(MANOS_NAILS):
        a = ang * lerp(0.6, 1.0, intro) + sway * (i - 2)
        r = RADIUS + (1 - intro) * 40
        bx = PIVOT[0] + r * math.sin(math.radians(a))
        by = PIVOT[1] - r * math.cos(math.radians(a))
        old, new, p = nail_state(MANOS_PAINT, t, i * 0.09)
        draw_nail(fr, shape, w, L, a, bx, by, t, old, new, p, sweep=sweep)

    # Destellos del cromado
    for sx, sy, st in SPARKS:
        k = math.sin(math.pi * seg(t, st, st + 0.7))
        if k > 0:
            paste_color(fr, CREAM, star, int(sx - star.width / 2), int(sy - star.height / 2), k * 0.95)

    # Etiquetas inferiores (tono / forma)
    labels = [
        (1.3, 3.1, "TONO", "Nude Milky"),
        (3.3, 4.4, "TONO", "Rosé Glaze"),
        (4.6, 5.6, "TONO", "Berry Glaze"),
        (5.75, 8.4, "FORMA", SHAPE_LABEL[shape_name]),
        (8.6, 9.9, "ACABADO", "Rosewood Chrome"),
    ]
    for t0, t1, cap, txt in labels:
        a = window(t, t0, t1, 0.35, 0.3)
        if cap == "FORMA" and t0 <= t < t1:
            a = window(t, t0, t1, 0.35, 0.3)
        put_text(fr, cap, F_SMALL, W / 2, 1010, ROSE, a, tracking=5, rise=8)
        put_text(fr, txt, F_LABEL, W / 2, 1060, CREAM, a, rise=12)

    a_cta = window(t, 10.4, 11.75, 0.5, 0.4)
    pill(fr, W / 2, 1070, 330, 64, ROSE, a_cta)
    put_text(fr, "RESERVA TU CITA", F_SMALL, W / 2, 1069, CREAM, a_cta, tracking=5, rise=6)

    return fade_black(fr, eo(seg(t, 0, 0.5)) * (1 - eio(seg(t, 11.55, 12.0))))


# ---------------------------------------------------------------------------
# REEL 2 · PIES
# ---------------------------------------------------------------------------
PIES_TOES = [  # x, y, angulo, ancho, largo
    (205, 700, -7, 118, 112), (330, 652, -3, 80, 76), (424, 660, 3, 70, 66), (506, 684, 8, 60, 56), (578, 722, 13, 50, 46)
]
BLUSH_GEL, CHERRY = (236, 190, 176), (158, 43, 58)
PIES_PAINT = [(3.6, 1.1, (BLUSH_GEL, "gel")), (6.4, 1.1, (CHERRY, "gel"))]
bubbles = Particles(22, 11, 5, 14, 1.3, kind="ring")
bokeh_pies = Particles(18, 5, 8, 24, 0.35)
_rng_p = np.random.default_rng(9)
PETALS = [(float(_rng_p.uniform(60, 660)), float(_rng_p.uniform(0, H)), float(_rng_p.uniform(0, 360)), float(_rng_p.uniform(14, 26))) for _ in range(7)]


def draw_toe(frame, w, L, angle, bx, by, alpha):
    pts = transform(superellipse(w * 0.74, L * 1.55, 2.6, cy=L * 0.42), angle, bx, by)
    mask, x0, y0 = poly_mask(pts, pad=6)
    M = np.asarray(mask, np.float32) / 255
    hh, ww = M.shape
    yy = np.mgrid[0:hh, 0:ww][0].astype(np.float32) + y0
    fade = 1 - sstep((yy - by) / (L * 1.9), 0.25, 1.0)
    rgb = np.zeros((hh, ww, 3), np.float32) + np.array([196, 150, 130.0])
    paste_array(frame, rgb, M * fade * 0.20 * alpha, x0, y0)


def frame_pies(t):
    fr = water_bg(t)
    bokeh_pies.draw(fr, t, 0.8)
    bubbles.draw(fr, t, 0.7)

    for i, (px, py, rot, sz) in enumerate(PETALS):
        y = (py + t * 26) % (H + 100) - 50
        x = px + math.sin(t * 0.7 + i) * 30
        pts = transform(superellipse(sz, sz * 0.55, 1.6, n=40), rot + t * 20 * (1 if i % 2 else -1), x, y)
        m, x0, y0 = poly_mask(pts)
        paste_color(fr, (226, 160, 150) if i % 2 else (240, 205, 196), m, x0, y0, 0.55)

    # Ondas de agua
    for t0, cx, cy in [(1.3, 205, 760), (4.0, 424, 720), (6.9, 330, 710)]:
        for k in range(3):
            x = seg(t, t0 + k * 0.25, t0 + k * 0.25 + 1.8)
            if 0 < x < 1:
                draw_ring(fr, cx, cy, lerp(10, 300, eo(x)), lerp(4, 90, eo(x)), CREAM, (1 - x) * 0.35)

    put_text(fr, "SAMM NAIL STUDIO", F_TAG, W / 2, 140, ROSE, window(t, 0.2, 11.6), tracking=7, rise=0)
    put_text(fr, "Pedicura Spa", F_TITLE, W / 2, 228, CREAM, window(t, 0.6, 9.9))
    put_text(fr, "Un ritual de cuidado para tus pies", F_SUB, W / 2, 302, MUTED, window(t, 0.9, 9.9))
    put_text(fr, "Pies de revista", F_TITLE, W / 2, 228, CREAM, window(t, 10.1, 11.7))
    put_text(fr, "Spa · Exfoliación · Gel", F_SUB, W / 2, 302, MUTED, window(t, 10.3, 11.7))

    intro = eo(seg(t, 0.2, 1.2))
    french = eio(seg(t, 8.6, 9.5))
    sweep = lerp(-0.4, 1.5, seg(t, 9.4, 10.3)) if 9.4 <= t <= 10.3 else None
    for i, (bx, by, ang, w, L) in enumerate(PIES_TOES):
        by2 = by + (1 - intro) * 50 + math.sin(t * 0.8 + i * 0.7) * 3
        draw_toe(fr, w, L, ang, bx, by2, intro)
    for i, (bx, by, ang, w, L) in enumerate(PIES_TOES):
        by2 = by + (1 - intro) * 50 + math.sin(t * 0.8 + i * 0.7) * 3
        old, new, p = nail_state(PIES_PAINT, t, i * 0.1)
        draw_nail(fr, "pedi", w, L, ang, bx, by2, t, old, new, p, sweep=sweep, french=french if t > 8.6 else 0.0)

    steps = [("01", "Baño aromático", 1.5), ("02", "Exfoliación suave", 2.1), ("03", "Esmaltado en gel", 2.7)]
    for n, (num, txt, t0) in enumerate(steps):
        a = window(t, t0, 6.0, 0.5, 0.4)
        y = 960 + n * 78
        put_text(fr, num, F_STEPN, 205, y + 2, ROSE, a, tracking=3, rise=10, left=True)
        put_text(fr, txt, F_STEP, 250, y, CREAM, a, rise=10, left=True)

    labels = [(6.4, 8.5, "TONO", "Cherry Gel"), (8.6, 9.9, "ESTILO", "Francesa Clásica")]
    for t0, t1, cap, txt in labels:
        a = window(t, t0, t1, 0.35, 0.3)
        put_text(fr, cap, F_SMALL, W / 2, 1010, ROSE, a, tracking=5, rise=8)
        put_text(fr, txt, F_LABEL, W / 2, 1060, CREAM, a, rise=12)

    a_cta = window(t, 10.4, 11.75, 0.5, 0.4)
    pill(fr, W / 2, 1070, 330, 64, ROSE, a_cta)
    put_text(fr, "RESERVA TU CITA", F_SMALL, W / 2, 1069, CREAM, a_cta, tracking=5, rise=6)

    return fade_black(fr, eo(seg(t, 0, 0.5)) * (1 - eio(seg(t, 11.55, 12.0))))


# ---------------------------------------------------------------------------
# Salida
# ---------------------------------------------------------------------------
REELS = {"manos": frame_manos, "pies": frame_pies}
POSTER_T = {"manos": 7.0, "pies": 9.9}


def render(name):
    fn = REELS[name]
    OUT.mkdir(parents=True, exist_ok=True)
    mp4 = OUT / f"samm-{name}.mp4"
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p",
           "-profile:v", "high", "-movflags", "+faststart", "-an", str(mp4)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = int(DUR * FPS)
    for f in range(n):
        proc.stdin.write(fn(f / FPS).tobytes())
        if f % 60 == 0:
            print(f"  {name}: {f}/{n}", flush=True)
    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit(f"[ERROR] ffmpeg fallo en {name}")
    fn(POSTER_T[name]).save(OUT / f"samm-{name}-poster.jpg", quality=86, optimize=True, progressive=True)
    print(f"[OK] {mp4} ({mp4.stat().st_size / 1e6:.1f} MB)")


def preview(times, out_dir):
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, fn in REELS.items():
        frames = [fn(t) for t in times]
        sheet = Image.new("RGB", (len(frames) * W // 2, H // 2), (0, 0, 0))
        for i, fr in enumerate(frames):
            sheet.paste(fr.resize((W // 2, H // 2), Image.LANCZOS), (i * W // 2, 0))
        sheet.save(out_dir / f"preview_{name}.png")
        print(f"[OK] {out_dir / f'preview_{name}.png'}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args and args[0] == "--preview":
        out = Path(args[args.index("--out") + 1]) if "--out" in args else ROOT / "preview"
        times = [float(a) for a in args[1:] if a.replace(".", "", 1).isdigit()]
        preview(times or [1.0, 2.5, 5.0, 7.0, 9.4, 11.0], out)
    else:
        for name in (args or list(REELS)):
            render(name)
