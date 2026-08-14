-- Corrigir função que cria perfil automaticamente ao criar usuário
-- A função estava tentando inserir em 'profiles' mas a tabela correta é 'user_profiles'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Inserir na tabela user_profiles (não profiles)
  INSERT INTO public.user_profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username')
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Garantir que o trigger existe e está ativo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();