import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST', 
        'Access-Control-Allow-Headers': 'Content-Type' 
      } 
    })
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
    )

    const { data: user, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email: 'leandro@quadribahia.com',
      password: 'quadribahia2026',
      email_confirm: true,
      user_metadata: {
        username: 'leandro'
      }
    })

    if (signUpError) {
      throw signUpError
    }

    if (!user.user) {
      throw new Error('User creation failed')
    }

    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        id: user.user.id,
        username: 'leandro',
        ativo: true,
        permissions: []
      });

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: user.user.id,
        role: 'admin'
      })

    if (roleError && roleError.code !== '23505') {
      console.error('Role error:', roleError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuário master criado com sucesso!',
        userId: user.user.id,
        credentials: {
          username: 'leandro',
          password: 'quadribahia2026'
        }
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        status: 200
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 400
      }
    )
  }
})