CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  admin_email text := 'leandro@quadribahia.com.br';
  admin_password text := 'quadribahia2026';
  admin_username text := 'leandro';
  admin_id uuid;
BEGIN
  SELECT id INTO admin_id
  FROM auth.users
  WHERE email = admin_email
  LIMIT 1;

  IF admin_id IS NULL THEN
    admin_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_id,
      'authenticated',
      'authenticated',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('username', admin_username),
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  ELSE
    UPDATE auth.users
    SET
      encrypted_password = crypt(admin_password, gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb,
      raw_user_meta_data = jsonb_build_object('username', admin_username),
      updated_at = now()
    WHERE id = admin_id;
  END IF;

  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    admin_id,
    admin_id,
    jsonb_build_object('sub', admin_id::text, 'email', admin_email),
    'email',
    admin_email,
    now(),
    now(),
    now()
  )
  ON CONFLICT (provider_id, provider) DO UPDATE
  SET
    user_id = EXCLUDED.user_id,
    identity_data = EXCLUDED.identity_data,
    updated_at = now();

  INSERT INTO public.user_profiles (id, username, ativo, permissions)
  VALUES (
    admin_id,
    admin_username,
    true,
    ARRAY['dashboard', 'agendamentos', 'recebimentos', 'passeios', 'configuracoes']
  )
  ON CONFLICT (id) DO UPDATE
  SET
    username = EXCLUDED.username,
    ativo = true,
    permissions = EXCLUDED.permissions;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_id, 'admin'::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;
