import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verificar se o usuário que está fazendo a requisição é admin
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Não autorizado');
    }

    // Verificar se é admin
    const { data: roles } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roles) {
      throw new Error('Apenas administradores podem criar usuários');
    }

    const { username, password, permissions } = await req.json();

    if (!username || !password) {
      throw new Error('Username e password são obrigatórios');
    }

    const email = `${username.trim().toLowerCase()}@quadribahia.com`;

    // Verificar se usuário já existe no auth
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      // Usuário existe no auth, verificar se tem perfil
      const { data: existingProfile } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .eq('id', existingUser.id)
        .maybeSingle();

      if (existingProfile) {
        // Usuário já existe com perfil completo
        throw new Error('Usuário já existe');
      }

      // Usuário existe mas sem perfil - criar apenas o perfil
      console.log('Usuário existe sem perfil, criando perfil...');
      
      const { error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .upsert({
          id: existingUser.id,
          username: username.trim().toLowerCase(),
          permissions: permissions || [],
          ativo: true
        });

      if (profileError) {
        console.error('Profile error:', profileError);
        throw new Error('Erro ao criar perfil do usuário');
      }

      return new Response(
        JSON.stringify({ success: true, user: existingUser, profileCreated: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Criar o usuário
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username: username.trim().toLowerCase() }
    });

    if (createError) throw createError;

    // Criar perfil do usuário
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        id: newUser.user.id,
        username: username.trim().toLowerCase(),
        permissions: permissions || [],
        ativo: true
      });

    if (profileError) {
      console.error('Profile error:', profileError);
    }

    return new Response(
      JSON.stringify({ success: true, user: newUser.user }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Create user error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
