-- Criar tabela de preços por período para passeios
CREATE TABLE IF NOT EXISTS public.quadribahia_passeios_precos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  passeio_id integer NOT NULL REFERENCES public.quadribahia_passeios(id) ON DELETE CASCADE,
  valor numeric NOT NULL,
  data_inicio date NOT NULL,
  data_fim date,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Adicionar RLS
ALTER TABLE public.quadribahia_passeios_precos ENABLE ROW LEVEL SECURITY;

-- Remover política se existir e criar nova
DROP POLICY IF EXISTS "Permitir tudo em precos" ON public.quadribahia_passeios_precos;
CREATE POLICY "Permitir tudo em precos" ON public.quadribahia_passeios_precos
  FOR ALL USING (true) WITH CHECK (true);

-- Trigger para updated_at (só criar se não existir)
DROP TRIGGER IF EXISTS handle_updated_at_precos ON public.quadribahia_passeios_precos;
CREATE TRIGGER handle_updated_at_precos
  BEFORE UPDATE ON public.quadribahia_passeios_precos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para melhor performance
DROP INDEX IF EXISTS idx_passeios_precos_passeio_id;
DROP INDEX IF EXISTS idx_passeios_precos_datas;
CREATE INDEX idx_passeios_precos_passeio_id ON public.quadribahia_passeios_precos(passeio_id);
CREATE INDEX idx_passeios_precos_datas ON public.quadribahia_passeios_precos(data_inicio, data_fim);