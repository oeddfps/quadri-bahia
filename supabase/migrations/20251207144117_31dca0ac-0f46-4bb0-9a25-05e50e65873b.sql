-- Adicionar coluna para data do pagamento
ALTER TABLE public.quadribahia_reservas 
ADD COLUMN data_pagamento date NULL;

-- Comentário para documentação
COMMENT ON COLUMN public.quadribahia_reservas.data_pagamento IS 'Data em que o pagamento foi realizado';