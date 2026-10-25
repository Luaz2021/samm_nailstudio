-- ==============================================================================
-- Samm Nail Studio · Base de Datos PostgreSQL / Supabase
-- Arquitectura de Agendamiento con Servicios Base y Extras de Duración Variable
-- ==============================================================================

-- 1. Tabla de Servicios Base (Manicura, Pedicura, Estructuras)
CREATE TABLE IF NOT EXISTS servicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50) NOT NULL, -- 'manicura', 'pedicura', 'extensiones'
    precio_base NUMERIC(6,2) NOT NULL,
    duracion_minutos INT NOT NULL, -- Ej: 60, 90, 120
    imagen_url TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de Extras / Adicionales (Retiros, Nail Art, Largos, Tratamientos)
CREATE TABLE IF NOT EXISTS extras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(6,2) NOT NULL,
    duracion_adicional_min INT NOT NULL, -- Ej: 15, 30, 45
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabla de Citas (Sincronización en Tiempo Real)
CREATE TABLE IF NOT EXISTS citas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_reserva VARCHAR(20) UNIQUE NOT NULL, -- Ej: 'SAMM-7429'
    servicio_id UUID NOT NULL REFERENCES servicios(id),
    cliente_nombre VARCHAR(100) NOT NULL,
    cliente_telefono VARCHAR(25) NOT NULL,
    cliente_email VARCHAR(120),
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL, -- Calculada automáticamente según duración total
    duracion_total_min INT NOT NULL,
    precio_total NUMERIC(6,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'confirmada', -- 'confirmada', 'en_cabina', 'completada', 'cancelada'
    notas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabla Intermedia: Extras seleccionados por cada Cita
CREATE TABLE IF NOT EXISTS cita_extras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cita_id UUID NOT NULL REFERENCES citas(id) ON DELETE CASCADE,
    extra_id UUID NOT NULL REFERENCES extras(id),
    precio_aplicado NUMERIC(6,2) NOT NULL,
    duracion_minutos INT NOT NULL
);

-- 5. Horarios Bloqueados / Descansos de la Manicurista
CREATE TABLE IF NOT EXISTS horarios_bloqueados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    motivo VARCHAR(100) DEFAULT 'Descanso / Almuerzo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE cita_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE horarios_bloqueados ENABLE ROW LEVEL SECURITY;

-- Políticas Públicas de Lectura
CREATE POLICY "Servicios visibles para todos" ON servicios FOR SELECT USING (activo = true);
CREATE POLICY "Extras visibles para todos" ON extras FOR SELECT USING (activo = true);
CREATE POLICY "Horarios bloqueados visibles" ON horarios_bloqueados FOR SELECT USING (true);

-- Política de Inserción Pública Sanitizada de Citas
CREATE POLICY "Cualquier cliente puede agendar cita" ON citas FOR INSERT WITH CHECK (true);
CREATE POLICY "Extras de citas insertables" ON cita_extras FOR INSERT WITH CHECK (true);
