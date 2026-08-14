-- Remover triggers que referenciam tabelas que não existem neste projeto
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_controle ON auth.users;

-- Remover as funções associadas
DROP FUNCTION IF EXISTS public.create_default_data_for_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user_controle() CASCADE;