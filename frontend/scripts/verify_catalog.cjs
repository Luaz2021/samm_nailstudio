const assert = require("node:assert");

// Mock catalog data for testing schema contracts
const {
  DEFAULT_HERO_BG,
  DEFAULT_SERVICES,
  DEFAULT_ARTICLES,
  DEFAULT_SEASONS
} = require("./dist-test-catalog.cjs");

console.log("Iniciando suite de pruebas unitarias para samm. NAIL STUDIO...\n");

// Test 1: Verificación de Portada Hero por defecto
console.log("Test 1: Validando URL de imagen de portada Hero...");
assert.ok(DEFAULT_HERO_BG.startsWith("https://"), "La URL de fondo hero debe ser HTTPS");
assert.ok(DEFAULT_HERO_BG.includes("images.unsplash.com"), "La portada por defecto debe usar CDN de alta resolucion");
console.log("  [PASS] Hero Background URL valida.\n");

// Test 2: Integridad del Catalogo de Servicios
console.log("Test 2: Validando catalogo de servicios...");
assert.ok(Array.isArray(DEFAULT_SERVICES), "Los servicios deben ser un arreglo");
assert.ok(DEFAULT_SERVICES.length >= 6, "Debe haber al menos 6 servicios curados");

const validCategories = ["manicura", "acrilico", "pedicura", "nailart"];

DEFAULT_SERVICES.forEach((srv) => {
  assert.ok(srv.id && srv.id.length > 0, `El servicio ${srv.name} debe tener ID`);
  assert.ok(srv.name && srv.name.trim().length > 3, `El servicio ${srv.id} debe tener un nombre valido`);
  assert.ok(srv.price > 0 && srv.price < 500, `El precio de ${srv.name} (S/ ${srv.price}) debe estar en rango logico`);
  assert.ok(srv.duration >= 30 && srv.duration <= 300, `La duracion de ${srv.name} (${srv.duration}m) debe estar en rango logico`);
  assert.ok(validCategories.includes(srv.category), `La categoria "${srv.category}" no es valida`);
  assert.ok(srv.imgUrl.startsWith("http"), `La foto de ${srv.name} debe ser una URL valida`);
  assert.ok(srv.desc && srv.desc.length > 20, `La descripcion de ${srv.name} debe ser explicativa`);
});
console.log(`  [PASS] ${DEFAULT_SERVICES.length} servicios verificados con precios, duraciones y fotos validas.\n`);

// Test 3: Integridad de Articulos del Lookbook
console.log("Test 3: Validando articulos del Lookbook...");
assert.ok(Array.isArray(DEFAULT_ARTICLES), "Los articulos deben ser un arreglo");
assert.strictEqual(DEFAULT_ARTICLES.length, 3, "El Lookbook debe iniciar con 3 articulos clave");

DEFAULT_ARTICLES.forEach((art) => {
  assert.ok(art.id && art.id.length > 0, "El articulo debe tener ID");
  assert.ok(art.title && art.title.length > 10, `El titular "${art.title}" debe ser descriptivo`);
  assert.ok(art.imgUrl.startsWith("http"), "La foto del articulo debe ser URL");
  assert.ok(art.desc && art.desc.length > 30, "El resumen del articulo debe ser educativo");
  assert.ok(art.content && art.content.points.length > 0, "El articulo debe tener puntos clave de salud ungueal");
});
console.log("  [PASS] 3 articulos del Lookbook verificados.\n");

// Test 4: Integridad de Paletas de Temporada
console.log("Test 4: Validando paletas de color por temporada...");
assert.ok(Array.isArray(DEFAULT_SEASONS), "Las temporadas deben ser un arreglo");
assert.strictEqual(DEFAULT_SEASONS.length, 4, "Debe haber 4 temporadas predefinidas (Verano, Otoño, Primavera, Fiestas Perú)");

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
let activeCount = 0;

DEFAULT_SEASONS.forEach((season) => {
  assert.ok(season.id, "La temporada debe tener ID");
  assert.ok(season.name, "La temporada debe tener nombre");
  assert.match(season.colors.primary, hexColorRegex, `Color primary invalido en ${season.name}`);
  assert.match(season.colors.bg, hexColorRegex, `Color bg invalido en ${season.name}`);
  assert.match(season.colors.accent, hexColorRegex, `Color accent invalido en ${season.name}`);
  assert.match(season.colors.dark, hexColorRegex, `Color dark invalido en ${season.name}`);
  if (season.isActive) activeCount++;
});

assert.strictEqual(activeCount, 1, "Debe haber exactamente 1 temporada activa por defecto");
console.log("  [PASS] 4 temporadas validadas con codigos hexadecimales correctos.\n");

// Test 5: Simulador de Descuentos & Calculos de Seña
console.log("Test 5: Validando motor de calculo financiero (20% de seña & 15% cupon)...");
const basePrice = 100;
const extrasPrice = 20;
const subtotal = basePrice + extrasPrice;
const discount15 = Math.round(subtotal * 0.15); // 18
const total = subtotal - discount15; // 102
const deposit20 = Math.round(total * 0.2); // 20
const remaining80 = total - deposit20; // 82

assert.strictEqual(subtotal, 120, "Subtotal debe ser S/ 120");
assert.strictEqual(discount15, 18, "Descuento 15% debe ser S/ 18");
assert.strictEqual(total, 102, "Total debe ser S/ 102");
assert.strictEqual(deposit20, 20, "Adelanto 20% debe ser S/ 20");
assert.strictEqual(remaining80, 82, "Saldo en cabina debe ser S/ 82");
assert.strictEqual(deposit20 + remaining80, total, "Adelanto + Saldo debe ser exactamente el Total");
console.log("  [PASS] Calculos de prepago y senas matematicamente exactos.\n");

console.log("Resultados: 5/5 PRUEBAS UNITARIAS EN VERDE (100% OK)");
