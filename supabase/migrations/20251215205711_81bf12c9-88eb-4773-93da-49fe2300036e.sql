-- Alterar FK para deletar pagamentos em cascata quando a reserva for deletada
ALTER TABLE public.quadribahia_pagamentos
DROP CONSTRAINT IF EXISTS quadribahia_pagamentos_reserva_id_fkey;

ALTER TABLE public.quadribahia_pagamentos
ADD CONSTRAINT quadribahia_pagamentos_reserva_id_fkey
FOREIGN KEY (reserva_id) REFERENCES public.quadribahia_reservas(id) ON DELETE CASCADE;