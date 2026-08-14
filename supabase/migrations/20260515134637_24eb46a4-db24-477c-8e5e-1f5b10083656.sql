CREATE TABLE public.quadribahia_motos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL UNIQUE,
  nome text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quadribahia_motos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view motos"
  ON public.quadribahia_motos FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated can insert motos"
  ON public.quadribahia_motos FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update motos"
  ON public.quadribahia_motos FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Authenticated can delete motos"
  ON public.quadribahia_motos FOR DELETE
  TO authenticated USING (true);

CREATE TRIGGER trg_quadribahia_motos_updated
  BEFORE UPDATE ON public.quadribahia_motos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.quadribahia_motos (ordem, nome) VALUES
  (1, 'Moto 1'),
  (2, 'Moto 2'),
  (3, 'Moto 3'),
  (4, 'Moto 4'),
  (5, 'Moto 5'),
  (6, 'Moto 6');