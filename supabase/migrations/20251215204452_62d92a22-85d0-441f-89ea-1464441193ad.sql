-- Create payments history for QuadriBahia reservations
CREATE TABLE IF NOT EXISTS public.quadribahia_pagamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reserva_id uuid NOT NULL,
  data_pagamento date NOT NULL,
  valor_pago numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- FK (no cascade to avoid accidental deletes)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'quadribahia_pagamentos_reserva_id_fkey'
  ) THEN
    ALTER TABLE public.quadribahia_pagamentos
    ADD CONSTRAINT quadribahia_pagamentos_reserva_id_fkey
    FOREIGN KEY (reserva_id) REFERENCES public.quadribahia_reservas(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_quadribahia_pagamentos_data ON public.quadribahia_pagamentos (data_pagamento);
CREATE INDEX IF NOT EXISTS idx_quadribahia_pagamentos_reserva ON public.quadribahia_pagamentos (reserva_id);

ALTER TABLE public.quadribahia_pagamentos ENABLE ROW LEVEL SECURITY;

-- Keep policies consistent with current public dashboard behavior (table is not exposing PII)
DROP POLICY IF EXISTS "Permitir tudo em pagamentos" ON public.quadribahia_pagamentos;
CREATE POLICY "Permitir tudo em pagamentos"
ON public.quadribahia_pagamentos
FOR ALL
USING (true)
WITH CHECK (true);
