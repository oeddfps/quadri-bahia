-- Adicionar campo descrição na tabela de passeios
ALTER TABLE public.quadribahia_passeios 
ADD COLUMN IF NOT EXISTS descricao text;