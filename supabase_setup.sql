-- ==========================================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE PARA VALENTINA XV
-- ==========================================================
-- Instrucciones:
-- 1. Ve a tu proyecto en Supabase (https://supabase.com/dashboard)
-- 2. Abre el "SQL Editor" en el menú de la izquierda.
-- 3. Pega este código completo y haz clic en "RUN".
-- ==========================================================

-- 1. Crear tabla de buenos deseos
create table if not exists public.buenos_deseos (
    id uuid default gen_random_uuid() primary key,
    nombre text not null,
    mensaje text not null,
    icono text default '👑',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en buenos_deseos
alter table public.buenos_deseos enable row level security;

-- Políticas públicas para buenos_deseos
drop policy if exists "Permitir lectura publica de buenos deseos" on public.buenos_deseos;
create policy "Permitir lectura publica de buenos deseos"
    on public.buenos_deseos for select
    using (true);

drop policy if exists "Permitir insercion publica de buenos deseos" on public.buenos_deseos;
create policy "Permitir insercion publica de buenos deseos"
    on public.buenos_deseos for insert
    with check (true);

-- 2. Crear tabla para fotos de recuerdos compartidos por invitados
create table if not exists public.fotos_recuerdos (
    id uuid default gen_random_uuid() primary key,
    nombre text not null,
    mensaje text,
    foto_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en fotos_recuerdos
alter table public.fotos_recuerdos enable row level security;

-- Políticas públicas para fotos_recuerdos
drop policy if exists "Permitir lectura publica de fotos recuerdos" on public.fotos_recuerdos;
create policy "Permitir lectura publica de fotos recuerdos"
    on public.fotos_recuerdos for select
    using (true);

drop policy if exists "Permitir insercion publica de fotos recuerdos" on public.fotos_recuerdos;
create policy "Permitir insercion publica de fotos recuerdos"
    on public.fotos_recuerdos for insert
    with check (true);

