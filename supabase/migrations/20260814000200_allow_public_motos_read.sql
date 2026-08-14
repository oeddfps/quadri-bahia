DROP POLICY IF EXISTS "Permitir leitura publica de motos" ON public.quadribahia_motos;
CREATE POLICY "Permitir leitura publica de motos"
  ON public.quadribahia_motos
  FOR SELECT
  USING (true);
