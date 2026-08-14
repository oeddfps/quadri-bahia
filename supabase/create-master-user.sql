-- Script para criar usuário master do sistema
-- Execute este script no SQL Editor do Supabase

-- Importante: Primeiro você precisa criar o usuário no painel Authentication > Users
-- com o email: leandro@quadribahia.com e senha: quadribahia2026

-- Depois de criar o usuário, pegue o ID dele e substitua 'USER_ID_AQUI' abaixo

-- Inserir username do usuário
INSERT INTO public.user_profiles (id, username) 
VALUES ('USER_ID_AQUI', 'leandro')
ON CONFLICT (id) DO NOTHING;

-- Adicionar role de admin
INSERT INTO public.user_roles (user_id, role) 
VALUES ('USER_ID_AQUI', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Verificar se o usuário foi criado corretamente
SELECT 
  up.username,
  ur.role
FROM public.user_profiles up
LEFT JOIN public.user_roles ur ON up.id = ur.user_id
WHERE up.username = 'leandro';
