-- Alterar coluna participantes de ARRAY para TEXT
-- Primeiro, adicionar uma coluna temporária
ALTER TABLE quadribahia_reservas ADD COLUMN participantes_temp TEXT;

-- Converter dados existentes de array para string com vírgulas
UPDATE quadribahia_reservas 
SET participantes_temp = array_to_string(participantes, ', ')
WHERE participantes IS NOT NULL;

-- Remover coluna antiga
ALTER TABLE quadribahia_reservas DROP COLUMN participantes;

-- Renomear coluna temporária
ALTER TABLE quadribahia_reservas RENAME COLUMN participantes_temp TO participantes;

-- Definir valor padrão como string vazia
ALTER TABLE quadribahia_reservas ALTER COLUMN participantes SET DEFAULT '';