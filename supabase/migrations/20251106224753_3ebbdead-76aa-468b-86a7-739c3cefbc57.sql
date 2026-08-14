-- Trigger para garantir consistência entre status_pagamento e valor_pago
CREATE OR REPLACE FUNCTION sync_pagamento_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Se status for 'pago', garantir que valor_pago = valor
  IF NEW.status_pagamento = 'pago' THEN
    NEW.valor_pago := NEW.valor;
  END IF;
  
  -- Se valor_pago for 0, garantir que status seja 'pendente'
  IF NEW.valor_pago = 0 THEN
    NEW.status_pagamento := 'pendente';
  -- Se valor_pago for maior ou igual ao valor, garantir que status seja 'pago'
  ELSIF NEW.valor_pago >= NEW.valor THEN
    NEW.status_pagamento := 'pago';
  -- Se valor_pago for maior que 0 mas menor que valor, garantir que status seja 'parcial'
  ELSIF NEW.valor_pago > 0 AND NEW.valor_pago < NEW.valor THEN
    NEW.status_pagamento := 'parcial';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger que executa antes de INSERT ou UPDATE
DROP TRIGGER IF EXISTS trigger_sync_pagamento_status ON quadribahia_reservas;
CREATE TRIGGER trigger_sync_pagamento_status
  BEFORE INSERT OR UPDATE ON quadribahia_reservas
  FOR EACH ROW
  EXECUTE FUNCTION sync_pagamento_status();

-- Corrigir reservas existentes inconsistentes
UPDATE quadribahia_reservas 
SET valor_pago = valor 
WHERE status_pagamento = 'pago' AND valor_pago < valor;