-- Migrar pagamentos existentes da tabela quadribahia_reservas para quadribahia_pagamentos
INSERT INTO public.quadribahia_pagamentos (reserva_id, data_pagamento, valor_pago, created_at)
SELECT 
  id as reserva_id,
  COALESCE(data_pagamento, data) as data_pagamento,
  valor_pago,
  COALESCE(created_at, now()) as created_at
FROM public.quadribahia_reservas
WHERE valor_pago > 0
ON CONFLICT DO NOTHING;