ALTER TABLE public.quadribahia_reservas
ADD COLUMN IF NOT EXISTS observacao_outro text;

WITH desired_passeios (id, nome, tem_horario, horarios_disponiveis) AS (
  VALUES
    (1, 'Quadriciclo rota praia', true, ARRAY['08:00', '11:00', '14:00']::text[]),
    (2, 'Recife de fora', false, NULL::text[]),
    (3, 'Coroa alta', false, NULL::text[]),
    (4, 'Praia de Trancoso', false, NULL::text[]),
    (5, 'Trancoso marítimo', false, NULL::text[]),
    (6, 'Praia do espelho van', false, NULL::text[]),
    (7, 'Espelho marítimo', false, NULL::text[]),
    (8, 'Caraiva', false, NULL::text[]),
    (9, 'Mergulho 🤿', false, NULL::text[]),
    (10, 'Arraial', false, NULL::text[]),
    (11, 'By night arraial', false, NULL::text[]),
    (12, 'Coroa vermelha', false, NULL::text[]),
    (13, 'Outro', false, NULL::text[])
)
INSERT INTO public.quadribahia_passeios (id, nome, tem_horario, horarios_disponiveis, ativo)
SELECT id, nome, tem_horario, horarios_disponiveis, true
FROM desired_passeios
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  tem_horario = EXCLUDED.tem_horario,
  horarios_disponiveis = EXCLUDED.horarios_disponiveis,
  ativo = true;

UPDATE public.quadribahia_passeios
SET ativo = false
WHERE id NOT BETWEEN 1 AND 13;

SELECT setval(
  pg_get_serial_sequence('public.quadribahia_passeios', 'id'),
  GREATEST((SELECT MAX(id) FROM public.quadribahia_passeios), 13)
);
