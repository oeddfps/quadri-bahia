-- Corrigir a view de métricas do dashboard para calcular corretamente os valores

DROP VIEW IF EXISTS quadribahia_vw_metricas_dashboard;

CREATE VIEW quadribahia_vw_metricas_dashboard AS
SELECT
  -- Total de reservas
  COUNT(*) AS total_reservas,
  
  -- Total arrecadado (valor TOTAL de todas as reservas, não o pago)
  COALESCE(SUM(valor), 0) AS total_arrecadado,
  
  -- Total efetivamente pago até agora
  COALESCE(SUM(valor_pago), 0) AS total_pago,
  
  -- Total pendente de recebimento (inclui pendente total e parcial)
  COALESCE(SUM(valor - valor_pago), 0) AS total_pendente,
  
  -- Total de reservas confirmadas
  COUNT(*) FILTER (WHERE confirmado = true) AS total_confirmadas,
  
  -- Reservas de hoje
  COUNT(*) FILTER (WHERE data = CURRENT_DATE) AS reservas_hoje,
  COALESCE(SUM(valor) FILTER (WHERE data = CURRENT_DATE), 0) AS total_hoje,
  
  -- Reservas desta semana
  COUNT(*) FILTER (WHERE data >= date_trunc('week', CURRENT_DATE) AND data < date_trunc('week', CURRENT_DATE) + interval '1 week') AS reservas_semana,
  COALESCE(SUM(valor) FILTER (WHERE data >= date_trunc('week', CURRENT_DATE) AND data < date_trunc('week', CURRENT_DATE) + interval '1 week'), 0) AS total_semana,
  
  -- Reservas deste mês
  COUNT(*) FILTER (WHERE date_trunc('month', data) = date_trunc('month', CURRENT_DATE)) AS reservas_mes,
  COALESCE(SUM(valor) FILTER (WHERE date_trunc('month', data) = date_trunc('month', CURRENT_DATE)), 0) AS total_mes
FROM quadribahia_reservas;