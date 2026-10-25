# Samm Nail Studio 💅✨

> Plataforma web de agendamiento y gestión para estudio de manicura y pedicura en Lima, Perú.
> Arquitectura por capas con cálculo dinámico de duración (servicios + extras), sincronización en tiempo real y estética *French Vanilla & Mantequilla Orgánica*.

---

## 🏛️ Estructura del Proyecto (Monorepo por Capas)

```text
samm_nailstudio/
├── frontend/               # Aplicación Next.js 15 (App Router) + TypeScript + Tailwind CSS
│   ├── src/app/            # Rutas públicas (reserva con calendario semanal) y admin
│   ├── src/components/     # Componentes modulares (calendario, selector de extras, tickets)
│   ├── src/lib/            # Motor de cálculo dinámico de tiempos y slots
│   └── public/             # Recursos estáticos
├── database/               # Esquema de base de datos relacional
│   └── schema.sql          # Tablas PostgreSQL / Supabase con RLS y relaciones ACID
└── docs/                   # Documentación técnica, arquitectura y decisiones de diseño
```

---

## 🎨 Identidad Visual (Anti-Slop)

* **Paleta:** *French Vanilla* (`#fdfbf7`, `#f7f1e5`), acentos mantequilla suave, marfil cálido y negro carbón editorial.
* **Tipografías:** `Cormorant Garamond` (titulares y precios de autor) + `Plus Jakarta Sans` (lectura limpia).
* **Filosofía UX:** Cero llamadas, cero mensajes a medianoche. La clienta selecciona su servicio + extras, la web calcula el tiempo real necesario y bloquea el hueco exacto en la base de datos al instante.

---

## 🚀 Puesta en Marcha (Desarrollo Local)

```bash
# 1. Entrar en la capa de frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Stack Tecnológico (100% Gratuito en Producción)

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
* **Backend & Base de Datos:** Supabase (PostgreSQL 15 con Row Level Security & Realtime WebSockets).
* **Alojamiento:** Vercel (CI/CD automático desde GitHub).
