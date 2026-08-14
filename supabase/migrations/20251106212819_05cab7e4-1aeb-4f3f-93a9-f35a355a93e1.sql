-- Rename tables with quadribahia_ prefix
ALTER TABLE public.passeios RENAME TO quadribahia_passeios;
ALTER TABLE public.reservas RENAME TO quadribahia_reservas;

-- Drop and recreate the view with new table names
DROP VIEW IF EXISTS public.vw_metricas_dashboard;

CREATE VIEW public.quadribahia_vw_metricas_dashboard AS
SELECT
  COUNT(*) AS total_reservas,
  SUM(valor) AS total_arrecadado,
  SUM(valor_pago) AS total_pago,
  SUM(CASE WHEN status_pagamento = 'pendente' THEN valor ELSE 0 END) AS total_pendente,
  COUNT(*) FILTER (WHERE confirmado = true) AS total_confirmadas,
  COUNT(*) FILTER (WHERE data = CURRENT_DATE) AS reservas_hoje,
  SUM(CASE WHEN data = CURRENT_DATE THEN valor ELSE 0 END) AS total_hoje,
  COUNT(*) FILTER (WHERE data >= CURRENT_DATE AND data < CURRENT_DATE + INTERVAL '7 days') AS reservas_semana,
  SUM(CASE WHEN data >= CURRENT_DATE AND data < CURRENT_DATE + INTERVAL '7 days' THEN valor ELSE 0 END) AS total_semana,
  COUNT(*) FILTER (WHERE data >= date_trunc('month', CURRENT_DATE) AND data < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month') AS reservas_mes,
  SUM(CASE WHEN data >= date_trunc('month', CURRENT_DATE) AND data < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month' THEN valor ELSE 0 END) AS total_mes
FROM public.quadribahia_reservas;

-- Update RLS policies to reference new table names
-- First drop existing policies
DROP POLICY IF EXISTS "Permitir leitura pública de passeios" ON public.quadribahia_passeios;
DROP POLICY IF EXISTS "Permitir tudo em passeios" ON public.quadribahia_passeios;
DROP POLICY IF EXISTS "Permitir leitura pública de reservas" ON public.quadribahia_reservas;
DROP POLICY IF EXISTS "Permitir tudo em reservas" ON public.quadribahia_reservas;

-- Recreate RLS policies
CREATE POLICY "Permitir leitura pública de passeios" 
ON public.quadribahia_passeios 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir tudo em passeios" 
ON public.quadribahia_passeios 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Permitir leitura pública de reservas" 
ON public.quadribahia_reservas 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir tudo em reservas" 
ON public.quadribahia_reservas 
FOR ALL 
USING (true) 
WITH CHECK (true);