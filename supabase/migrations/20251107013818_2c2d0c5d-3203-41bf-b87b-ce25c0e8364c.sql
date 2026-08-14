-- Adicionar campo de permissões aos perfis de usuário
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS permissions TEXT[] DEFAULT ARRAY['dashboard', 'agendamentos', 'recebimentos', 'passeios'];

-- Adicionar campo para indicar se o usuário está ativo
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;

-- Comentários para documentação
COMMENT ON COLUMN public.user_profiles.permissions IS 'Array de menus que o usuário tem permissão para acessar: dashboard, agendamentos, recebimentos, passeios';
COMMENT ON COLUMN public.user_profiles.ativo IS 'Indica se o usuário está ativo no sistema';