# Guia de Assets Visuales - Samm Nailstudio

Esta carpeta contiene todos los recursos visuales del catalogo, modal de configuracion y servicios.

## Estructura de Directorios

```text
public/images/
├── medidas/       # Guia visual de longitudes de unas
├── formas/        # Puntas y siluetas (coffin, stiletto, almendra, clasica)
├── disenos/       # Niveles de Nail Art (Nivel 1, 2 y 3)
├── efectos/       # Efectos especiales (Aurora, Baby Boomer, etc.)
├── servicios/     # Fotos principales de cada servicio de la carta
└── salon/         # Ambiente, cabina de atencion y detalles del estudio
```

---

## 1. Medidas (`public/images/medidas/`)
- `largo-1-3.webp`: Largo #1 a #3 (1.2 - 1.6 cm) - Natural / Oficina.
- `largo-4.webp`: Largo #4 (1.8 - 2.0 cm) - Medio estilizado (+S/ 8).
- `largo-5.webp`: Largo #5 (2.2 - 2.5 cm) - Glamour de salon (+S/ 15).
- `largo-6.webp`: Largo #6 (2.8 - 3.2 cm) - XL Editorial (+S/ 22).

**Dimensiones recomendadas:** 600 x 600 px (1:1) o 600 x 450 px (4:3).
**Peso maximo:** < 60 KB.

---

## 2. Formas (`public/images/formas/`)
- `forma-clasica.webp`: Cuadrada, redonda u oval (Incluida).
- `forma-coffin.webp`: Bailarina / Coffin marcada (+S/ 5).
- `forma-stiletto.webp`: Aguja afilada (+S/ 5).
- `forma-almond.webp`: Almendra rusa estilizada (+S/ 5).

**Dimensiones recomendadas:** 600 x 600 px (1:1).
**Peso maximo:** < 60 KB.

---

## 3. Disenos / Nail Art (`public/images/disenos/`)
- `nivel-1.webp`: Nivel 1 Basico (Stickers, foil, fineline, 1-2 cristales).
- `nivel-2.webp`: Nivel 2 Intermedio (Mano alzada, ondas, aura, francesa doble).
- `nivel-3.webp`: Nivel 3 Avanzado (Estructura 3D, relieves, pedreria cluster).

**Dimensiones recomendadas:** 800 x 600 px (4:3).
**Peso maximo:** < 80 KB.

---

## 4. Efectos y Acabados (`public/images/efectos/`)
- `color-entero.webp`: Esmaltado uniforme (Incluido).
- `francesa.webp`: Francesa clasica (Incluida).
- `aurora.webp`: Efecto Aurora / Glaseado / Espejo / Ojo de gato (+S/ 8).
- `babyboomer.webp`: Degradado ombré difuminado (+S/ 12).

---

## Optimizacion Automatica
Para convertir imagenes JPG o PNG a WebP y comprimirlas automaticamente, ejecuta desde la raiz del frontend:

```bash
python scripts/optimizar_imagenes.py
```
