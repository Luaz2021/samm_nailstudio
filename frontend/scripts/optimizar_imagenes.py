#!/usr/bin/env python3
"""
Script de optimizacion de imagenes para Samm Nailstudio.
Convierte JPG/PNG a WebP con compresion visualmente sin perdida (82%)
y dimensionamiento inteligente respetando el presupuesto WebPerf.
"""

import sys
import os
from pathlib import Path
from PIL import Image

MAX_DIMENSION = 1200
WEBP_QUALITY = 82

def optimizar_archivo(ruta_origen: Path, mantener_original: bool = True) -> bool:
    if ruta_origen.suffix.lower() not in [".jpg", ".jpeg", ".png", ".bmp"]:
        return False

    ruta_destino = ruta_origen.with_suffix(".webp")
    peso_antes = ruta_origen.stat().st_size

    try:
        with Image.open(ruta_origen) as img:
            # Preservar canal alfa si existe (RGBA), o convertir a RGB
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            # Redimensionar si supera la dimension maxima
            ancho, alto = img.size
            if max(ancho, alto) > MAX_DIMENSION:
                ratio = MAX_DIMENSION / float(max(ancho, alto))
                nuevo_ancho = int(ancho * ratio)
                nuevo_alto = int(alto * ratio)
                img = img.resize((nuevo_ancho, nuevo_alto), Image.Resampling.LANCZOS)

            img.save(ruta_destino, "WEBP", quality=WEBP_QUALITY, method=6)

        peso_despues = ruta_destino.stat().st_size
        ahorro = ((peso_antes - peso_despues) / peso_antes) * 100

        print(
            f"[OK] {ruta_origen.name} -> {ruta_destino.name} | "
            f"{peso_antes / 1024:.1f} KB -> {peso_despues / 1024:.1f} KB (-{ahorro:.1f}%)"
        )

        if not mantener_original and ruta_origen != ruta_destino:
            ruta_origen.unlink()

        return True
    except Exception as e:
        print(f"[ERROR] No se pudo procesar {ruta_origen.name}: {e}")
        return False

def escanear_directorio(directorio: Path):
    if not directorio.exists():
        print(f"El directorio no existe: {directorio}")
        return

    archivos_procesados = 0
    print(f"Escaneando imagenes en: {directorio}...")
    for root, _, files in os.walk(directorio):
        for f in files:
            p = Path(root) / f
            if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".bmp"]:
                if optimizar_archivo(p):
                    archivos_procesados += 1

    print(f"\nProceso finalizado. Total imagenes convertidas: {archivos_procesados}")

if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent / "public" / "images"
    if len(sys.argv) > 1:
        target = Path(sys.argv[1]).resolve()
    else:
        target = base_dir

    escanear_directorio(target)
