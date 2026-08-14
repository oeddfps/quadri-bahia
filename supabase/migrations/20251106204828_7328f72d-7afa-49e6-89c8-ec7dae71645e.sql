-- ====================================
-- TABELAS PRINCIPAIS
-- ====================================

-- Tabela de Passeios
CREATE TABLE IF NOT EXISTS passeios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  tem_horario BOOLEAN NOT NULL DEFAULT false,
  horarios_disponiveis TEXT[],
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Reservas
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  responsavel TEXT NOT NULL,
  participantes TEXT[] NOT NULL,
  hotel TEXT,
  apartamento TEXT,
  passeio_id INTEGER NOT NULL REFERENCES passeios(id) ON DELETE RESTRICT,
  data DATE NOT NULL,
  horario TEXT,
  periodo TEXT CHECK (periodo IN ('Manhã', 'Tarde', 'Noite')),
  valor NUMERIC(10, 2) NOT NULL CHECK (valor > 0),
  valor_pago NUMERIC(10, 2) DEFAULT 0,
  status_pagamento TEXT NOT NULL DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'parcial', 'pago')),
  confirmado BOOLEAN NOT NULL DEFAULT false,
  compareceu BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- ÍNDICES
-- ====================================

CREATE INDEX IF NOT EXISTS idx_reservas_data ON reservas(data);
CREATE INDEX IF NOT EXISTS idx_reservas_passeio ON reservas(passeio_id);
CREATE INDEX IF NOT EXISTS idx_reservas_status_pagamento ON reservas(status_pagamento);

-- ====================================
-- TRIGGERS
-- ====================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON reservas;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON reservas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- RLS POLICIES
-- ====================================

ALTER TABLE passeios ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura pública de passeios" ON passeios;
CREATE POLICY "Permitir leitura pública de passeios"
  ON passeios FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir tudo em passeios" ON passeios;
CREATE POLICY "Permitir tudo em passeios"
  ON passeios FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura pública de reservas" ON reservas;
CREATE POLICY "Permitir leitura pública de reservas"
  ON reservas FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir tudo em reservas" ON reservas;
CREATE POLICY "Permitir tudo em reservas"
  ON reservas FOR ALL
  USING (true)
  WITH CHECK (true);

-- ====================================
-- VIEWS
-- ====================================

CREATE OR REPLACE VIEW vw_metricas_dashboard AS
SELECT
  COUNT(*) as total_reservas,
  SUM(valor) as total_arrecadado,
  SUM(valor_pago) as total_pago,
  SUM(valor - COALESCE(valor_pago, 0)) as total_pendente,
  COUNT(*) FILTER (WHERE confirmado = true) as total_confirmadas,
  COUNT(*) FILTER (WHERE data = CURRENT_DATE) as reservas_hoje,
  SUM(CASE WHEN data = CURRENT_DATE THEN valor ELSE 0 END) as total_hoje,
  COUNT(*) FILTER (WHERE data >= DATE_TRUNC('week', CURRENT_DATE)) as reservas_semana,
  SUM(CASE WHEN data >= DATE_TRUNC('week', CURRENT_DATE) THEN valor ELSE 0 END) as total_semana,
  COUNT(*) FILTER (WHERE data >= DATE_TRUNC('month', CURRENT_DATE)) as reservas_mes,
  SUM(CASE WHEN data >= DATE_TRUNC('month', CURRENT_DATE) THEN valor ELSE 0 END) as total_mes
FROM reservas;

-- ====================================
-- DADOS INICIAIS
-- ====================================

INSERT INTO passeios (id, nome, tem_horario, horarios_disponiveis) VALUES
(1, 'Quadriciclo', true, ARRAY['08:00', '11:00', '14:00']),
(2, 'Recife de Fora', false, NULL),
(3, 'Barco Pirata', false, NULL),
(4, 'By Night Arraial', false, NULL),
(5, 'Coroa Alta', false, NULL),
(6, 'Praia do Espelho', false, NULL),
(7, 'Mergulho com Cilindro', false, NULL),
(8, 'Arraial da Judá de Dia', false, NULL),
(9, 'Caraíva', false, NULL),
(10, 'Trancoso de Van', false, NULL),
(11, 'Trancoso Marítimo (Flor de Lis)', false, NULL)
ON CONFLICT (nome) DO NOTHING;

SELECT setval('passeios_id_seq', (SELECT MAX(id) FROM passeios));