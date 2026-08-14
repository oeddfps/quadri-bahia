export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      access_logs: {
        Row: {
          action: string
          created_at: string | null
          credential_id: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          credential_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          credential_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      additional_costs: {
        Row: {
          amount: number
          category: string
          cost_date: string
          created_at: string
          description: string
          id: string
          month_name: string | null
          payment_method: string
          reimbursement_status: string
          responsible: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          cost_date: string
          created_at?: string
          description: string
          id?: string
          month_name?: string | null
          payment_method: string
          reimbursement_status?: string
          responsible: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          cost_date?: string
          created_at?: string
          description?: string
          id?: string
          month_name?: string | null
          payment_method?: string
          reimbursement_status?: string
          responsible?: string
          updated_at?: string
        }
        Relationships: []
      }
      advtalita_cadastro: {
        Row: {
          assunto: string | null
          created_at: string
          email: string
          id: string
          mensagem: string
          nome_completo: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          assunto?: string | null
          created_at?: string
          email: string
          id?: string
          mensagem: string
          nome_completo: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          assunto?: string | null
          created_at?: string
          email?: string
          id?: string
          mensagem?: string
          nome_completo?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agenciardg_arquivos: {
        Row: {
          created_at: string
          id: string
          nome_arquivo: string
          project_id: string
          storage_path: string
          tamanho: number
          tipo_arquivo: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nome_arquivo: string
          project_id: string
          storage_path: string
          tamanho: number
          tipo_arquivo: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nome_arquivo?: string
          project_id?: string
          storage_path?: string
          tamanho?: number
          tipo_arquivo?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arquivos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_aulascrm_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_index: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_index?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_index?: number | null
        }
        Relationships: []
      }
      agenciardg_aulascrm_documentation: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          doc_url: string
          id: string
          is_active: boolean | null
          order_index: number | null
          title: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          doc_url: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          doc_url?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenciardg_aulascrm_documentation_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_aulascrm_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_aulascrm_videos: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenciardg_aulascrm_videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_aulascrm_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_checklists: {
        Row: {
          concluido: boolean | null
          created_at: string
          id: string
          item: string
          ordem: number | null
          project_id: string
        }
        Insert: {
          concluido?: boolean | null
          created_at?: string
          id?: string
          item: string
          ordem?: number | null
          project_id: string
        }
        Update: {
          concluido?: boolean | null
          created_at?: string
          id?: string
          item?: string
          ordem?: number | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_contratos: {
        Row: {
          access_login: string | null
          access_password: string | null
          additional_observations: string | null
          address: string | null
          ai_persona: string | null
          available_schedule_hours: string | null
          can_refuse_service: boolean | null
          can_use_emojis: boolean | null
          can_use_slang: boolean | null
          can_use_technical_language: boolean | null
          cep: string | null
          city: string | null
          cnpj: string | null
          common_questions: string | null
          communication_tone: string | null
          company_name: string | null
          created_at: string | null
          custom_objective: string | null
          desired_responses: string | null
          email: string | null
          expectations: string | null
          forbidden_terms: string | null
          funnel1_name: string | null
          funnel2_name: string | null
          funnel3_name: string | null
          id: string
          integration_type: string | null
          lead_qualification_info: string | null
          nonsense_content_response: string | null
          objective: string | null
          offensive_content_response: string | null
          other_system_description: string | null
          phone_number: string | null
          qualification_funnel1_criteria: string | null
          qualification_funnel1_info: string | null
          qualification_funnel2_criteria: string | null
          qualification_funnel2_info: string | null
          qualification_funnel3_criteria: string | null
          qualification_funnel3_info: string | null
          representative_cpf: string | null
          representative_name: string | null
          restricted_information: string | null
          scheduling_observations: string | null
          service_durations: string | null
          service_types: string | null
          state: string | null
          system_integrations: string | null
          target_audience: string[] | null
          transfer_to_human_criteria: string | null
          undesired_responses: string | null
          updated_at: string | null
          user_id: string | null
          user_knowledge_level: string | null
          welcome_message: string | null
        }
        Insert: {
          access_login?: string | null
          access_password?: string | null
          additional_observations?: string | null
          address?: string | null
          ai_persona?: string | null
          available_schedule_hours?: string | null
          can_refuse_service?: boolean | null
          can_use_emojis?: boolean | null
          can_use_slang?: boolean | null
          can_use_technical_language?: boolean | null
          cep?: string | null
          city?: string | null
          cnpj?: string | null
          common_questions?: string | null
          communication_tone?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_objective?: string | null
          desired_responses?: string | null
          email?: string | null
          expectations?: string | null
          forbidden_terms?: string | null
          funnel1_name?: string | null
          funnel2_name?: string | null
          funnel3_name?: string | null
          id?: string
          integration_type?: string | null
          lead_qualification_info?: string | null
          nonsense_content_response?: string | null
          objective?: string | null
          offensive_content_response?: string | null
          other_system_description?: string | null
          phone_number?: string | null
          qualification_funnel1_criteria?: string | null
          qualification_funnel1_info?: string | null
          qualification_funnel2_criteria?: string | null
          qualification_funnel2_info?: string | null
          qualification_funnel3_criteria?: string | null
          qualification_funnel3_info?: string | null
          representative_cpf?: string | null
          representative_name?: string | null
          restricted_information?: string | null
          scheduling_observations?: string | null
          service_durations?: string | null
          service_types?: string | null
          state?: string | null
          system_integrations?: string | null
          target_audience?: string[] | null
          transfer_to_human_criteria?: string | null
          undesired_responses?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_knowledge_level?: string | null
          welcome_message?: string | null
        }
        Update: {
          access_login?: string | null
          access_password?: string | null
          additional_observations?: string | null
          address?: string | null
          ai_persona?: string | null
          available_schedule_hours?: string | null
          can_refuse_service?: boolean | null
          can_use_emojis?: boolean | null
          can_use_slang?: boolean | null
          can_use_technical_language?: boolean | null
          cep?: string | null
          city?: string | null
          cnpj?: string | null
          common_questions?: string | null
          communication_tone?: string | null
          company_name?: string | null
          created_at?: string | null
          custom_objective?: string | null
          desired_responses?: string | null
          email?: string | null
          expectations?: string | null
          forbidden_terms?: string | null
          funnel1_name?: string | null
          funnel2_name?: string | null
          funnel3_name?: string | null
          id?: string
          integration_type?: string | null
          lead_qualification_info?: string | null
          nonsense_content_response?: string | null
          objective?: string | null
          offensive_content_response?: string | null
          other_system_description?: string | null
          phone_number?: string | null
          qualification_funnel1_criteria?: string | null
          qualification_funnel1_info?: string | null
          qualification_funnel2_criteria?: string | null
          qualification_funnel2_info?: string | null
          qualification_funnel3_criteria?: string | null
          qualification_funnel3_info?: string | null
          representative_cpf?: string | null
          representative_name?: string | null
          restricted_information?: string | null
          scheduling_observations?: string | null
          service_durations?: string | null
          service_types?: string | null
          state?: string | null
          system_integrations?: string | null
          target_audience?: string[] | null
          transfer_to_human_criteria?: string | null
          undesired_responses?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_knowledge_level?: string | null
          welcome_message?: string | null
        }
        Relationships: []
      }
      agenciardg_credenciais: {
        Row: {
          created_at: string
          id: string
          login: string
          notas: string | null
          project_id: string
          senha_encriptada: string
          servico: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          login: string
          notas?: string | null
          project_id: string
          senha_encriptada: string
          servico: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          login?: string
          notas?: string | null
          project_id?: string
          senha_encriptada?: string
          servico?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credenciais_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_dadoscriacaoia: {
        Row: {
          acesso_login: string | null
          acesso_nome_responsavel: string | null
          acesso_senha: string | null
          acesso_telefone: string | null
          coletar_campos_custom: string | null
          coletar_cep_endereco: boolean | null
          coletar_cidade_estado: boolean | null
          coletar_como_conheceu: boolean | null
          coletar_email: boolean | null
          coletar_interesse: boolean | null
          coletar_nome_completo: boolean | null
          coletar_profissao: boolean | null
          coletar_telefone: boolean | null
          config_concorrentes_nao_citar: string | null
          config_criterio_escalada: string | null
          config_horario_funcionamento: string | null
          config_idioma: string | null
          config_link_destino: string | null
          config_palavras_proibidas: string | null
          config_tom_crise: string | null
          created_at: string | null
          empresa_cnpj: string | null
          empresa_email: string | null
          empresa_segmento: string | null
          empresa_site: string | null
          empresa_telefone: string | null
          facebook_page_id: string | null
          facebook_pagina_nome: string | null
          facebook_token: string | null
          fluxo_acao_apos_coletar: string | null
          fluxo_criterio_qualificacao: string | null
          fluxo_mensagem_boas_vindas: string | null
          fluxo_mensagem_encerramento: string | null
          fluxo_sequencia_perguntas: string | null
          id: string
          instagram_handle: string | null
          instagram_ig_user_id: string | null
          instagram_token: string | null
          instagram_usuario: string | null
          instagram_webhook_token: string | null
          nome_empresa: string
          persona_emojis_permitidos: string | null
          persona_emojis_proibidos: string | null
          persona_hashtags_ok: string | null
          persona_hashtags_proibidas: string | null
          persona_primeira_pessoa: boolean | null
          persona_tom_de_voz: string | null
          persona_usa_emojis: boolean | null
          persona_usa_humor: boolean | null
          persona_volume_resposta: string | null
          rdg_projeto_id: string | null
          rdg_responsavel: string | null
          regras_exemplos_urls: string[] | null
          regras_frases_modelo: string | null
          regras_ignorar: string | null
          regras_mensagem_padrao: string | null
          regras_palavras_bloqueio: string | null
          regras_redirecionar_direct: string | null
          responsavel_cargo: string | null
          responsavel_email: string | null
          responsavel_nome: string | null
          responsavel_whatsapp: string | null
          sobre_assuntos_proibidos: string | null
          sobre_biografia: string | null
          sobre_cargo: string | null
          sobre_nome_completo: string | null
          sobre_palavras_chave: string | null
          sobre_principais_assuntos: string | null
          status: string | null
          tipo_agente: string
          updated_at: string | null
          whatsapp_evolution_token: string | null
          whatsapp_evolution_url: string | null
          whatsapp_instancia: string | null
          whatsapp_numero: string | null
        }
        Insert: {
          acesso_login?: string | null
          acesso_nome_responsavel?: string | null
          acesso_senha?: string | null
          acesso_telefone?: string | null
          coletar_campos_custom?: string | null
          coletar_cep_endereco?: boolean | null
          coletar_cidade_estado?: boolean | null
          coletar_como_conheceu?: boolean | null
          coletar_email?: boolean | null
          coletar_interesse?: boolean | null
          coletar_nome_completo?: boolean | null
          coletar_profissao?: boolean | null
          coletar_telefone?: boolean | null
          config_concorrentes_nao_citar?: string | null
          config_criterio_escalada?: string | null
          config_horario_funcionamento?: string | null
          config_idioma?: string | null
          config_link_destino?: string | null
          config_palavras_proibidas?: string | null
          config_tom_crise?: string | null
          created_at?: string | null
          empresa_cnpj?: string | null
          empresa_email?: string | null
          empresa_segmento?: string | null
          empresa_site?: string | null
          empresa_telefone?: string | null
          facebook_page_id?: string | null
          facebook_pagina_nome?: string | null
          facebook_token?: string | null
          fluxo_acao_apos_coletar?: string | null
          fluxo_criterio_qualificacao?: string | null
          fluxo_mensagem_boas_vindas?: string | null
          fluxo_mensagem_encerramento?: string | null
          fluxo_sequencia_perguntas?: string | null
          id?: string
          instagram_handle?: string | null
          instagram_ig_user_id?: string | null
          instagram_token?: string | null
          instagram_usuario?: string | null
          instagram_webhook_token?: string | null
          nome_empresa: string
          persona_emojis_permitidos?: string | null
          persona_emojis_proibidos?: string | null
          persona_hashtags_ok?: string | null
          persona_hashtags_proibidas?: string | null
          persona_primeira_pessoa?: boolean | null
          persona_tom_de_voz?: string | null
          persona_usa_emojis?: boolean | null
          persona_usa_humor?: boolean | null
          persona_volume_resposta?: string | null
          rdg_projeto_id?: string | null
          rdg_responsavel?: string | null
          regras_exemplos_urls?: string[] | null
          regras_frases_modelo?: string | null
          regras_ignorar?: string | null
          regras_mensagem_padrao?: string | null
          regras_palavras_bloqueio?: string | null
          regras_redirecionar_direct?: string | null
          responsavel_cargo?: string | null
          responsavel_email?: string | null
          responsavel_nome?: string | null
          responsavel_whatsapp?: string | null
          sobre_assuntos_proibidos?: string | null
          sobre_biografia?: string | null
          sobre_cargo?: string | null
          sobre_nome_completo?: string | null
          sobre_palavras_chave?: string | null
          sobre_principais_assuntos?: string | null
          status?: string | null
          tipo_agente: string
          updated_at?: string | null
          whatsapp_evolution_token?: string | null
          whatsapp_evolution_url?: string | null
          whatsapp_instancia?: string | null
          whatsapp_numero?: string | null
        }
        Update: {
          acesso_login?: string | null
          acesso_nome_responsavel?: string | null
          acesso_senha?: string | null
          acesso_telefone?: string | null
          coletar_campos_custom?: string | null
          coletar_cep_endereco?: boolean | null
          coletar_cidade_estado?: boolean | null
          coletar_como_conheceu?: boolean | null
          coletar_email?: boolean | null
          coletar_interesse?: boolean | null
          coletar_nome_completo?: boolean | null
          coletar_profissao?: boolean | null
          coletar_telefone?: boolean | null
          config_concorrentes_nao_citar?: string | null
          config_criterio_escalada?: string | null
          config_horario_funcionamento?: string | null
          config_idioma?: string | null
          config_link_destino?: string | null
          config_palavras_proibidas?: string | null
          config_tom_crise?: string | null
          created_at?: string | null
          empresa_cnpj?: string | null
          empresa_email?: string | null
          empresa_segmento?: string | null
          empresa_site?: string | null
          empresa_telefone?: string | null
          facebook_page_id?: string | null
          facebook_pagina_nome?: string | null
          facebook_token?: string | null
          fluxo_acao_apos_coletar?: string | null
          fluxo_criterio_qualificacao?: string | null
          fluxo_mensagem_boas_vindas?: string | null
          fluxo_mensagem_encerramento?: string | null
          fluxo_sequencia_perguntas?: string | null
          id?: string
          instagram_handle?: string | null
          instagram_ig_user_id?: string | null
          instagram_token?: string | null
          instagram_usuario?: string | null
          instagram_webhook_token?: string | null
          nome_empresa?: string
          persona_emojis_permitidos?: string | null
          persona_emojis_proibidos?: string | null
          persona_hashtags_ok?: string | null
          persona_hashtags_proibidas?: string | null
          persona_primeira_pessoa?: boolean | null
          persona_tom_de_voz?: string | null
          persona_usa_emojis?: boolean | null
          persona_usa_humor?: boolean | null
          persona_volume_resposta?: string | null
          rdg_projeto_id?: string | null
          rdg_responsavel?: string | null
          regras_exemplos_urls?: string[] | null
          regras_frases_modelo?: string | null
          regras_ignorar?: string | null
          regras_mensagem_padrao?: string | null
          regras_palavras_bloqueio?: string | null
          regras_redirecionar_direct?: string | null
          responsavel_cargo?: string | null
          responsavel_email?: string | null
          responsavel_nome?: string | null
          responsavel_whatsapp?: string | null
          sobre_assuntos_proibidos?: string | null
          sobre_biografia?: string | null
          sobre_cargo?: string | null
          sobre_nome_completo?: string | null
          sobre_palavras_chave?: string | null
          sobre_principais_assuntos?: string | null
          status?: string | null
          tipo_agente?: string
          updated_at?: string | null
          whatsapp_evolution_token?: string | null
          whatsapp_evolution_url?: string | null
          whatsapp_instancia?: string | null
          whatsapp_numero?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agenciardg_dadoscriacaoia_rdg_projeto_id_fkey"
            columns: ["rdg_projeto_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_daily_completions: {
        Row: {
          created_at: string
          daily_task_id: string
          data_conclusao: string
          id: string
          responsavel: string
        }
        Insert: {
          created_at?: string
          daily_task_id: string
          data_conclusao?: string
          id?: string
          responsavel: string
        }
        Update: {
          created_at?: string
          daily_task_id?: string
          data_conclusao?: string
          id?: string
          responsavel?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenciardg_daily_completions_daily_task_id_fkey"
            columns: ["daily_task_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_daily_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_daily_tasks: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          horario: string | null
          id: string
          nome_tarefa: string
          responsavel: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          horario?: string | null
          id?: string
          nome_tarefa: string
          responsavel: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          horario?: string | null
          id?: string
          nome_tarefa?: string
          responsavel?: string
          updated_at?: string
        }
        Relationships: []
      }
      agenciardg_eventos: {
        Row: {
          created_at: string
          created_by: string | null
          data_hora: string
          descricao: string | null
          id: string
          project_id: string | null
          responsavel: string
          tags: string[] | null
          titulo: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data_hora: string
          descricao?: string | null
          id?: string
          project_id?: string | null
          responsavel: string
          tags?: string[] | null
          titulo: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data_hora?: string
          descricao?: string | null
          id?: string
          project_id?: string | null
          responsavel?: string
          tags?: string[] | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_links: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          project_id: string
          titulo: string
          url: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          project_id: string
          titulo: string
          url: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          project_id?: string
          titulo?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardg_projects: {
        Row: {
          arquivado: boolean | null
          created_at: string
          created_by: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          nome_cliente: string
          nome_projeto: string
          prioridade: Database["public"]["Enums"]["prioridade"] | null
          responsavel: string
          status: Database["public"]["Enums"]["status_projeto"]
          tipo_projeto: Database["public"]["Enums"]["tipo_projeto"]
          updated_at: string
        }
        Insert: {
          arquivado?: boolean | null
          created_at?: string
          created_by?: string | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: string
          nome_cliente: string
          nome_projeto: string
          prioridade?: Database["public"]["Enums"]["prioridade"] | null
          responsavel: string
          status: Database["public"]["Enums"]["status_projeto"]
          tipo_projeto: Database["public"]["Enums"]["tipo_projeto"]
          updated_at?: string
        }
        Update: {
          arquivado?: boolean | null
          created_at?: string
          created_by?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          nome_cliente?: string
          nome_projeto?: string
          prioridade?: Database["public"]["Enums"]["prioridade"] | null
          responsavel?: string
          status?: Database["public"]["Enums"]["status_projeto"]
          tipo_projeto?: Database["public"]["Enums"]["tipo_projeto"]
          updated_at?: string
        }
        Relationships: []
      }
      agenciardg_tasks: {
        Row: {
          concluida: boolean | null
          created_at: string
          id: string
          nome_tarefa: string
          observacoes: string | null
          ordem: number | null
          prazo: string | null
          prioridade: Database["public"]["Enums"]["prioridade"] | null
          project_id: string
          responsavel: string
          status: Database["public"]["Enums"]["status_tarefa"]
          updated_at: string
        }
        Insert: {
          concluida?: boolean | null
          created_at?: string
          id?: string
          nome_tarefa: string
          observacoes?: string | null
          ordem?: number | null
          prazo?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade"] | null
          project_id: string
          responsavel: string
          status?: Database["public"]["Enums"]["status_tarefa"]
          updated_at?: string
        }
        Update: {
          concluida?: boolean | null
          created_at?: string
          id?: string
          nome_tarefa?: string
          observacoes?: string | null
          ordem?: number | null
          prazo?: string | null
          prioridade?: Database["public"]["Enums"]["prioridade"] | null
          project_id?: string
          responsavel?: string
          status?: Database["public"]["Enums"]["status_tarefa"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "agenciardg_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agenciardgfiscal_clientes: {
        Row: {
          cnae: string | null
          contrato_nome: string | null
          contrato_url: string | null
          cpf_cnpj: string
          created_at: string
          data_fim_contrato: string | null
          data_inicio_contrato: string | null
          descricao_nota: string | null
          dia_geracao_nota: number | null
          dia_vencimento: number | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          nome_empresa: string | null
          porcentagem_imposto: number | null
          telefone: string | null
          updated_at: string
          user_id: string | null
          valor_nota_padrao: number | null
        }
        Insert: {
          cnae?: string | null
          contrato_nome?: string | null
          contrato_url?: string | null
          cpf_cnpj: string
          created_at?: string
          data_fim_contrato?: string | null
          data_inicio_contrato?: string | null
          descricao_nota?: string | null
          dia_geracao_nota?: number | null
          dia_vencimento?: number | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          nome_empresa?: string | null
          porcentagem_imposto?: number | null
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
          valor_nota_padrao?: number | null
        }
        Update: {
          cnae?: string | null
          contrato_nome?: string | null
          contrato_url?: string | null
          cpf_cnpj?: string
          created_at?: string
          data_fim_contrato?: string | null
          data_inicio_contrato?: string | null
          descricao_nota?: string | null
          dia_geracao_nota?: number | null
          dia_vencimento?: number | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          nome_empresa?: string | null
          porcentagem_imposto?: number | null
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
          valor_nota_padrao?: number | null
        }
        Relationships: []
      }
      agenciardgfiscal_notas_fiscais: {
        Row: {
          arquivo_nome: string | null
          arquivo_url: string | null
          arquivo_url_publica: string | null
          cliente_id: string
          cnae: string | null
          created_at: string
          data_emissao: string
          data_vencimento: string
          descricao: string | null
          enviada: boolean | null
          id: string
          mes_referencia: string
          numero_nota: string
          observacoes: string | null
          status: string
          updated_at: string
          valor: number
        }
        Insert: {
          arquivo_nome?: string | null
          arquivo_url?: string | null
          arquivo_url_publica?: string | null
          cliente_id: string
          cnae?: string | null
          created_at?: string
          data_emissao: string
          data_vencimento: string
          descricao?: string | null
          enviada?: boolean | null
          id?: string
          mes_referencia: string
          numero_nota: string
          observacoes?: string | null
          status?: string
          updated_at?: string
          valor: number
        }
        Update: {
          arquivo_nome?: string | null
          arquivo_url?: string | null
          arquivo_url_publica?: string | null
          cliente_id?: string
          cnae?: string | null
          created_at?: string
          data_emissao?: string
          data_vencimento?: string
          descricao?: string | null
          enviada?: boolean | null
          id?: string
          mes_referencia?: string
          numero_nota?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "agenciardgfiscal_notas_fiscais_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "agenciardgfiscal_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_agents: {
        Row: {
          channel_id: string
          comments_emoji_enabled: boolean
          comments_emoji_percent: number
          comments_emoji_pool: Json
          comments_mention_author: boolean
          comments_system_prompt: string | null
          comments_via_ia_suffix: boolean
          compliance_enabled: boolean | null
          compliance_rules: Json | null
          cooldown_per_user_per_post: number | null
          created_at: string | null
          custom_payloads: Json | null
          dm_buttons: Json | null
          dm_buttons_rules: Json | null
          dm_data_collection: Json | null
          dm_flow: Json | null
          dm_max_per_user: number
          dm_memory_window: number | null
          dm_non_follower_message: string | null
          dm_non_follower_policy: string | null
          dm_opening_message_direct: string | null
          dm_system_prompt: string | null
          dm_trigger_message: string | null
          guardrails: Json | null
          handoff_enabled: boolean | null
          handoff_notify_channel: string | null
          handoff_notify_target: string | null
          handoff_trigger: string
          id: string
          is_active: boolean | null
          llm_provider: string
          max_dm_attempts: number | null
          max_msgs_per_user_per_day: number | null
          max_msgs_per_user_per_hour: number | null
          name: string
          persona_prompt: string | null
          post_collection_message: string | null
          post_collection_mode: string
          register: string
          scope: string
          sentiment_rules: Json
          sentiment_thresholds: Json | null
          system_prompt: string
          tenant_id: string
          time_window_action: string | null
          time_window_end: number | null
          time_window_fixed_message: string | null
          time_window_start: number | null
          updated_at: string | null
        }
        Insert: {
          channel_id: string
          comments_emoji_enabled?: boolean
          comments_emoji_percent?: number
          comments_emoji_pool?: Json
          comments_mention_author?: boolean
          comments_system_prompt?: string | null
          comments_via_ia_suffix?: boolean
          compliance_enabled?: boolean | null
          compliance_rules?: Json | null
          cooldown_per_user_per_post?: number | null
          created_at?: string | null
          custom_payloads?: Json | null
          dm_buttons?: Json | null
          dm_buttons_rules?: Json | null
          dm_data_collection?: Json | null
          dm_flow?: Json | null
          dm_max_per_user?: number
          dm_memory_window?: number | null
          dm_non_follower_message?: string | null
          dm_non_follower_policy?: string | null
          dm_opening_message_direct?: string | null
          dm_system_prompt?: string | null
          dm_trigger_message?: string | null
          guardrails?: Json | null
          handoff_enabled?: boolean | null
          handoff_notify_channel?: string | null
          handoff_notify_target?: string | null
          handoff_trigger?: string
          id?: string
          is_active?: boolean | null
          llm_provider?: string
          max_dm_attempts?: number | null
          max_msgs_per_user_per_day?: number | null
          max_msgs_per_user_per_hour?: number | null
          name: string
          persona_prompt?: string | null
          post_collection_message?: string | null
          post_collection_mode?: string
          register?: string
          scope: string
          sentiment_rules?: Json
          sentiment_thresholds?: Json | null
          system_prompt?: string
          tenant_id: string
          time_window_action?: string | null
          time_window_end?: number | null
          time_window_fixed_message?: string | null
          time_window_start?: number | null
          updated_at?: string | null
        }
        Update: {
          channel_id?: string
          comments_emoji_enabled?: boolean
          comments_emoji_percent?: number
          comments_emoji_pool?: Json
          comments_mention_author?: boolean
          comments_system_prompt?: string | null
          comments_via_ia_suffix?: boolean
          compliance_enabled?: boolean | null
          compliance_rules?: Json | null
          cooldown_per_user_per_post?: number | null
          created_at?: string | null
          custom_payloads?: Json | null
          dm_buttons?: Json | null
          dm_buttons_rules?: Json | null
          dm_data_collection?: Json | null
          dm_flow?: Json | null
          dm_max_per_user?: number
          dm_memory_window?: number | null
          dm_non_follower_message?: string | null
          dm_non_follower_policy?: string | null
          dm_opening_message_direct?: string | null
          dm_system_prompt?: string | null
          dm_trigger_message?: string | null
          guardrails?: Json | null
          handoff_enabled?: boolean | null
          handoff_notify_channel?: string | null
          handoff_notify_target?: string | null
          handoff_trigger?: string
          id?: string
          is_active?: boolean | null
          llm_provider?: string
          max_dm_attempts?: number | null
          max_msgs_per_user_per_day?: number | null
          max_msgs_per_user_per_hour?: number | null
          name?: string
          persona_prompt?: string | null
          post_collection_message?: string | null
          post_collection_mode?: string
          register?: string
          scope?: string
          sentiment_rules?: Json
          sentiment_thresholds?: Json | null
          system_prompt?: string
          tenant_id?: string
          time_window_action?: string | null
          time_window_end?: number | null
          time_window_fixed_message?: string | null
          time_window_start?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_agents_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_agents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_automation_logs: {
        Row: {
          action: string | null
          agent_id: string | null
          channel_id: string | null
          created_at: string
          duration_ms: number | null
          error_message: string | null
          graph_run_id: string
          id: string
          input: Json | null
          metadata: Json | null
          model: string | null
          node_name: string
          output: Json | null
          status: string
          tenant_id: string
          tokens_input: number | null
          tokens_output: number | null
          tokens_total: number | null
        }
        Insert: {
          action?: string | null
          agent_id?: string | null
          channel_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          graph_run_id: string
          id?: string
          input?: Json | null
          metadata?: Json | null
          model?: string | null
          node_name: string
          output?: Json | null
          status?: string
          tenant_id: string
          tokens_input?: number | null
          tokens_output?: number | null
          tokens_total?: number | null
        }
        Update: {
          action?: string | null
          agent_id?: string | null
          channel_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          graph_run_id?: string
          id?: string
          input?: Json | null
          metadata?: Json | null
          model?: string | null
          node_name?: string
          output?: Json | null
          status?: string
          tenant_id?: string
          tokens_input?: number | null
          tokens_output?: number | null
          tokens_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_automation_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agentredes_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_automation_logs_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_automation_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_channel_invites: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          expires_at: string
          id: string
          platform: string
          tenant_id: string
          token: string
          used_at: string | null
          used_channel_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          expires_at: string
          id?: string
          platform: string
          tenant_id: string
          token: string
          used_at?: string | null
          used_channel_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          expires_at?: string
          id?: string
          platform?: string
          tenant_id?: string
          token?: string
          used_at?: string | null
          used_channel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_channel_invites_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_channel_invites_used_channel_id_fkey"
            columns: ["used_channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_channels: {
        Row: {
          access_token: string | null
          ativo: boolean | null
          bio: string | null
          categoria: string | null
          created_at: string | null
          external_id: string
          external_url: string | null
          followers_count: number | null
          following_count: number | null
          graph_api_version: string | null
          id: string
          is_business_account: boolean | null
          is_verified: boolean | null
          last_profile_sync_at: string | null
          media_count: number | null
          nome: string | null
          platform: string
          profile_pic_storage_url: string | null
          profile_pic_synced_at: string | null
          profile_pic_url: string | null
          profile_pic_url_hd: string | null
          tenant_id: string
          token_expira_em: string | null
          token_type: string | null
          updated_at: string | null
          username: string | null
          webhook_verify_token: string | null
          website: string | null
          zernio_account_id: string
          zernio_profile_id: string | null
        }
        Insert: {
          access_token?: string | null
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_id: string
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          graph_api_version?: string | null
          id?: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          platform: string
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          tenant_id: string
          token_expira_em?: string | null
          token_type?: string | null
          updated_at?: string | null
          username?: string | null
          webhook_verify_token?: string | null
          website?: string | null
          zernio_account_id: string
          zernio_profile_id?: string | null
        }
        Update: {
          access_token?: string | null
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_id?: string
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          graph_api_version?: string | null
          id?: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          platform?: string
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          tenant_id?: string
          token_expira_em?: string | null
          token_type?: string | null
          updated_at?: string | null
          username?: string | null
          webhook_verify_token?: string | null
          website?: string | null
          zernio_account_id?: string
          zernio_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_channels_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_chat_memory: {
        Row: {
          conversation_id: string
          created_at: string | null
          external_user_id: string | null
          id: string
          mensagem: string | null
          metadata: Json | null
          role: string
          tenant_id: string
          tipo_interacao: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          external_user_id?: string | null
          id?: string
          mensagem?: string | null
          metadata?: Json | null
          role: string
          tenant_id: string
          tipo_interacao?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          external_user_id?: string | null
          id?: string
          mensagem?: string | null
          metadata?: Json | null
          role?: string
          tenant_id?: string
          tipo_interacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_chat_memory_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agentredes_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_chat_memory_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_chat_memory_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_comments: {
        Row: {
          ad_id: string | null
          ad_promotion_status: string | null
          ad_title: string | null
          agent_id: string | null
          author_name_snapshot: string | null
          author_pic_storage_url: string | null
          author_pic_url_raw: string | null
          author_username_snapshot: string | null
          channel_id: string
          created_at: string | null
          curtido: boolean | null
          deletado: boolean | null
          deleted_by_user_at: string | null
          dm_enviada: boolean | null
          error: string | null
          external_user_id: string | null
          id: string
          is_reply: boolean | null
          is_sandbox: boolean | null
          motivo_sentimento: string | null
          ocultado: boolean | null
          parent_comment_id: string | null
          platform_comment_id: string
          post_id: string | null
          processed_at: string | null
          replied_at: string | null
          reply_comment_id: string | null
          respondido: boolean | null
          resposta_ia: string | null
          reverted_at: string | null
          score_sentimento: number | null
          sentimento: string | null
          tenant_id: string
          texto: string | null
        }
        Insert: {
          ad_id?: string | null
          ad_promotion_status?: string | null
          ad_title?: string | null
          agent_id?: string | null
          author_name_snapshot?: string | null
          author_pic_storage_url?: string | null
          author_pic_url_raw?: string | null
          author_username_snapshot?: string | null
          channel_id: string
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          deleted_by_user_at?: string | null
          dm_enviada?: boolean | null
          error?: string | null
          external_user_id?: string | null
          id?: string
          is_reply?: boolean | null
          is_sandbox?: boolean | null
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          parent_comment_id?: string | null
          platform_comment_id: string
          post_id?: string | null
          processed_at?: string | null
          replied_at?: string | null
          reply_comment_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          reverted_at?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          tenant_id: string
          texto?: string | null
        }
        Update: {
          ad_id?: string | null
          ad_promotion_status?: string | null
          ad_title?: string | null
          agent_id?: string | null
          author_name_snapshot?: string | null
          author_pic_storage_url?: string | null
          author_pic_url_raw?: string | null
          author_username_snapshot?: string | null
          channel_id?: string
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          deleted_by_user_at?: string | null
          dm_enviada?: boolean | null
          error?: string | null
          external_user_id?: string | null
          id?: string
          is_reply?: boolean | null
          is_sandbox?: boolean | null
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          parent_comment_id?: string | null
          platform_comment_id?: string
          post_id?: string | null
          processed_at?: string | null
          replied_at?: string | null
          reply_comment_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          reverted_at?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          tenant_id?: string
          texto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_comments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agentredes_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_comments_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_comments_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "agentredes_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_comments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_compliance_log: {
        Row: {
          action_taken: string | null
          agent_id: string | null
          channel_id: string | null
          comment_id: string | null
          created_at: string
          details: Json | null
          graph_run_id: string | null
          id: string
          rule_name: string | null
          tenant_id: string
          violation_type: string
        }
        Insert: {
          action_taken?: string | null
          agent_id?: string | null
          channel_id?: string | null
          comment_id?: string | null
          created_at?: string
          details?: Json | null
          graph_run_id?: string | null
          id?: string
          rule_name?: string | null
          tenant_id: string
          violation_type: string
        }
        Update: {
          action_taken?: string | null
          agent_id?: string | null
          channel_id?: string | null
          comment_id?: string | null
          created_at?: string
          details?: Json | null
          graph_run_id?: string | null
          id?: string
          rule_name?: string | null
          tenant_id?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_compliance_log_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "agentredes_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_compliance_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_conversations: {
        Row: {
          agent_id: string | null
          bot_paused: boolean | null
          channel_id: string
          created_at: string | null
          external_user_id: string | null
          id: string
          is_sandbox: boolean | null
          last_message_at: string | null
          message_count: number | null
          paused_at: string | null
          paused_reason: string | null
          status: string | null
          tenant_id: string
          zernio_conversation_id: string | null
        }
        Insert: {
          agent_id?: string | null
          bot_paused?: boolean | null
          channel_id: string
          created_at?: string | null
          external_user_id?: string | null
          id?: string
          is_sandbox?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          paused_at?: string | null
          paused_reason?: string | null
          status?: string | null
          tenant_id: string
          zernio_conversation_id?: string | null
        }
        Update: {
          agent_id?: string | null
          bot_paused?: boolean | null
          channel_id?: string
          created_at?: string | null
          external_user_id?: string | null
          id?: string
          is_sandbox?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          paused_at?: string | null
          paused_reason?: string | null
          status?: string | null
          tenant_id?: string
          zernio_conversation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agentredes_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_conversations_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_conversations_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_delivery_attempts: {
        Row: {
          attempt_number: number
          channel_id: string | null
          created_at: string
          error_message: string | null
          id: string
          request_payload: Json | null
          response_body: Json | null
          response_status: number | null
          success: boolean
          target_id: string | null
          target_kind: string
          tenant_id: string
          zernio_endpoint: string | null
        }
        Insert: {
          attempt_number?: number
          channel_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          request_payload?: Json | null
          response_body?: Json | null
          response_status?: number | null
          success: boolean
          target_id?: string | null
          target_kind: string
          tenant_id: string
          zernio_endpoint?: string | null
        }
        Update: {
          attempt_number?: number
          channel_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          request_payload?: Json | null
          response_body?: Json | null
          response_status?: number | null
          success?: boolean
          target_id?: string | null
          target_kind?: string
          tenant_id?: string
          zernio_endpoint?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_delivery_attempts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_dm_enviadas: {
        Row: {
          agent_id: string | null
          channel_id: string
          comentario_id: string | null
          conversation_id: string | null
          created_at: string
          dm_buttons: Json | null
          dm_text: string | null
          error_message: string | null
          external_user_id: string
          id: string
          sent_at: string | null
          status: string
          tenant_id: string
          zernio_message_id: string | null
        }
        Insert: {
          agent_id?: string | null
          channel_id: string
          comentario_id?: string | null
          conversation_id?: string | null
          created_at?: string
          dm_buttons?: Json | null
          dm_text?: string | null
          error_message?: string | null
          external_user_id: string
          id?: string
          sent_at?: string | null
          status?: string
          tenant_id: string
          zernio_message_id?: string | null
        }
        Update: {
          agent_id?: string | null
          channel_id?: string
          comentario_id?: string | null
          conversation_id?: string | null
          created_at?: string
          dm_buttons?: Json | null
          dm_text?: string | null
          error_message?: string | null
          external_user_id?: string
          id?: string
          sent_at?: string | null
          status?: string
          tenant_id?: string
          zernio_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_dm_enviadas_comentario_id_fkey"
            columns: ["comentario_id"]
            isOneToOne: true
            referencedRelation: "agentredes_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_dm_enviadas_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agentredes_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_dm_enviadas_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_dm_enviadas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_external_users: {
        Row: {
          bio: string | null
          categoria: string | null
          channel_id: string
          created_at: string | null
          dm_bloqueado: boolean | null
          dm_tentativas: number | null
          dm_ultima_data: string | null
          followers_count: number | null
          followers_synced_at: string | null
          following_count: number | null
          id: string
          is_following: boolean | null
          is_following_synced_at: string | null
          is_premium: boolean | null
          is_verified: boolean | null
          lgpd_opt_in: boolean
          lgpd_opt_in_at: string | null
          lgpd_opt_out: boolean
          lgpd_opt_out_at: string | null
          motivo_nao_seguir: string | null
          nome: string | null
          platform: string | null
          platform_user_id: string
          primeira_interacao: string | null
          primeiro_nome: string | null
          profile_pic_storage_url: string | null
          profile_pic_synced_at: string | null
          profile_pic_url: string | null
          sentimento_predominante: string | null
          tenant_id: string
          total_comentarios: number | null
          total_interacoes: number | null
          ultima_interacao: string | null
          ultimo_nome: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          categoria?: string | null
          channel_id: string
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          followers_synced_at?: string | null
          following_count?: number | null
          id?: string
          is_following?: boolean | null
          is_following_synced_at?: string | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          lgpd_opt_in?: boolean
          lgpd_opt_in_at?: string | null
          lgpd_opt_out?: boolean
          lgpd_opt_out_at?: string | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          platform?: string | null
          platform_user_id: string
          primeira_interacao?: string | null
          primeiro_nome?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          tenant_id: string
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          ultimo_nome?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          categoria?: string | null
          channel_id?: string
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          followers_synced_at?: string | null
          following_count?: number | null
          id?: string
          is_following?: boolean | null
          is_following_synced_at?: string | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          lgpd_opt_in?: boolean
          lgpd_opt_in_at?: string | null
          lgpd_opt_out?: boolean
          lgpd_opt_out_at?: string | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          platform?: string | null
          platform_user_id?: string
          primeira_interacao?: string | null
          primeiro_nome?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          tenant_id?: string
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          ultimo_nome?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_external_users_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_external_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_global_settings: {
        Row: {
          created_at: string
          id: string
          is_singleton: boolean
          langfuse_enabled: boolean
          langfuse_host: string | null
          langfuse_public_key: string | null
          langfuse_secret_key: string | null
          litellm_api_key: string | null
          litellm_base_url: string | null
          litellm_enabled: boolean
          notify_evolution_api_key: string | null
          notify_evolution_base_url: string | null
          notify_evolution_instance: string | null
          notify_whatsapp_enabled: boolean
          notify_whatsapp_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_singleton?: boolean
          langfuse_enabled?: boolean
          langfuse_host?: string | null
          langfuse_public_key?: string | null
          langfuse_secret_key?: string | null
          litellm_api_key?: string | null
          litellm_base_url?: string | null
          litellm_enabled?: boolean
          notify_evolution_api_key?: string | null
          notify_evolution_base_url?: string | null
          notify_evolution_instance?: string | null
          notify_whatsapp_enabled?: boolean
          notify_whatsapp_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_singleton?: boolean
          langfuse_enabled?: boolean
          langfuse_host?: string | null
          langfuse_public_key?: string | null
          langfuse_secret_key?: string | null
          litellm_api_key?: string | null
          litellm_base_url?: string | null
          litellm_enabled?: boolean
          notify_evolution_api_key?: string | null
          notify_evolution_base_url?: string | null
          notify_evolution_instance?: string | null
          notify_whatsapp_enabled?: boolean
          notify_whatsapp_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agentredes_job_queue: {
        Row: {
          attempts: number
          available_at: string
          channel_id: string | null
          completed_at: string | null
          created_at: string
          failed_at: string | null
          id: string
          last_error: string | null
          locked_at: string | null
          locked_by: string | null
          max_attempts: number
          payload: Json
          priority: number
          queue_name: string
          singleton_key: string | null
          state: string
          tenant_id: string | null
        }
        Insert: {
          attempts?: number
          available_at?: string
          channel_id?: string | null
          completed_at?: string | null
          created_at?: string
          failed_at?: string | null
          id?: string
          last_error?: string | null
          locked_at?: string | null
          locked_by?: string | null
          max_attempts?: number
          payload: Json
          priority?: number
          queue_name: string
          singleton_key?: string | null
          state?: string
          tenant_id?: string | null
        }
        Update: {
          attempts?: number
          available_at?: string
          channel_id?: string | null
          completed_at?: string | null
          created_at?: string
          failed_at?: string | null
          id?: string
          last_error?: string | null
          locked_at?: string | null
          locked_by?: string | null
          max_attempts?: number
          payload?: Json
          priority?: number
          queue_name?: string
          singleton_key?: string | null
          state?: string
          tenant_id?: string | null
        }
        Relationships: []
      }
      agentredes_leads: {
        Row: {
          aceita_avisos: boolean | null
          aceita_avisos_em: string | null
          bairro: string | null
          bloqueado: boolean | null
          cep: string | null
          channel_id: string | null
          cidade: string | null
          coletado_em: string | null
          created_at: string | null
          dados_coletados: Json
          dados_completos: boolean | null
          desinteresse: boolean | null
          desinteresse_em: string | null
          email: string | null
          estado: string | null
          external_user_id: string | null
          followup_enviado: boolean | null
          id: string
          latitude: number | null
          lgpd_aceito: boolean | null
          lgpd_aceito_em: string | null
          lgpd_recusas: number | null
          longitude: number | null
          motivo_recusa: string | null
          nome_completo: string | null
          nome_confirmado: boolean | null
          platform_user_id: string | null
          primeira_dm_incompleta: boolean | null
          recusas_seguidas: number | null
          recusou_conversa: boolean | null
          resumo: Json | null
          rua: string | null
          sentimento: string | null
          solicitacao: Json | null
          solucao: string | null
          sugestao_perguntada: boolean | null
          telefone: string | null
          tenant_id: string
          token: string | null
          ultima_acao: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          channel_id?: string | null
          cidade?: string | null
          coletado_em?: string | null
          created_at?: string | null
          dados_coletados?: Json
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          external_user_id?: string | null
          followup_enviado?: boolean | null
          id?: string
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          platform_user_id?: string | null
          primeira_dm_incompleta?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          tenant_id: string
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          channel_id?: string | null
          cidade?: string | null
          coletado_em?: string | null
          created_at?: string | null
          dados_coletados?: Json
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          external_user_id?: string | null
          followup_enviado?: boolean | null
          id?: string
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          platform_user_id?: string | null
          primeira_dm_incompleta?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          tenant_id?: string
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_leads_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_leads_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_messages: {
        Row: {
          attachments: Json | null
          button_label: string | null
          button_payload: string | null
          buttons_sent: Json | null
          conversation_id: string
          created_at: string | null
          direction: string
          external_user_id: string | null
          id: string
          is_sandbox: boolean | null
          metadata: Json | null
          platform_message_id: string | null
          sent_at: string | null
          status: string | null
          tenant_id: string
          text: string | null
        }
        Insert: {
          attachments?: Json | null
          button_label?: string | null
          button_payload?: string | null
          buttons_sent?: Json | null
          conversation_id: string
          created_at?: string | null
          direction: string
          external_user_id?: string | null
          id?: string
          is_sandbox?: boolean | null
          metadata?: Json | null
          platform_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id: string
          text?: string | null
        }
        Update: {
          attachments?: Json | null
          button_label?: string | null
          button_payload?: string | null
          buttons_sent?: Json | null
          conversation_id?: string
          created_at?: string | null
          direction?: string
          external_user_id?: string | null
          id?: string
          is_sandbox?: boolean | null
          metadata?: Json | null
          platform_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id?: string
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agentredes_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_messages_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_posts: {
        Row: {
          caption: string | null
          channel_id: string
          comments_count: number | null
          created_at: string | null
          fetched_via: string | null
          hashtags: string[] | null
          id: string
          likes_count: number | null
          media_baixada: boolean | null
          media_url: string | null
          media_url_storage: string | null
          metadata_synced_at: string | null
          permalink: string | null
          platform_post_id: string
          produto_media: string | null
          publicado_em: string | null
          tenant_id: string
          thumbnail_url: string | null
          thumbnail_url_storage: string | null
          tipo_media: string | null
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          channel_id: string
          comments_count?: number | null
          created_at?: string | null
          fetched_via?: string | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          media_baixada?: boolean | null
          media_url?: string | null
          media_url_storage?: string | null
          metadata_synced_at?: string | null
          permalink?: string | null
          platform_post_id: string
          produto_media?: string | null
          publicado_em?: string | null
          tenant_id: string
          thumbnail_url?: string | null
          thumbnail_url_storage?: string | null
          tipo_media?: string | null
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          channel_id?: string
          comments_count?: number | null
          created_at?: string | null
          fetched_via?: string | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          media_baixada?: boolean | null
          media_url?: string | null
          media_url_storage?: string | null
          metadata_synced_at?: string | null
          permalink?: string | null
          platform_post_id?: string
          produto_media?: string | null
          publicado_em?: string | null
          tenant_id?: string
          thumbnail_url?: string | null
          thumbnail_url_storage?: string | null
          tipo_media?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_posts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_prompt_templates: {
        Row: {
          agent_id: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string | null
          system_prompt: string
          tenant_id: string
          version: number | null
        }
        Insert: {
          agent_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          system_prompt: string
          tenant_id: string
          version?: number | null
        }
        Update: {
          agent_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          system_prompt?: string
          tenant_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_prompt_templates_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agentredes_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_prompt_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_queue_metrics: {
        Row: {
          active_count: number | null
          avg_process_seconds: number | null
          avg_wait_seconds: number | null
          captured_at: string | null
          channel_id: string | null
          completed_today: number | null
          failed_today: number | null
          id: string
          queue_name: string | null
          queued_count: number | null
          tenant_id: string | null
        }
        Insert: {
          active_count?: number | null
          avg_process_seconds?: number | null
          avg_wait_seconds?: number | null
          captured_at?: string | null
          channel_id?: string | null
          completed_today?: number | null
          failed_today?: number | null
          id?: string
          queue_name?: string | null
          queued_count?: number | null
          tenant_id?: string | null
        }
        Update: {
          active_count?: number | null
          avg_process_seconds?: number | null
          avg_wait_seconds?: number | null
          captured_at?: string | null
          channel_id?: string | null
          completed_today?: number | null
          failed_today?: number | null
          id?: string
          queue_name?: string | null
          queued_count?: number | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_queue_metrics_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_queue_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_respostas_historico: {
        Row: {
          agent_id: string
          channel_id: string
          comment_id: string | null
          created_at: string
          external_user_id: string
          id: string
          post_id: string | null
          resposta_hash: string
          resposta_text: string
          tenant_id: string
        }
        Insert: {
          agent_id: string
          channel_id: string
          comment_id?: string | null
          created_at?: string
          external_user_id: string
          id?: string
          post_id?: string | null
          resposta_hash: string
          resposta_text: string
          tenant_id: string
        }
        Update: {
          agent_id?: string
          channel_id?: string
          comment_id?: string | null
          created_at?: string
          external_user_id?: string
          id?: string
          post_id?: string | null
          resposta_hash?: string
          resposta_text?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_respostas_historico_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agentredes_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_respostas_historico_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "agentredes_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_respostas_historico_external_user_id_fkey"
            columns: ["external_user_id"]
            isOneToOne: false
            referencedRelation: "agentredes_external_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_respostas_historico_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "agentredes_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_respostas_historico_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_tenants: {
        Row: {
          created_at: string
          email: string
          id: string
          langfuse_enabled: boolean
          langfuse_host: string
          langfuse_public_key: string | null
          langfuse_secret_key: string | null
          langfuse_tag: string | null
          litellm_api_key: string | null
          litellm_base_url: string | null
          litellm_enabled: boolean | null
          llm_api_base: string
          llm_api_base_alt: string | null
          llm_api_key: string | null
          llm_api_key_alt: string | null
          llm_model: string
          llm_model_alt: string | null
          llm_temperature: number
          media_retention_days: number | null
          name: string
          notify_daily_summary_enabled: boolean
          notify_daily_summary_hour: number
          notify_email_enabled: boolean
          notify_email_to: string | null
          notify_evolution_api_key: string | null
          notify_evolution_base_url: string | null
          notify_evolution_instance: string | null
          notify_telegram_chat_id: string | null
          notify_telegram_enabled: boolean
          notify_watchdog_enabled: boolean
          notify_whatsapp_enabled: boolean
          notify_whatsapp_number: string | null
          plan: string
          rapidapi_enabled: boolean
          rapidapi_host: string
          rapidapi_key: string | null
          slug: string
          status: string
          updated_at: string
          zernio_api_key: string | null
          zernio_profile_id: string | null
          zernio_webhook_secret: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          langfuse_enabled?: boolean
          langfuse_host?: string
          langfuse_public_key?: string | null
          langfuse_secret_key?: string | null
          langfuse_tag?: string | null
          litellm_api_key?: string | null
          litellm_base_url?: string | null
          litellm_enabled?: boolean | null
          llm_api_base?: string
          llm_api_base_alt?: string | null
          llm_api_key?: string | null
          llm_api_key_alt?: string | null
          llm_model?: string
          llm_model_alt?: string | null
          llm_temperature?: number
          media_retention_days?: number | null
          name: string
          notify_daily_summary_enabled?: boolean
          notify_daily_summary_hour?: number
          notify_email_enabled?: boolean
          notify_email_to?: string | null
          notify_evolution_api_key?: string | null
          notify_evolution_base_url?: string | null
          notify_evolution_instance?: string | null
          notify_telegram_chat_id?: string | null
          notify_telegram_enabled?: boolean
          notify_watchdog_enabled?: boolean
          notify_whatsapp_enabled?: boolean
          notify_whatsapp_number?: string | null
          plan?: string
          rapidapi_enabled?: boolean
          rapidapi_host?: string
          rapidapi_key?: string | null
          slug: string
          status?: string
          updated_at?: string
          zernio_api_key?: string | null
          zernio_profile_id?: string | null
          zernio_webhook_secret?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          langfuse_enabled?: boolean
          langfuse_host?: string
          langfuse_public_key?: string | null
          langfuse_secret_key?: string | null
          langfuse_tag?: string | null
          litellm_api_key?: string | null
          litellm_base_url?: string | null
          litellm_enabled?: boolean | null
          llm_api_base?: string
          llm_api_base_alt?: string | null
          llm_api_key?: string | null
          llm_api_key_alt?: string | null
          llm_model?: string
          llm_model_alt?: string | null
          llm_temperature?: number
          media_retention_days?: number | null
          name?: string
          notify_daily_summary_enabled?: boolean
          notify_daily_summary_hour?: number
          notify_email_enabled?: boolean
          notify_email_to?: string | null
          notify_evolution_api_key?: string | null
          notify_evolution_base_url?: string | null
          notify_evolution_instance?: string | null
          notify_telegram_chat_id?: string | null
          notify_telegram_enabled?: boolean
          notify_watchdog_enabled?: boolean
          notify_whatsapp_enabled?: boolean
          notify_whatsapp_number?: string | null
          plan?: string
          rapidapi_enabled?: boolean
          rapidapi_host?: string
          rapidapi_key?: string | null
          slug?: string
          status?: string
          updated_at?: string
          zernio_api_key?: string | null
          zernio_profile_id?: string | null
          zernio_webhook_secret?: string | null
        }
        Relationships: []
      }
      agentredes_users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          is_superadmin: boolean
          name: string | null
          role: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          is_active?: boolean
          is_superadmin?: boolean
          name?: string | null
          role?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          is_superadmin?: boolean
          name?: string | null
          role?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agentredes_webhook_events: {
        Row: {
          channel_id: string | null
          created_at: string | null
          error: string | null
          event_type: string | null
          hmac_valid: boolean | null
          id: string
          payload: Json | null
          processed: boolean | null
          processed_at: string | null
          tenant_id: string | null
          zernio_event_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          error?: string | null
          event_type?: string | null
          hmac_valid?: boolean | null
          id?: string
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          tenant_id?: string | null
          zernio_event_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          error?: string | null
          event_type?: string | null
          hmac_valid?: boolean | null
          id?: string
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          tenant_id?: string | null
          zernio_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agentredes_webhook_events_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "agentredes_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentredes_webhook_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "agentredes_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      alto_hirant_dashboard: {
        Row: {
          already_sent: boolean | null
          assunto_feedback: string | null
          atendido_por_humano: boolean | null
          cliente_retornante: boolean | null
          created_at: string
          data: string
          data_atendimento_humano: string | null
          data_reserva_pedida: string | null
          dia_programacao_interesse: string | null
          eh_aniversario: boolean
          feedback_empresa: string | null
          fora_horario: boolean | null
          hora: string
          id: string
          msg_id: string | null
          necessita_humano: boolean | null
          nome_cliente: string | null
          numero_cliente: string | null
          qtd_mensagens_sessao: number
          qtd_pessoas: number | null
          reserva_solicitada: boolean | null
          tempo_resposta_ms: number | null
          tipo_atendimento: string | null
          tool_chamada: string | null
          turno: string | null
        }
        Insert: {
          already_sent?: boolean | null
          assunto_feedback?: string | null
          atendido_por_humano?: boolean | null
          cliente_retornante?: boolean | null
          created_at?: string
          data: string
          data_atendimento_humano?: string | null
          data_reserva_pedida?: string | null
          dia_programacao_interesse?: string | null
          eh_aniversario?: boolean
          feedback_empresa?: string | null
          fora_horario?: boolean | null
          hora: string
          id?: string
          msg_id?: string | null
          necessita_humano?: boolean | null
          nome_cliente?: string | null
          numero_cliente?: string | null
          qtd_mensagens_sessao?: number
          qtd_pessoas?: number | null
          reserva_solicitada?: boolean | null
          tempo_resposta_ms?: number | null
          tipo_atendimento?: string | null
          tool_chamada?: string | null
          turno?: string | null
        }
        Update: {
          already_sent?: boolean | null
          assunto_feedback?: string | null
          atendido_por_humano?: boolean | null
          cliente_retornante?: boolean | null
          created_at?: string
          data?: string
          data_atendimento_humano?: string | null
          data_reserva_pedida?: string | null
          dia_programacao_interesse?: string | null
          eh_aniversario?: boolean
          feedback_empresa?: string | null
          fora_horario?: boolean | null
          hora?: string
          id?: string
          msg_id?: string | null
          necessita_humano?: boolean | null
          nome_cliente?: string | null
          numero_cliente?: string | null
          qtd_mensagens_sessao?: number
          qtd_pessoas?: number | null
          reserva_solicitada?: boolean | null
          tempo_resposta_ms?: number | null
          tipo_atendimento?: string | null
          tool_chamada?: string | null
          turno?: string | null
        }
        Relationships: []
      }
      alto_hirant_mensagens: {
        Row: {
          conteudo: string
          created_at: string
          dashboard_id: string | null
          data: string
          hora: string
          id: string
          numero_cliente: string
          remetente: string
          tempo_ms: number | null
          tipo_mensagem: string | null
          tools_usadas: string | null
        }
        Insert: {
          conteudo: string
          created_at?: string
          dashboard_id?: string | null
          data: string
          hora?: string
          id?: string
          numero_cliente: string
          remetente: string
          tempo_ms?: number | null
          tipo_mensagem?: string | null
          tools_usadas?: string | null
        }
        Update: {
          conteudo?: string
          created_at?: string
          dashboard_id?: string | null
          data?: string
          hora?: string
          id?: string
          numero_cliente?: string
          remetente?: string
          tempo_ms?: number | null
          tipo_mensagem?: string | null
          tools_usadas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alto_hirant_mensagens_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "alto_hirant_dashboard"
            referencedColumns: ["id"]
          },
        ]
      }
      altohirant_pausa: {
        Row: {
          id: number
          pausado: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          pausado?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          pausado?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      andreantos_comentarios: {
        Row: {
          comentario: string | null
          created_at: string
          data: string | null
          esta_seguindo: string | null
          horario: string | null
          id: number
          id_user: string | null
          imagem: string | null
          imagem_post: string | null
          name: string | null
          perfil: string | null
          post_comentou: string | null
          resposta_ia: string | null
          seguidores: string | null
          seguindo: string | null
          status: string | null
          user_name: string | null
          verificado: string | null
        }
        Insert: {
          comentario?: string | null
          created_at?: string
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Update: {
          comentario?: string | null
          created_at?: string
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Relationships: []
      }
      andrebueno_comentarios: {
        Row: {
          comentario: string | null
          created_at: string | null
          data: string | null
          esta_seguindo: string | null
          horario: string | null
          id: number
          id_user: string | null
          imagem: string | null
          imagem_post: string | null
          name: string | null
          perfil: string | null
          post_comentou: string | null
          resposta_ia: string | null
          seguidores: string | null
          seguindo: string | null
          status: string | null
          user_name: string | null
          verificado: string | null
        }
        Insert: {
          comentario?: string | null
          created_at?: string | null
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Update: {
          comentario?: string | null
          created_at?: string | null
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Relationships: []
      }
      andrebueno_site: {
        Row: {
          bairro: string
          cep: string | null
          cidade: string
          cpf: string | null
          created_at: string | null
          data_nascimento: string
          email: string
          endereco: string | null
          estado: string | null
          id: number
          indicado_por: string | null
          mensagem: string
          ministerio: string | null
          nome: string
          numero: string | null
          origem: string | null
          outra_cidade: string | null
          privacidade_aceita: boolean
          whatsapp: string
        }
        Insert: {
          bairro: string
          cep?: string | null
          cidade: string
          cpf?: string | null
          created_at?: string | null
          data_nascimento: string
          email: string
          endereco?: string | null
          estado?: string | null
          id?: number
          indicado_por?: string | null
          mensagem: string
          ministerio?: string | null
          nome: string
          numero?: string | null
          origem?: string | null
          outra_cidade?: string | null
          privacidade_aceita?: boolean
          whatsapp: string
        }
        Update: {
          bairro?: string
          cep?: string | null
          cidade?: string
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string
          email?: string
          endereco?: string | null
          estado?: string | null
          id?: number
          indicado_por?: string | null
          mensagem?: string
          ministerio?: string | null
          nome?: string
          numero?: string | null
          origem?: string | null
          outra_cidade?: string | null
          privacidade_aceita?: boolean
          whatsapp?: string
        }
        Relationships: []
      }
      andrebueno_templates: {
        Row: {
          accent_color: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          event_address: string | null
          event_date: string | null
          event_description: string | null
          event_location: string | null
          event_name: string
          event_time: string | null
          footer_text: string | null
          gradient_end: string
          gradient_start: string
          hero_decoration: string
          hero_subtitle: string | null
          hero_subtitle_position: string
          hero_title: string | null
          icon: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          preview_colors: string[]
          primary_color: string
          secondary_color: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          event_address?: string | null
          event_date?: string | null
          event_description?: string | null
          event_location?: string | null
          event_name?: string
          event_time?: string | null
          footer_text?: string | null
          gradient_end?: string
          gradient_start?: string
          hero_decoration?: string
          hero_subtitle?: string | null
          hero_subtitle_position?: string
          hero_title?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          preview_colors?: string[]
          primary_color?: string
          secondary_color?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          event_address?: string | null
          event_date?: string | null
          event_description?: string | null
          event_location?: string | null
          event_name?: string
          event_time?: string | null
          footer_text?: string | null
          gradient_end?: string
          gradient_start?: string
          hero_decoration?: string
          hero_subtitle?: string | null
          hero_subtitle_position?: string
          hero_title?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          preview_colors?: string[]
          primary_color?: string
          secondary_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      atividades: {
        Row: {
          acao: string | null
          colaborador_id: string | null
          comentario: string | null
          created_at: string | null
          id: string
          tarefa_id: string | null
        }
        Insert: {
          acao?: string | null
          colaborador_id?: string | null
          comentario?: string | null
          created_at?: string | null
          id?: string
          tarefa_id?: string | null
        }
        Update: {
          acao?: string | null
          colaborador_id?: string | null
          comentario?: string | null
          created_at?: string | null
          id?: string
          tarefa_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atividades_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atividades_tarefa_id_fkey"
            columns: ["tarefa_id"]
            isOneToOne: false
            referencedRelation: "tarefas"
            referencedColumns: ["id"]
          },
        ]
      }
      backups: {
        Row: {
          created_at: string | null
          created_by: string | null
          credentials_count: number | null
          file_path: string
          file_size: number | null
          id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          credentials_count?: number | null
          file_path: string
          file_size?: number | null
          id?: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          credentials_count?: number | null
          file_path?: string
          file_size?: number | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "backups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      borabike_eventos: {
        Row: {
          created_at: string | null
          data_evento: string
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          data_evento: string
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          data_evento?: string
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      borabike2026_inscricoes: {
        Row: {
          aceita_termos: boolean
          bairro: string
          cep: string
          cidade: string
          codigo: string
          confirmou_presenca: boolean | null
          cpf: string
          created_at: string
          data_nascimento: string
          email: string
          estado: string
          evento_id: string | null
          genero: string
          id: number
          latitude: number | null
          logradouro: string
          longitude: number | null
          nome: string
          numero: string
          pegou_kit: boolean | null
          presenca_confirmada_em: string | null
          recebeu_medalha: boolean | null
          telefone: string
          updated_at: string
        }
        Insert: {
          aceita_termos?: boolean
          bairro: string
          cep: string
          cidade: string
          codigo?: string
          confirmou_presenca?: boolean | null
          cpf: string
          created_at?: string
          data_nascimento: string
          email: string
          estado?: string
          evento_id?: string | null
          genero: string
          id?: number
          latitude?: number | null
          logradouro: string
          longitude?: number | null
          nome: string
          numero: string
          pegou_kit?: boolean | null
          presenca_confirmada_em?: string | null
          recebeu_medalha?: boolean | null
          telefone: string
          updated_at?: string
        }
        Update: {
          aceita_termos?: boolean
          bairro?: string
          cep?: string
          cidade?: string
          codigo?: string
          confirmou_presenca?: boolean | null
          cpf?: string
          created_at?: string
          data_nascimento?: string
          email?: string
          estado?: string
          evento_id?: string | null
          genero?: string
          id?: number
          latitude?: number | null
          logradouro?: string
          longitude?: number | null
          nome?: string
          numero?: string
          pegou_kit?: boolean | null
          presenca_confirmada_em?: string | null
          recebeu_medalha?: boolean | null
          telefone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "borabike2026_inscricoes_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "borabike_eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      borabike2026_sorteios: {
        Row: {
          codigo: string | null
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          data_sorteio: string | null
          evento_id: string | null
          id: string
          inscrito_id: number | null
          nome: string | null
        }
        Insert: {
          codigo?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          data_sorteio?: string | null
          evento_id?: string | null
          id?: string
          inscrito_id?: number | null
          nome?: string | null
        }
        Update: {
          codigo?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          data_sorteio?: string | null
          evento_id?: string | null
          id?: string
          inscrito_id?: number | null
          nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "borabike2026_sorteios_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "borabike_eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "borabike2026_sorteios_inscrito_id_fkey"
            columns: ["inscrito_id"]
            isOneToOne: false
            referencedRelation: "borabike2026_inscricoes"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          cor: string
          created_at: string | null
          id: string
          is_default: boolean | null
          nome: string
          user_id: string | null
        }
        Insert: {
          cor?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          nome: string
          user_id?: string | null
        }
        Update: {
          cor?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          nome?: string
          user_id?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          commission_percentage: number
          commission_recipient: string | null
          company_name: string
          created_at: string
          crm_cost: number
          id: string
          is_active: boolean
          monthly_fee: number
          net_profit: number | null
          openai_cost: number
          payment_day: number
          updated_at: string
        }
        Insert: {
          commission_percentage?: number
          commission_recipient?: string | null
          company_name: string
          created_at?: string
          crm_cost?: number
          id?: string
          is_active?: boolean
          monthly_fee: number
          net_profit?: number | null
          openai_cost?: number
          payment_day: number
          updated_at?: string
        }
        Update: {
          commission_percentage?: number
          commission_recipient?: string | null
          company_name?: string
          created_at?: string
          crm_cost?: number
          id?: string
          is_active?: boolean
          monthly_fee?: number
          net_profit?: number | null
          openai_cost?: number
          payment_day?: number
          updated_at?: string
        }
        Relationships: []
      }
      clube24hs_cadastros: {
        Row: {
          bairro: string
          cep: string
          cidade: string
          cpf: string
          created_at: string | null
          data_nascimento: string | null
          email: string
          endereco: string
          estado: string
          evento: string | null
          id: number
          latitude: number | null
          longitude: number | null
          nome: string
          whatsapp: string
        }
        Insert: {
          bairro?: string
          cep?: string
          cidade?: string
          cpf: string
          created_at?: string | null
          data_nascimento?: string | null
          email: string
          endereco?: string
          estado?: string
          evento?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          nome: string
          whatsapp: string
        }
        Update: {
          bairro?: string
          cep?: string
          cidade?: string
          cpf?: string
          created_at?: string | null
          data_nascimento?: string | null
          email?: string
          endereco?: string
          estado?: string
          evento?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          nome?: string
          whatsapp?: string
        }
        Relationships: []
      }
      clube24hs_dashboard: {
        Row: {
          already_sent: boolean | null
          assunto_feedback: string | null
          atendido_por_humano: boolean | null
          cliente_retornante: boolean | null
          criado_em: string
          data: string
          data_atendimento_humano: string | null
          data_reserva_pedida: string | null
          destino_encaminhamento: string | null
          feedback_empresa: string | null
          fora_horario: boolean | null
          forma_pagamento_escolhida: string | null
          hora: string
          id: string
          link_pagamento_enviado: boolean | null
          motivo_humano: string | null
          necessita_humano: boolean | null
          nome_cliente: string | null
          numero_cliente: string | null
          produto_interesse: string | null
          qtd_mensagens_sessao: number | null
          reserva_solicitada: boolean | null
          resumo_conversa: string | null
          sessao_id: string
          telefone_mascarado: string | null
          tipo_atendimento: string | null
          tool_chamada: string | null
          turno: string | null
        }
        Insert: {
          already_sent?: boolean | null
          assunto_feedback?: string | null
          atendido_por_humano?: boolean | null
          cliente_retornante?: boolean | null
          criado_em?: string
          data: string
          data_atendimento_humano?: string | null
          data_reserva_pedida?: string | null
          destino_encaminhamento?: string | null
          feedback_empresa?: string | null
          fora_horario?: boolean | null
          forma_pagamento_escolhida?: string | null
          hora: string
          id?: string
          link_pagamento_enviado?: boolean | null
          motivo_humano?: string | null
          necessita_humano?: boolean | null
          nome_cliente?: string | null
          numero_cliente?: string | null
          produto_interesse?: string | null
          qtd_mensagens_sessao?: number | null
          reserva_solicitada?: boolean | null
          resumo_conversa?: string | null
          sessao_id?: string
          telefone_mascarado?: string | null
          tipo_atendimento?: string | null
          tool_chamada?: string | null
          turno?: string | null
        }
        Update: {
          already_sent?: boolean | null
          assunto_feedback?: string | null
          atendido_por_humano?: boolean | null
          cliente_retornante?: boolean | null
          criado_em?: string
          data?: string
          data_atendimento_humano?: string | null
          data_reserva_pedida?: string | null
          destino_encaminhamento?: string | null
          feedback_empresa?: string | null
          fora_horario?: boolean | null
          forma_pagamento_escolhida?: string | null
          hora?: string
          id?: string
          link_pagamento_enviado?: boolean | null
          motivo_humano?: string | null
          necessita_humano?: boolean | null
          nome_cliente?: string | null
          numero_cliente?: string | null
          produto_interesse?: string | null
          qtd_mensagens_sessao?: number | null
          reserva_solicitada?: boolean | null
          resumo_conversa?: string | null
          sessao_id?: string
          telefone_mascarado?: string | null
          tipo_atendimento?: string | null
          tool_chamada?: string | null
          turno?: string | null
        }
        Relationships: []
      }
      clube24hs_evento_config: {
        Row: {
          chave: string
          created_at: string | null
          descricao: string | null
          id: number
          tipo: string | null
          updated_at: string | null
          valor: string
        }
        Insert: {
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: number
          tipo?: string | null
          updated_at?: string | null
          valor: string
        }
        Update: {
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: number
          tipo?: string | null
          updated_at?: string | null
          valor?: string
        }
        Relationships: []
      }
      clube24hs_eventos: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_evento_fim: string | null
          data_evento_inicio: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          horario_fim: string
          horario_inicio: string
          id: number
          imagem_url: string | null
          nome: string
          texto_p1: string | null
          texto_p3: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_evento_fim?: string | null
          data_evento_inicio?: string | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          horario_fim: string
          horario_inicio: string
          id?: number
          imagem_url?: string | null
          nome: string
          texto_p1?: string | null
          texto_p3?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_evento_fim?: string | null
          data_evento_inicio?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          horario_fim?: string
          horario_inicio?: string
          id?: number
          imagem_url?: string | null
          nome?: string
          texto_p1?: string | null
          texto_p3?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clube24hs_mensagens: {
        Row: {
          conteudo: string | null
          created_at: string
          dashboard_id: string | null
          data: string
          hora: string
          id: number
          remetente: string
          telefone: string
          tipo_mensagem: string | null
          tools_usadas: string | null
        }
        Insert: {
          conteudo?: string | null
          created_at?: string
          dashboard_id?: string | null
          data: string
          hora?: string
          id?: number
          remetente: string
          telefone: string
          tipo_mensagem?: string | null
          tools_usadas?: string | null
        }
        Update: {
          conteudo?: string | null
          created_at?: string
          dashboard_id?: string | null
          data?: string
          hora?: string
          id?: number
          remetente?: string
          telefone?: string
          tipo_mensagem?: string | null
          tools_usadas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clube24hs_mensagens_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "clube24hs_dashboard"
            referencedColumns: ["id"]
          },
        ]
      }
      clube24hs_reservas: {
        Row: {
          cliente_cpf: string | null
          cliente_data_nascimento: string | null
          cliente_email: string | null
          cliente_nome: string
          cliente_whatsapp: string
          confirmada_em: string | null
          created_at: string | null
          data: string | null
          evento_relacionado_id: number | null
          forma_pagamento: string | null
          horario: string | null
          id: number
          observacoes: string | null
          servico_id: number | null
          servico_nome_snapshot: string | null
          status: string | null
          updated_at: string | null
          valor_estimado: number | null
        }
        Insert: {
          cliente_cpf?: string | null
          cliente_data_nascimento?: string | null
          cliente_email?: string | null
          cliente_nome: string
          cliente_whatsapp: string
          confirmada_em?: string | null
          created_at?: string | null
          data?: string | null
          evento_relacionado_id?: number | null
          forma_pagamento?: string | null
          horario?: string | null
          id?: number
          observacoes?: string | null
          servico_id?: number | null
          servico_nome_snapshot?: string | null
          status?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Update: {
          cliente_cpf?: string | null
          cliente_data_nascimento?: string | null
          cliente_email?: string | null
          cliente_nome?: string
          cliente_whatsapp?: string
          confirmada_em?: string | null
          created_at?: string | null
          data?: string | null
          evento_relacionado_id?: number | null
          forma_pagamento?: string | null
          horario?: string | null
          id?: number
          observacoes?: string | null
          servico_id?: number | null
          servico_nome_snapshot?: string | null
          status?: string | null
          updated_at?: string | null
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clube24hs_reservas_evento_relacionado_id_fkey"
            columns: ["evento_relacionado_id"]
            isOneToOne: false
            referencedRelation: "clube24hs_eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clube24hs_reservas_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "clube24hs_servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      clube24hs_servicos: {
        Row: {
          agendavel: boolean | null
          ativo: boolean | null
          badge: string | null
          capacidade_por_slot: number | null
          categoria: string
          created_at: string | null
          descricao_curta: string | null
          descricao_longa: string | null
          duracao_minutos: number | null
          icone: string | null
          id: number
          imagem_url: string | null
          inclui: Json | null
          link_externo: string | null
          nome: string
          observacoes: string | null
          ordem_exibicao: number | null
          parcelamento_texto: string | null
          preco_base: number | null
          preco_pix: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          agendavel?: boolean | null
          ativo?: boolean | null
          badge?: string | null
          capacidade_por_slot?: number | null
          categoria: string
          created_at?: string | null
          descricao_curta?: string | null
          descricao_longa?: string | null
          duracao_minutos?: number | null
          icone?: string | null
          id?: number
          imagem_url?: string | null
          inclui?: Json | null
          link_externo?: string | null
          nome: string
          observacoes?: string | null
          ordem_exibicao?: number | null
          parcelamento_texto?: string | null
          preco_base?: number | null
          preco_pix?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          agendavel?: boolean | null
          ativo?: boolean | null
          badge?: string | null
          capacidade_por_slot?: number | null
          categoria?: string
          created_at?: string | null
          descricao_curta?: string | null
          descricao_longa?: string | null
          duracao_minutos?: number | null
          icone?: string | null
          id?: number
          imagem_url?: string | null
          inclui?: Json | null
          link_externo?: string | null
          nome?: string
          observacoes?: string | null
          ordem_exibicao?: number | null
          parcelamento_texto?: string | null
          preco_base?: number | null
          preco_pix?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      colaboradores: {
        Row: {
          ativo: boolean | null
          avatar_url: string | null
          cargo: string | null
          created_at: string | null
          email: string | null
          id: string
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativo?: boolean | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      collection_logs: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string
          records_count: number | null
          source: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          records_count?: number | null
          source: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          records_count?: number | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      company_colors: {
        Row: {
          color: string
          created_at: string | null
          created_by: string | null
          empresa_key: string
          empresa_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          color: string
          created_at?: string | null
          created_by?: string | null
          empresa_key: string
          empresa_name: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          created_by?: string | null
          empresa_key?: string
          empresa_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_colors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_rules: {
        Row: {
          active: boolean | null
          applies_to: string[] | null
          category: string | null
          created_at: string | null
          description: string
          id: string
          last_verified: string | null
          legal_base: string
          penalty: string | null
          rule_code: string
          severity: string | null
          source_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          applies_to?: string[] | null
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          last_verified?: string | null
          legal_base: string
          penalty?: string | null
          rule_code: string
          severity?: string | null
          source_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          applies_to?: string[] | null
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          last_verified?: string | null
          legal_base?: string
          penalty?: string | null
          rule_code?: string
          severity?: string | null
          source_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          atualizado_em: string | null
          chave: string
          valor: string | null
        }
        Insert: {
          atualizado_em?: string | null
          chave: string
          valor?: string | null
        }
        Update: {
          atualizado_em?: string | null
          chave?: string
          valor?: string | null
        }
        Relationships: []
      }
      controle_cards: {
        Row: {
          card_color: string | null
          closing_day: number | null
          created_at: string | null
          credit_limit: number | null
          due_day: number
          id: string
          is_active: boolean | null
          name: string
          user_id: string
        }
        Insert: {
          card_color?: string | null
          closing_day?: number | null
          created_at?: string | null
          credit_limit?: number | null
          due_day: number
          id?: string
          is_active?: boolean | null
          name: string
          user_id: string
        }
        Update: {
          card_color?: string | null
          closing_day?: number | null
          created_at?: string | null
          credit_limit?: number | null
          due_day?: number
          id?: string
          is_active?: boolean | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      controle_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_default: boolean | null
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      controle_emergency_deposits: {
        Row: {
          amount: number
          created_at: string | null
          deposit_date: string
          fund_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          deposit_date?: string
          fund_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          deposit_date?: string
          fund_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_emergency_deposits_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "controle_emergency_fund"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_emergency_fund: {
        Row: {
          created_at: string | null
          current_amount: number | null
          id: string
          monthly_expenses: number | null
          target_months: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          monthly_expenses?: number | null
          target_months?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          monthly_expenses?: number | null
          target_months?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      controle_expense_payments: {
        Row: {
          amount_paid: number
          created_at: string | null
          expense_id: string
          id: string
          paid_at: string | null
          user_id: string
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          expense_id: string
          id?: string
          paid_at?: string | null
          user_id: string
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          expense_id?: string
          id?: string
          paid_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_expense_payments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "controle_expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_expenses: {
        Row: {
          amount: number
          billing_month: number | null
          billing_year: number | null
          card_id: string | null
          category_id: string | null
          created_at: string | null
          description: string
          expense_date: string
          id: string
          notes: string | null
          payment_method: string
          user_id: string
        }
        Insert: {
          amount: number
          billing_month?: number | null
          billing_year?: number | null
          card_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description: string
          expense_date?: string
          id?: string
          notes?: string | null
          payment_method: string
          user_id: string
        }
        Update: {
          amount?: number
          billing_month?: number | null
          billing_year?: number | null
          card_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string
          expense_date?: string
          id?: string
          notes?: string | null
          payment_method?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_expenses_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "controle_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "controle_expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "controle_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_goal_deposits: {
        Row: {
          amount: number
          created_at: string
          deposit_date: string
          goal_id: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          deposit_date?: string
          goal_id: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          deposit_date?: string
          goal_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_goal_deposits_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "controle_savings_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_income: {
        Row: {
          amount: number
          created_at: string | null
          description: string
          end_date: string | null
          id: string
          income_date: string
          is_recurring: boolean | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description: string
          end_date?: string | null
          id?: string
          income_date?: string
          is_recurring?: boolean | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string
          end_date?: string | null
          id?: string
          income_date?: string
          is_recurring?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      controle_installment_payments: {
        Row: {
          amount_paid: number
          created_at: string | null
          id: string
          installment_id: string
          month: number
          paid_at: string | null
          user_id: string
          year: number
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          id?: string
          installment_id: string
          month: number
          paid_at?: string | null
          user_id: string
          year: number
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          id?: string
          installment_id?: string
          month?: number
          paid_at?: string | null
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "controle_installment_payments_installment_id_fkey"
            columns: ["installment_id"]
            isOneToOne: false
            referencedRelation: "controle_installments"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_installments: {
        Row: {
          card_id: string
          category_id: string | null
          created_at: string | null
          current_installment: number
          description: string
          id: string
          installment_amount: number
          is_active: boolean | null
          start_billing_month: number | null
          start_billing_year: number | null
          start_date: string
          total_amount: number
          total_installments: number
          user_id: string
        }
        Insert: {
          card_id: string
          category_id?: string | null
          created_at?: string | null
          current_installment?: number
          description: string
          id?: string
          installment_amount: number
          is_active?: boolean | null
          start_billing_month?: number | null
          start_billing_year?: number | null
          start_date: string
          total_amount: number
          total_installments: number
          user_id: string
        }
        Update: {
          card_id?: string
          category_id?: string | null
          created_at?: string | null
          current_installment?: number
          description?: string
          id?: string
          installment_amount?: number
          is_active?: boolean | null
          start_billing_month?: number | null
          start_billing_year?: number | null
          start_date?: string
          total_amount?: number
          total_installments?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_installments_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "controle_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "controle_installments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "controle_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      controle_recurring: {
        Row: {
          amount: number
          billing_month_offset: number | null
          card_id: string | null
          category_id: string | null
          created_at: string | null
          description: string
          due_day: number
          id: string
          is_active: boolean | null
          payment_method: string
          start_month: number | null
          start_year: number | null
          user_id: string
        }
        Insert: {
          amount: number
          billing_month_offset?: number | null
          card_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description: string
          due_day: number
          id?: string
          is_active?: boolean | null
          payment_method: string
          start_month?: number | null
          start_year?: number | null
          user_id: string
        }
        Update: {
          amount?: number
          billing_month_offset?: number | null
          card_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string
          due_day?: number
          id?: string
          is_active?: boolean | null
          payment_method?: string
          start_month?: number | null
          start_year?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_recurring_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "controle_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "controle_recurring_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "controle_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_recurring_payments: {
        Row: {
          amount_paid: number
          created_at: string | null
          id: string
          month: number
          paid_at: string | null
          recurring_id: string
          user_id: string
          year: number
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          id?: string
          month: number
          paid_at?: string | null
          recurring_id: string
          user_id: string
          year: number
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          id?: string
          month?: number
          paid_at?: string | null
          recurring_id?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "controle_recurring_payments_recurring_id_fkey"
            columns: ["recurring_id"]
            isOneToOne: false
            referencedRelation: "controle_recurring"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_saved_simulations: {
        Row: {
          annual_rate: number
          created_at: string | null
          id: string
          initial_value: number
          monthly_deposit: number
          name: string
          total_final: number
          total_invested: number
          total_return: number
          updated_at: string | null
          user_id: string
          years: number
        }
        Insert: {
          annual_rate?: number
          created_at?: string | null
          id?: string
          initial_value?: number
          monthly_deposit?: number
          name: string
          total_final?: number
          total_invested?: number
          total_return?: number
          updated_at?: string | null
          user_id: string
          years?: number
        }
        Update: {
          annual_rate?: number
          created_at?: string | null
          id?: string
          initial_value?: number
          monthly_deposit?: number
          name?: string
          total_final?: number
          total_invested?: number
          total_return?: number
          updated_at?: string | null
          user_id?: string
          years?: number
        }
        Relationships: []
      }
      controle_savings_deposits: {
        Row: {
          amount: number
          created_at: string | null
          deposit_date: string
          goal_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          deposit_date?: string
          goal_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          deposit_date?: string
          goal_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "controle_savings_deposits_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "controle_savings_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_savings_goals: {
        Row: {
          created_at: string | null
          current_amount: number | null
          id: string
          is_achieved: boolean | null
          name: string
          target_amount: number
          target_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          is_achieved?: boolean | null
          name: string
          target_amount: number
          target_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          is_achieved?: boolean | null
          name?: string
          target_amount?: number
          target_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      credentials: {
        Row: {
          access_count: number | null
          card_title: string | null
          category: string
          connection_status: string | null
          created_at: string | null
          created_by: string | null
          credential_type: string
          empresa: string | null
          encrypted_data: Json
          encryption_iv: string
          expires_at: string | null
          id: string
          is_favorite: boolean | null
          last_accessed_at: string | null
          last_tested_at: string | null
          notes: string | null
          owner_id: string | null
          service_name: string
          status: string | null
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
          url: string | null
        }
        Insert: {
          access_count?: number | null
          card_title?: string | null
          category: string
          connection_status?: string | null
          created_at?: string | null
          created_by?: string | null
          credential_type: string
          empresa?: string | null
          encrypted_data: Json
          encryption_iv: string
          expires_at?: string | null
          id?: string
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          last_tested_at?: string | null
          notes?: string | null
          owner_id?: string | null
          service_name: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          url?: string | null
        }
        Update: {
          access_count?: number | null
          card_title?: string | null
          category?: string
          connection_status?: string | null
          created_at?: string | null
          created_by?: string | null
          credential_type?: string
          empresa?: string | null
          encrypted_data?: Json
          encryption_iv?: string
          expires_at?: string | null
          id?: string
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          last_tested_at?: string | null
          notes?: string | null
          owner_id?: string | null
          service_name?: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credentials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credentials_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credentials_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_stats: {
        Row: {
          created_at: string | null
          id: string
          tarefas_concluidas: number | null
          tarefas_nao_executadas: number | null
          tarefas_pendentes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          tarefas_concluidas?: number | null
          tarefas_nao_executadas?: number | null
          tarefas_pendentes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          tarefas_concluidas?: number | null
          tarefas_nao_executadas?: number | null
          tarefas_pendentes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      electoral_calendar: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string
          event_end_date: string | null
          id: string
          impact_on_campaign: string | null
          is_blackout: boolean | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date: string
          event_end_date?: string | null
          id?: string
          impact_on_campaign?: string | null
          is_blackout?: boolean | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_end_date?: string | null
          id?: string
          impact_on_campaign?: string | null
          is_blackout?: boolean | null
          title?: string
        }
        Relationships: []
      }
      eventorecord_convidados: {
        Row: {
          acessou_em: string | null
          id: string
          nome: string
          senha: string
        }
        Insert: {
          acessou_em?: string | null
          id?: string
          nome: string
          senha: string
        }
        Update: {
          acessou_em?: string | null
          id?: string
          nome?: string
          senha?: string
        }
        Relationships: []
      }
      fbpaulinhoforca_chat_memory: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          metadata: Json | null
          role: string
          tipo_interacao: string | null
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          metadata?: Json | null
          role: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          metadata?: Json | null
          role?: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_chat_memory_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_chat_memory_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_chat_memory_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_comentarios: {
        Row: {
          conta_id: string | null
          created_at: string | null
          curtido: boolean | null
          deletado: boolean | null
          dm_enviada: boolean | null
          fb_comment_id: string
          fb_reply_id: string | null
          id: string
          motivo_sentimento: string | null
          ocultado: boolean | null
          post_id: string | null
          respondido: boolean | null
          resposta_ia: string | null
          score_sentimento: number | null
          sentimento: string | null
          texto: string | null
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          dm_enviada?: boolean | null
          fb_comment_id: string
          fb_reply_id?: string | null
          id?: string
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto?: string | null
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          dm_enviada?: boolean | null
          fb_comment_id?: string
          fb_reply_id?: string | null
          id?: string
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_comentarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_comentarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_comentarios_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_comentarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_contas: {
        Row: {
          about: string | null
          ativo: boolean | null
          categoria: string | null
          created_at: string | null
          fan_count: number | null
          fb_page_id: string
          fb_token: string | null
          followers_count: number | null
          id: string
          last_profile_sync_at: string | null
          nome: string | null
          page_access_token: string | null
          profile_pic_storage_url: string | null
          profile_pic_url: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fan_count?: number | null
          fb_page_id: string
          fb_token?: string | null
          followers_count?: number | null
          id?: string
          last_profile_sync_at?: string | null
          nome?: string | null
          page_access_token?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fan_count?: number | null
          fb_page_id?: string
          fb_token?: string | null
          followers_count?: number | null
          id?: string
          last_profile_sync_at?: string | null
          nome?: string | null
          page_access_token?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      fbpaulinhoforca_dm_enviadas: {
        Row: {
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string | null
          numero_tentativa: number | null
          tipo: string | null
          usuario_id: string | null
          usuario_respondeu: boolean | null
        }
        Insert: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string | null
          numero_tentativa?: number | null
          tipo?: string | null
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
        }
        Update: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string | null
          numero_tentativa?: number | null
          tipo?: string | null
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_dm_enviadas_comentario_id_fkey"
            columns: ["comentario_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_comentarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_dm_enviadas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_dm_enviadas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_dm_enviadas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_insights_snapshots: {
        Row: {
          captured_at: string
          conta_id: string
          created_at: string | null
          error: string | null
          id: string
          page_fan_adds: number | null
          page_fans: number | null
          page_follows: number | null
          page_post_engagements: number | null
          page_video_views: number | null
          page_views_total: number | null
          period: string
          period_days: number
          raw: Json | null
        }
        Insert: {
          captured_at?: string
          conta_id: string
          created_at?: string | null
          error?: string | null
          id?: string
          page_fan_adds?: number | null
          page_fans?: number | null
          page_follows?: number | null
          page_post_engagements?: number | null
          page_video_views?: number | null
          page_views_total?: number | null
          period: string
          period_days: number
          raw?: Json | null
        }
        Update: {
          captured_at?: string
          conta_id?: string
          created_at?: string | null
          error?: string | null
          id?: string
          page_fan_adds?: number | null
          page_fans?: number | null
          page_follows?: number | null
          page_post_engagements?: number | null
          page_video_views?: number | null
          page_views_total?: number | null
          period?: string
          period_days?: number
          raw?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_leads_coletados: {
        Row: {
          aceita_avisos: boolean | null
          aceita_avisos_em: string | null
          bairro: string | null
          bloqueado: boolean | null
          cep: string | null
          cep_tentativas: number | null
          cidade: string | null
          coletado_em: string | null
          conta_id: string | null
          created_at: string | null
          dados_completos: boolean | null
          desinteresse: boolean | null
          desinteresse_em: string | null
          email: string | null
          estado: string | null
          fb_user_id: string | null
          followup_enviado: boolean | null
          id: string
          latitude: string | null
          lgpd_aceito: boolean | null
          lgpd_aceito_em: string | null
          lgpd_recusas: number | null
          longitude: string | null
          motivo_recusa: string | null
          nome_completo: string | null
          nome_confirmado: boolean | null
          profissao: string | null
          recusas_seguidas: number | null
          recusou_conversa: boolean | null
          resumo: Json | null
          rua: string | null
          sentimento: string | null
          solicitacao: Json | null
          solicitacao_pendente: string | null
          solicitacao2: Json
          solucao: string | null
          sugestao_perguntada: boolean | null
          telefone: string | null
          telefone_sem_ddd: string | null
          token: string | null
          ultima_acao: string | null
          updated_at: string | null
          username: string | null
          usuario_id: string | null
        }
        Insert: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cep_tentativas?: number | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          fb_user_id?: string | null
          followup_enviado?: boolean | null
          id?: string
          latitude?: string | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: string | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          profissao?: string | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solicitacao_pendente?: string | null
          solicitacao2?: Json
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          telefone_sem_ddd?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Update: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cep_tentativas?: number | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          fb_user_id?: string | null
          followup_enviado?: boolean | null
          id?: string
          latitude?: string | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: string | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          profissao?: string | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solicitacao_pendente?: string | null
          solicitacao2?: Json
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          telefone_sem_ddd?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_leads_coletados_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_leads_coletados_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_leads_coletados_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_logs_agente: {
        Row: {
          acao: string
          conta_id: string | null
          created_at: string | null
          id: string
          input_data: Json | null
          modelo_usado: string | null
          output_data: Json | null
        }
        Insert: {
          acao: string
          conta_id?: string | null
          created_at?: string | null
          id?: string
          input_data?: Json | null
          modelo_usado?: string | null
          output_data?: Json | null
        }
        Update: {
          acao?: string
          conta_id?: string | null
          created_at?: string | null
          id?: string
          input_data?: Json | null
          modelo_usado?: string | null
          output_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_logs_agente_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_logs_agente_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_posts: {
        Row: {
          conta_id: string | null
          created_at: string | null
          fb_post_id: string
          id: string
          imagem_url: string | null
          media_baixada: boolean | null
          media_url_storage: string | null
          mensagem: string | null
          permalink: string | null
          publicado_em: string | null
          status_type: string | null
          thumbnail_url_storage: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          fb_post_id: string
          id?: string
          imagem_url?: string | null
          media_baixada?: boolean | null
          media_url_storage?: string | null
          mensagem?: string | null
          permalink?: string | null
          publicado_em?: string | null
          status_type?: string | null
          thumbnail_url_storage?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          fb_post_id?: string
          id?: string
          imagem_url?: string | null
          media_baixada?: boolean | null
          media_url_storage?: string | null
          mensagem?: string | null
          permalink?: string | null
          publicado_em?: string | null
          status_type?: string | null
          thumbnail_url_storage?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_posts_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_posts_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_respostas_historico: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          padrao_usado: string | null
          resposta: string
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta: string
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta?: string
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_respostas_historico_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_respostas_historico_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_solicitacoes_tags: {
        Row: {
          id: string
          nota: string | null
          status: string
          updated_at: string
          usuario_id: string
        }
        Insert: {
          id?: string
          nota?: string | null
          status?: string
          updated_at?: string
          usuario_id: string
        }
        Update: {
          id?: string
          nota?: string | null
          status?: string
          updated_at?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_solicitacoes_tags_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "fbpaulinhoforca_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbpaulinhoforca_usuarios_facebook: {
        Row: {
          created_at: string | null
          dm_bloqueado: boolean | null
          dm_tentativas: number | null
          dm_ultima_data: string | null
          fb_user_id: string
          id: string
          nome: string | null
          primeiro_nome: string | null
          profile_pic_url: string | null
          total_comentarios: number | null
          total_interacoes: number | null
          ultima_interacao: string | null
          ultimo_nome: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          fb_user_id: string
          id?: string
          nome?: string | null
          primeiro_nome?: string | null
          profile_pic_url?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          ultimo_nome?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          fb_user_id?: string
          id?: string
          nome?: string | null
          primeiro_nome?: string | null
          profile_pic_url?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          ultimo_nome?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fbrenatasene_chat_memory: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          metadata: Json | null
          role: string
          tipo_interacao: string | null
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          metadata?: Json | null
          role: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          metadata?: Json | null
          role?: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbrenatasene_chat_memory_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbrenatasene_comentarios: {
        Row: {
          conta_id: string | null
          created_at: string | null
          curtido: boolean | null
          deletado: boolean | null
          dm_enviada: boolean | null
          fb_comment_id: string | null
          fb_reply_id: string | null
          id: string
          motivo_sentimento: string | null
          ocultado: boolean | null
          post_id: string | null
          respondido: boolean | null
          resposta_ia: string | null
          score_sentimento: number | null
          sentimento: string | null
          texto: string | null
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          dm_enviada?: boolean | null
          fb_comment_id?: string | null
          fb_reply_id?: string | null
          id?: string
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto?: string | null
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          dm_enviada?: boolean | null
          fb_comment_id?: string | null
          fb_reply_id?: string | null
          id?: string
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbrenatasene_comentarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbrenatasene_comentarios_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbrenatasene_comentarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbrenatasene_contas: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          fb_page_id: string
          fb_token: string | null
          id: string
          nome: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          fb_page_id: string
          fb_token?: string | null
          id?: string
          nome?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          fb_page_id?: string
          fb_token?: string | null
          id?: string
          nome?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fbrenatasene_dm_enviadas: {
        Row: {
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          numero_tentativa: number | null
          tipo: string
          usuario_id: string | null
          usuario_respondeu: boolean | null
        }
        Insert: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          numero_tentativa?: number | null
          tipo: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
        }
        Update: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          numero_tentativa?: number | null
          tipo?: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fbrenatasene_dm_enviadas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_usuarios_facebook"
            referencedColumns: ["id"]
          },
        ]
      }
      fbrenatasene_leads_coletados: {
        Row: {
          bairro: string | null
          bloqueado: boolean | null
          cep: string | null
          cep_tentativas: number | null
          cidade: string | null
          coletado_em: string | null
          conta_id: string | null
          created_at: string | null
          dados_completos: boolean | null
          desinteresse: boolean | null
          desinteresse_em: string | null
          email: string | null
          estado: string | null
          fb_user_id: string
          followup_enviado: boolean | null
          helena_contact_id: string | null
          helena_sincronizado_em: string | null
          helena_sync_pending: boolean | null
          id: string
          latitude: string | null
          lgpd_aceito: boolean | null
          lgpd_aceito_em: string | null
          lgpd_recusas: number | null
          longitude: string | null
          motivo_recusa: string | null
          nome_completo: string | null
          nome_confirmado: boolean | null
          recusas_seguidas: number | null
          recusou_conversa: boolean | null
          resumo: Json | null
          rua: string | null
          sentimento: string | null
          solicitacao: Json | null
          sugestao_perguntada: boolean | null
          telefone: string | null
          telefone_sem_ddd: string | null
          token: string | null
          ultima_acao: string | null
          updated_at: string | null
          username: string | null
          usuario_id: string | null
        }
        Insert: {
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cep_tentativas?: number | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          fb_user_id: string
          followup_enviado?: boolean | null
          helena_contact_id?: string | null
          helena_sincronizado_em?: string | null
          helena_sync_pending?: boolean | null
          id?: string
          latitude?: string | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: string | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          telefone_sem_ddd?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Update: {
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cep_tentativas?: number | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          fb_user_id?: string
          followup_enviado?: boolean | null
          helena_contact_id?: string | null
          helena_sincronizado_em?: string | null
          helena_sync_pending?: boolean | null
          id?: string
          latitude?: string | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: string | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          telefone_sem_ddd?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      fbrenatasene_logs_agente: {
        Row: {
          acao: string
          conta_id: string | null
          created_at: string | null
          id: string
          input_data: Json | null
          modelo_usado: string | null
          output_data: Json | null
        }
        Insert: {
          acao: string
          conta_id?: string | null
          created_at?: string | null
          id?: string
          input_data?: Json | null
          modelo_usado?: string | null
          output_data?: Json | null
        }
        Update: {
          acao?: string
          conta_id?: string | null
          created_at?: string | null
          id?: string
          input_data?: Json | null
          modelo_usado?: string | null
          output_data?: Json | null
        }
        Relationships: []
      }
      fbrenatasene_posts: {
        Row: {
          conta_id: string | null
          created_at: string | null
          fb_post_id: string
          id: string
          imagem_url: string | null
          media_baixada: boolean | null
          media_url_storage: string | null
          mensagem: string | null
          permalink: string | null
          publicado_em: string | null
          status_type: string | null
          thumbnail_url_storage: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          fb_post_id: string
          id?: string
          imagem_url?: string | null
          media_baixada?: boolean | null
          media_url_storage?: string | null
          mensagem?: string | null
          permalink?: string | null
          publicado_em?: string | null
          status_type?: string | null
          thumbnail_url_storage?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          fb_post_id?: string
          id?: string
          imagem_url?: string | null
          media_baixada?: boolean | null
          media_url_storage?: string | null
          mensagem?: string | null
          permalink?: string | null
          publicado_em?: string | null
          status_type?: string | null
          thumbnail_url_storage?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbrenatasene_posts_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_contas"
            referencedColumns: ["id"]
          },
        ]
      }
      fbrenatasene_respostas_historico: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          padrao_usado: string | null
          resposta: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbrenatasene_respostas_historico_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbrenatasene_contas"
            referencedColumns: ["id"]
          },
        ]
      }
      fbrenatasene_usuarios_facebook: {
        Row: {
          bio: string | null
          conta_id: string | null
          created_at: string | null
          fb_user_id: string
          id: string
          nome: string | null
          primeira_interacao: string | null
          profile_pic_url: string | null
          ultima_interacao: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          conta_id?: string | null
          created_at?: string | null
          fb_user_id: string
          id?: string
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_url?: string | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          conta_id?: string | null
          created_at?: string | null
          fb_user_id?: string
          id?: string
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_url?: string | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      financial_goals: {
        Row: {
          created_at: string
          id: string
          month_year: string
          notes: string | null
          target_profit: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          month_year: string
          notes?: string | null
          target_profit: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          month_year?: string
          notes?: string | null
          target_profit?: number
          updated_at?: string
        }
        Relationships: []
      }
      fixed_costs: {
        Row: {
          amount: number
          cost_name: string
          cost_type: string | null
          created_at: string
          due_date: number
          employee_name: string | null
          id: string
          is_active: boolean
          payment_method: string
          updated_at: string
        }
        Insert: {
          amount: number
          cost_name: string
          cost_type?: string | null
          created_at?: string
          due_date: number
          employee_name?: string | null
          id?: string
          is_active?: boolean
          payment_method: string
          updated_at?: string
        }
        Update: {
          amount?: number
          cost_name?: string
          cost_type?: string | null
          created_at?: string
          due_date?: number
          employee_name?: string | null
          id?: string
          is_active?: boolean
          payment_method?: string
          updated_at?: string
        }
        Relationships: []
      }
      general_notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          note_date: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          note_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          note_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      helton: {
        Row: {
          aprovado: boolean | null
          avatar_url: string | null
          cargo: string | null
          created_at: string | null
          email: string
          id: string
          idioma: string | null
          logo_url: string | null
          modo_escuro: boolean | null
          nome_completo: string
          notificacoes_prazos: boolean | null
          notificacoes_tarefas: boolean | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          aprovado?: boolean | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string | null
          email: string
          id: string
          idioma?: string | null
          logo_url?: string | null
          modo_escuro?: boolean | null
          nome_completo: string
          notificacoes_prazos?: boolean | null
          notificacoes_tarefas?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          aprovado?: boolean | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string | null
          email?: string
          id?: string
          idioma?: string | null
          logo_url?: string | null
          modo_escuro?: boolean | null
          nome_completo?: string
          notificacoes_prazos?: boolean | null
          notificacoes_tarefas?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      in9ve_analisesatendente: {
        Row: {
          agendou_visita_tecnica: boolean | null
          analisado_em: string | null
          analise_completa: Json | null
          atendente_id: string | null
          atendente_nome: string | null
          clareza_comunicacao: number | null
          classificacao_geral: string | null
          cliente_nome: string | null
          cliente_telefone: string | null
          conseguiu_reter: boolean | null
          created_at: string | null
          data_hora_atendimento: string | null
          dentro_horario_comercial: boolean | null
          duracao_total: string | null
          feedback_explicito: string | null
          horario_fim: string | null
          horario_inicio: string | null
          id: number
          linguagem_profissional: boolean | null
          mensagem_erro: string | null
          nivel_satisfacao: string | null
          nota_final: number | null
          nps_estimado: number | null
          observacao_periodo: string | null
          ofereceu_upgrade: boolean | null
          oportunidades_comerciais: Json | null
          paciencia: number | null
          personalizacao: number | null
          pontos_atencao: Json | null
          pontos_fortes_atendente: Json | null
          proatividade: boolean | null
          problema_resolvido: string | null
          proxima_acao: string | null
          requer_acao: boolean | null
          resumo_atendimento: string | null
          session_id: string
          tags: Json | null
          tem_erro: boolean | null
          tempo_resposta_classificacao: string | null
          tempo_resposta_media: string | null
          tom_cordialidade: number | null
          total_mensagens: number | null
          updated_at: string | null
        }
        Insert: {
          agendou_visita_tecnica?: boolean | null
          analisado_em?: string | null
          analise_completa?: Json | null
          atendente_id?: string | null
          atendente_nome?: string | null
          clareza_comunicacao?: number | null
          classificacao_geral?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          conseguiu_reter?: boolean | null
          created_at?: string | null
          data_hora_atendimento?: string | null
          dentro_horario_comercial?: boolean | null
          duracao_total?: string | null
          feedback_explicito?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: number
          linguagem_profissional?: boolean | null
          mensagem_erro?: string | null
          nivel_satisfacao?: string | null
          nota_final?: number | null
          nps_estimado?: number | null
          observacao_periodo?: string | null
          ofereceu_upgrade?: boolean | null
          oportunidades_comerciais?: Json | null
          paciencia?: number | null
          personalizacao?: number | null
          pontos_atencao?: Json | null
          pontos_fortes_atendente?: Json | null
          proatividade?: boolean | null
          problema_resolvido?: string | null
          proxima_acao?: string | null
          requer_acao?: boolean | null
          resumo_atendimento?: string | null
          session_id: string
          tags?: Json | null
          tem_erro?: boolean | null
          tempo_resposta_classificacao?: string | null
          tempo_resposta_media?: string | null
          tom_cordialidade?: number | null
          total_mensagens?: number | null
          updated_at?: string | null
        }
        Update: {
          agendou_visita_tecnica?: boolean | null
          analisado_em?: string | null
          analise_completa?: Json | null
          atendente_id?: string | null
          atendente_nome?: string | null
          clareza_comunicacao?: number | null
          classificacao_geral?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          conseguiu_reter?: boolean | null
          created_at?: string | null
          data_hora_atendimento?: string | null
          dentro_horario_comercial?: boolean | null
          duracao_total?: string | null
          feedback_explicito?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: number
          linguagem_profissional?: boolean | null
          mensagem_erro?: string | null
          nivel_satisfacao?: string | null
          nota_final?: number | null
          nps_estimado?: number | null
          observacao_periodo?: string | null
          ofereceu_upgrade?: boolean | null
          oportunidades_comerciais?: Json | null
          paciencia?: number | null
          personalizacao?: number | null
          pontos_atencao?: Json | null
          pontos_fortes_atendente?: Json | null
          proatividade?: boolean | null
          problema_resolvido?: string | null
          proxima_acao?: string | null
          requer_acao?: boolean | null
          resumo_atendimento?: string | null
          session_id?: string
          tags?: Json | null
          tem_erro?: boolean | null
          tempo_resposta_classificacao?: string | null
          tempo_resposta_media?: string | null
          tom_cordialidade?: number | null
          total_mensagens?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      in9ve_sistemaanalise_ia: {
        Row: {
          data_fim: string | null
          data_inicio: string | null
          id: string
          nome_cliente: string | null
          regiao: string | null
          resolvido_por_ia: boolean | null
          resumo_atendimento: string | null
          sentimento: string | null
          solicitacao_cliente: string | null
          telefone_cliente: string | null
          transferiu_para_humano: string | null
        }
        Insert: {
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          nome_cliente?: string | null
          regiao?: string | null
          resolvido_por_ia?: boolean | null
          resumo_atendimento?: string | null
          sentimento?: string | null
          solicitacao_cliente?: string | null
          telefone_cliente?: string | null
          transferiu_para_humano?: string | null
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          nome_cliente?: string | null
          regiao?: string | null
          resolvido_por_ia?: boolean | null
          resumo_atendimento?: string | null
          sentimento?: string | null
          solicitacao_cliente?: string | null
          telefone_cliente?: string | null
          transferiu_para_humano?: string | null
        }
        Relationships: []
      }
      in9ve_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
        }
        Relationships: []
      }
      instapaulinhoforca_chat_memory: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          metadata: Json | null
          role: string
          tipo_interacao: string | null
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          metadata?: Json | null
          role: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          metadata?: Json | null
          role?: string
          tipo_interacao?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_chat_memory_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_chat_memory_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_chat_memory_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_comentarios: {
        Row: {
          conta_id: string | null
          created_at: string | null
          curtido: boolean | null
          deletado: boolean | null
          deleted_by_user_at: string | null
          dm_enviada: boolean | null
          id: string
          ig_comment_id: string
          ig_reply_id: string | null
          motivo_sentimento: string | null
          ocultado: boolean | null
          post_id: string | null
          replied_at: string | null
          reply_comment_id: string | null
          respondido: boolean | null
          resposta_ia: string | null
          reverted_at: string | null
          score_sentimento: number | null
          sentimento: string | null
          texto: string
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          deleted_by_user_at?: string | null
          dm_enviada?: boolean | null
          id?: string
          ig_comment_id: string
          ig_reply_id?: string | null
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          replied_at?: string | null
          reply_comment_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          reverted_at?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto: string
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          curtido?: boolean | null
          deletado?: boolean | null
          deleted_by_user_at?: string | null
          dm_enviada?: boolean | null
          id?: string
          ig_comment_id?: string
          ig_reply_id?: string | null
          motivo_sentimento?: string | null
          ocultado?: boolean | null
          post_id?: string | null
          replied_at?: string | null
          reply_comment_id?: string | null
          respondido?: boolean | null
          resposta_ia?: string | null
          reverted_at?: string | null
          score_sentimento?: number | null
          sentimento?: string | null
          texto?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_comentarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_comentarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_comentarios_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_comentarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_compliance_log: {
        Row: {
          comentario_original: string | null
          comment_id: string | null
          created_at: string | null
          id: string
          motivo: string | null
          resposta_grok: string | null
          resposta_publicada: string | null
          severity: string | null
          username: string | null
          violations: Json | null
        }
        Insert: {
          comentario_original?: string | null
          comment_id?: string | null
          created_at?: string | null
          id?: string
          motivo?: string | null
          resposta_grok?: string | null
          resposta_publicada?: string | null
          severity?: string | null
          username?: string | null
          violations?: Json | null
        }
        Update: {
          comentario_original?: string | null
          comment_id?: string | null
          created_at?: string | null
          id?: string
          motivo?: string | null
          resposta_grok?: string | null
          resposta_publicada?: string | null
          severity?: string | null
          username?: string | null
          violations?: Json | null
        }
        Relationships: []
      }
      instapaulinhoforca_contas: {
        Row: {
          ativo: boolean | null
          bio: string | null
          categoria: string | null
          created_at: string | null
          external_url: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          ig_token: string
          ig_user_id: string
          is_business_account: boolean | null
          is_verified: boolean | null
          last_profile_sync_at: string | null
          media_count: number | null
          nome: string | null
          profile_pic_url: string | null
          profile_pic_url_hd: string | null
          token_expira_em: string | null
          updated_at: string | null
          username: string
          webhook_verify_token: string | null
          website: string | null
        }
        Insert: {
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_token: string
          ig_user_id: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          token_expira_em?: string | null
          updated_at?: string | null
          username: string
          webhook_verify_token?: string | null
          website?: string | null
        }
        Update: {
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_token?: string
          ig_user_id?: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          token_expira_em?: string | null
          updated_at?: string | null
          username?: string
          webhook_verify_token?: string | null
          website?: string | null
        }
        Relationships: []
      }
      instapaulinhoforca_dm_enviadas: {
        Row: {
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          numero_tentativa: number | null
          tipo: string
          usuario_id: string | null
          usuario_respondeu: boolean | null
          usuario_seguia: boolean | null
        }
        Insert: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          numero_tentativa?: number | null
          tipo: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
          usuario_seguia?: boolean | null
        }
        Update: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          numero_tentativa?: number | null
          tipo?: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
          usuario_seguia?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_dm_enviadas_comentario_id_fkey"
            columns: ["comentario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_comentarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_dm_enviadas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_dm_enviadas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_dm_enviadas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_ia_chat_memoria: {
        Row: {
          created_at: string
          id: string
          key: string
          session_id: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          session_id: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          session_id?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      instapaulinhoforca_ia_chat_mensagens: {
        Row: {
          content: string | null
          created_at: string
          id: string
          role: string
          session_id: string
          squad_id: string | null
          tool_call: Json | null
          tool_result: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          role: string
          session_id: string
          squad_id?: string | null
          tool_call?: Json | null
          tool_result?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          role?: string
          session_id?: string
          squad_id?: string | null
          tool_call?: Json | null
          tool_result?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "paulinhoforca_chat_mensagens_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_ia_squads"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_ia_config: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      instapaulinhoforca_ia_squads: {
        Row: {
          ativo: boolean
          description: string | null
          greeting: string | null
          icon: string | null
          id: string
          name: string
          prompt_compiled: string
          tags: string[] | null
          tools: Json
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          description?: string | null
          greeting?: string | null
          icon?: string | null
          id: string
          name: string
          prompt_compiled: string
          tags?: string[] | null
          tools?: Json
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          description?: string | null
          greeting?: string | null
          icon?: string | null
          id?: string
          name?: string
          prompt_compiled?: string
          tags?: string[] | null
          tools?: Json
          updated_at?: string
        }
        Relationships: []
      }
      instapaulinhoforca_insights_snapshots: {
        Row: {
          accounts_engaged: number | null
          captured_at: string | null
          comments: number | null
          conta_id: string | null
          engaged_audience_demographics: Json | null
          error: string | null
          follower_demographics: Json | null
          follows: number | null
          id: string
          likes: number | null
          net_follows: number | null
          period: string | null
          period_days: number | null
          profile_links_taps: number | null
          raw: Json | null
          reach: number | null
          replies: number | null
          reposts: number | null
          saves: number | null
          shares: number | null
          total_interactions: number | null
          unfollows: number | null
          views: number | null
        }
        Insert: {
          accounts_engaged?: number | null
          captured_at?: string | null
          comments?: number | null
          conta_id?: string | null
          engaged_audience_demographics?: Json | null
          error?: string | null
          follower_demographics?: Json | null
          follows?: number | null
          id?: string
          likes?: number | null
          net_follows?: number | null
          period?: string | null
          period_days?: number | null
          profile_links_taps?: number | null
          raw?: Json | null
          reach?: number | null
          replies?: number | null
          reposts?: number | null
          saves?: number | null
          shares?: number | null
          total_interactions?: number | null
          unfollows?: number | null
          views?: number | null
        }
        Update: {
          accounts_engaged?: number | null
          captured_at?: string | null
          comments?: number | null
          conta_id?: string | null
          engaged_audience_demographics?: Json | null
          error?: string | null
          follower_demographics?: Json | null
          follows?: number | null
          id?: string
          likes?: number | null
          net_follows?: number | null
          period?: string | null
          period_days?: number | null
          profile_links_taps?: number | null
          raw?: Json | null
          reach?: number | null
          replies?: number | null
          reposts?: number | null
          saves?: number | null
          shares?: number | null
          total_interactions?: number | null
          unfollows?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_leads_coletados: {
        Row: {
          aceita_avisos: boolean | null
          aceita_avisos_em: string | null
          bairro: string | null
          bloqueado: boolean | null
          cep: string | null
          cidade: string | null
          coletado_em: string | null
          conta_id: string | null
          created_at: string | null
          dados_completos: boolean | null
          desinteresse: boolean | null
          desinteresse_em: string | null
          estado: string | null
          followup_enviado: boolean | null
          id: string
          ig_user_id: string
          latitude: number | null
          lgpd_aceito: boolean | null
          lgpd_aceito_em: string | null
          lgpd_recusas: number | null
          longitude: number | null
          motivo_recusa: string | null
          nome_completo: string | null
          nome_confirmado: boolean | null
          primeira_dm_incompleta: boolean | null
          recusas_seguidas: number | null
          recusou_conversa: boolean | null
          resumo: Json | null
          rua: string | null
          sentimento: string | null
          solicitacao: Json | null
          solucao: string | null
          sugestao_perguntada: boolean | null
          telefone: string | null
          token: string | null
          ultima_acao: string | null
          updated_at: string | null
          username: string | null
          usuario_id: string | null
        }
        Insert: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          estado?: string | null
          followup_enviado?: boolean | null
          id?: string
          ig_user_id: string
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          primeira_dm_incompleta?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Update: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          dados_completos?: boolean | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          estado?: string | null
          followup_enviado?: boolean | null
          id?: string
          ig_user_id?: string
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          primeira_dm_incompleta?: boolean | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_leads_coletados_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_leads_coletados_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_leads_coletados_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_logs_agente: {
        Row: {
          acao: string
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          erro: string | null
          id: string
          input_data: Json | null
          latencia_ms: number | null
          modelo_usado: string | null
          output_data: Json | null
          tokens_usados: number | null
        }
        Insert: {
          acao: string
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          erro?: string | null
          id?: string
          input_data?: Json | null
          latencia_ms?: number | null
          modelo_usado?: string | null
          output_data?: Json | null
          tokens_usados?: number | null
        }
        Update: {
          acao?: string
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          erro?: string | null
          id?: string
          input_data?: Json | null
          latencia_ms?: number | null
          modelo_usado?: string | null
          output_data?: Json | null
          tokens_usados?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_logs_agente_comentario_id_fkey"
            columns: ["comentario_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_comentarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_logs_agente_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_logs_agente_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_perfis_monitorados: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          rede: string
          rotulo: string | null
          ultima_sync_at: string | null
          ultima_sync_erro: string | null
          updated_at: string
          username: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          rede?: string
          rotulo?: string | null
          ultima_sync_at?: string | null
          ultima_sync_erro?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          rede?: string
          rotulo?: string | null
          ultima_sync_at?: string | null
          ultima_sync_erro?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      instapaulinhoforca_post_insights: {
        Row: {
          captured_at: string | null
          clips_replays_count: number | null
          comments: number | null
          error: string | null
          follows: number | null
          id: string
          ig_media_id: string | null
          ig_reels_aggregated_all_plays_count: number | null
          ig_reels_avg_watch_time: number | null
          ig_reels_video_view_total_time: number | null
          likes: number | null
          post_id: string | null
          profile_activity: number | null
          profile_visits: number | null
          raw: Json | null
          reach: number | null
          saves: number | null
          shares: number | null
          tipo_media: string | null
          total_interactions: number | null
          views: number | null
        }
        Insert: {
          captured_at?: string | null
          clips_replays_count?: number | null
          comments?: number | null
          error?: string | null
          follows?: number | null
          id?: string
          ig_media_id?: string | null
          ig_reels_aggregated_all_plays_count?: number | null
          ig_reels_avg_watch_time?: number | null
          ig_reels_video_view_total_time?: number | null
          likes?: number | null
          post_id?: string | null
          profile_activity?: number | null
          profile_visits?: number | null
          raw?: Json | null
          reach?: number | null
          saves?: number | null
          shares?: number | null
          tipo_media?: string | null
          total_interactions?: number | null
          views?: number | null
        }
        Update: {
          captured_at?: string | null
          clips_replays_count?: number | null
          comments?: number | null
          error?: string | null
          follows?: number | null
          id?: string
          ig_media_id?: string | null
          ig_reels_aggregated_all_plays_count?: number | null
          ig_reels_avg_watch_time?: number | null
          ig_reels_video_view_total_time?: number | null
          likes?: number | null
          post_id?: string | null
          profile_activity?: number | null
          profile_visits?: number | null
          raw?: Json | null
          reach?: number | null
          saves?: number | null
          shares?: number | null
          tipo_media?: string | null
          total_interactions?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_post_insights_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_posts: {
        Row: {
          caption: string | null
          comments_count: number | null
          conta_id: string | null
          created_at: string | null
          hashtags: string[] | null
          id: string
          ig_media_id: string
          likes_count: number | null
          media_baixada: boolean | null
          media_url: string | null
          media_url_storage: string | null
          permalink: string | null
          produto_media: string | null
          publicado_em: string | null
          thumbnail_url: string | null
          thumbnail_url_storage: string | null
          tipo_media: string | null
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          comments_count?: number | null
          conta_id?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          ig_media_id: string
          likes_count?: number | null
          media_baixada?: boolean | null
          media_url?: string | null
          media_url_storage?: string | null
          permalink?: string | null
          produto_media?: string | null
          publicado_em?: string | null
          thumbnail_url?: string | null
          thumbnail_url_storage?: string | null
          tipo_media?: string | null
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          comments_count?: number | null
          conta_id?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          ig_media_id?: string
          likes_count?: number | null
          media_baixada?: boolean | null
          media_url?: string | null
          media_url_storage?: string | null
          permalink?: string | null
          produto_media?: string | null
          publicado_em?: string | null
          thumbnail_url?: string | null
          thumbnail_url_storage?: string | null
          tipo_media?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_posts_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_posts_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_profile_snapshots: {
        Row: {
          bio: string | null
          captured_at: string | null
          categoria: string | null
          conta_id: string | null
          external_url: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          is_business_account: boolean | null
          is_verified: boolean | null
          media_count: number | null
          nome: string | null
          profile_pic_url: string | null
          profile_pic_url_hd: string | null
          raw: Json | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          captured_at?: string | null
          categoria?: string | null
          conta_id?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          raw?: Json | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          captured_at?: string | null
          categoria?: string | null
          conta_id?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_business_account?: boolean | null
          is_verified?: boolean | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          raw?: Json | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_profile_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_profile_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_respostas_historico: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          padrao_usado: string | null
          resposta: string
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta: string
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          padrao_usado?: string | null
          resposta?: string
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_respostas_historico_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_respostas_historico_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_snapshots_concorrentes: {
        Row: {
          avg_engagement_pct: number | null
          biography: string | null
          captured_at: string
          followers_count: number | null
          follows_count: number | null
          id: string
          media_count: number | null
          perfil_id: string
          posts_recentes: Json | null
          profile_picture_url: string | null
          raw: Json | null
          total_comments: number | null
          total_likes: number | null
          ultimos_n_posts: number | null
          username: string
          website: string | null
        }
        Insert: {
          avg_engagement_pct?: number | null
          biography?: string | null
          captured_at?: string
          followers_count?: number | null
          follows_count?: number | null
          id?: string
          media_count?: number | null
          perfil_id: string
          posts_recentes?: Json | null
          profile_picture_url?: string | null
          raw?: Json | null
          total_comments?: number | null
          total_likes?: number | null
          ultimos_n_posts?: number | null
          username: string
          website?: string | null
        }
        Update: {
          avg_engagement_pct?: number | null
          biography?: string | null
          captured_at?: string
          followers_count?: number | null
          follows_count?: number | null
          id?: string
          media_count?: number | null
          perfil_id?: string
          posts_recentes?: Json | null
          profile_picture_url?: string | null
          raw?: Json | null
          total_comments?: number | null
          total_likes?: number | null
          ultimos_n_posts?: number | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_snapshots_concorrentes_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_perfis_monitorados"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_solicitacoes_tags: {
        Row: {
          id: string
          nota: string | null
          status: string
          updated_at: string
          usuario_id: string
        }
        Insert: {
          id?: string
          nota?: string | null
          status?: string
          updated_at?: string
          usuario_id: string
        }
        Update: {
          id?: string
          nota?: string | null
          status?: string
          updated_at?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_solicitacoes_tags_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "instapaulinhoforca_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instapaulinhoforca_usuarios_instagram: {
        Row: {
          bio: string | null
          categoria: string | null
          created_at: string | null
          dm_bloqueado: boolean | null
          dm_tentativas: number | null
          dm_ultima_data: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          ig_user_id: string
          is_following: boolean | null
          is_premium: boolean | null
          is_verified: boolean | null
          motivo_nao_seguir: string | null
          nome: string | null
          primeira_interacao: string | null
          profile_pic_storage_url: string | null
          profile_pic_synced_at: string | null
          profile_pic_url: string | null
          sentimento_predominante: string | null
          total_comentarios: number | null
          total_interacoes: number | null
          ultima_interacao: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_user_id: string
          is_following?: boolean | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_user_id?: string
          is_following?: boolean | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      instapaulinhoforca_web_search_cache: {
        Row: {
          annotations: Json | null
          created_at: string
          expires_at: string
          id: string
          model: string | null
          query: string
          query_hash: string
          summary: string | null
        }
        Insert: {
          annotations?: Json | null
          created_at?: string
          expires_at?: string
          id?: string
          model?: string | null
          query: string
          query_hash: string
          summary?: string | null
        }
        Update: {
          annotations?: Json | null
          created_at?: string
          expires_at?: string
          id?: string
          model?: string | null
          query?: string
          query_hash?: string
          summary?: string | null
        }
        Relationships: []
      }
      instarenatasene_chat_memory: {
        Row: {
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          metadata: Json | null
          role: string
          tipo_interacao: string
          usuario_id: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          metadata?: Json | null
          role: string
          tipo_interacao?: string
          usuario_id?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          metadata?: Json | null
          role?: string
          tipo_interacao?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instarenatasene_chat_memory_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instarenatasene_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instarenatasene_dm_enviadas: {
        Row: {
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          id: string
          mensagem: string
          numero_tentativa: number | null
          tipo: string
          usuario_id: string | null
          usuario_respondeu: boolean | null
          usuario_seguia: boolean | null
        }
        Insert: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem: string
          numero_tentativa?: number | null
          tipo?: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
          usuario_seguia?: boolean | null
        }
        Update: {
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string
          numero_tentativa?: number | null
          tipo?: string
          usuario_id?: string | null
          usuario_respondeu?: boolean | null
          usuario_seguia?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "instarenatasene_dm_enviadas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "instarenatasene_usuarios_instagram"
            referencedColumns: ["id"]
          },
        ]
      }
      instarenatasene_leads_coletados: {
        Row: {
          aceita_avisos: boolean | null
          aceita_avisos_em: string | null
          bairro: string | null
          bloqueado: boolean | null
          cep: string | null
          cidade: string | null
          coletado_em: string | null
          conta_id: string | null
          created_at: string | null
          crm_contact_id: string | null
          crm_synced_at: string | null
          crm_synced_fields: Json | null
          dados_completos: boolean | null
          data_nascimento: string | null
          desinteresse: boolean | null
          desinteresse_em: string | null
          email: string | null
          estado: string | null
          followup_enviado: boolean | null
          id: string
          ig_user_id: string
          interesse: string | null
          is_following: boolean | null
          latitude: number | null
          lgpd_aceito: boolean | null
          lgpd_aceito_em: string | null
          lgpd_recusas: number | null
          longitude: number | null
          motivo_recusa: string | null
          nome_completo: string | null
          nome_confirmado: boolean | null
          primeira_dm_incompleta: boolean | null
          profissao: string | null
          recusas_seguidas: number | null
          recusou_conversa: boolean | null
          resumo: Json | null
          rua: string | null
          sentimento: string | null
          solicitacao: Json | null
          solucao: string | null
          sugestao_perguntada: boolean | null
          telefone: string | null
          token: string | null
          ultima_acao: string | null
          updated_at: string | null
          username: string | null
          usuario_id: string | null
        }
        Insert: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          crm_contact_id?: string | null
          crm_synced_at?: string | null
          crm_synced_fields?: Json | null
          dados_completos?: boolean | null
          data_nascimento?: string | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          followup_enviado?: boolean | null
          id?: string
          ig_user_id: string
          interesse?: string | null
          is_following?: boolean | null
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          primeira_dm_incompleta?: boolean | null
          profissao?: string | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Update: {
          aceita_avisos?: boolean | null
          aceita_avisos_em?: string | null
          bairro?: string | null
          bloqueado?: boolean | null
          cep?: string | null
          cidade?: string | null
          coletado_em?: string | null
          conta_id?: string | null
          created_at?: string | null
          crm_contact_id?: string | null
          crm_synced_at?: string | null
          crm_synced_fields?: Json | null
          dados_completos?: boolean | null
          data_nascimento?: string | null
          desinteresse?: boolean | null
          desinteresse_em?: string | null
          email?: string | null
          estado?: string | null
          followup_enviado?: boolean | null
          id?: string
          ig_user_id?: string
          interesse?: string | null
          is_following?: boolean | null
          latitude?: number | null
          lgpd_aceito?: boolean | null
          lgpd_aceito_em?: string | null
          lgpd_recusas?: number | null
          longitude?: number | null
          motivo_recusa?: string | null
          nome_completo?: string | null
          nome_confirmado?: boolean | null
          primeira_dm_incompleta?: boolean | null
          profissao?: string | null
          recusas_seguidas?: number | null
          recusou_conversa?: boolean | null
          resumo?: Json | null
          rua?: string | null
          sentimento?: string | null
          solicitacao?: Json | null
          solucao?: string | null
          sugestao_perguntada?: boolean | null
          telefone?: string | null
          token?: string | null
          ultima_acao?: string | null
          updated_at?: string | null
          username?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      instarenatasene_logs_agente: {
        Row: {
          acao: string
          comentario_id: string | null
          conta_id: string | null
          created_at: string | null
          erro: string | null
          id: string
          input_data: Json | null
          latencia_ms: number | null
          modelo_usado: string | null
          output_data: Json | null
          tokens_usados: number | null
        }
        Insert: {
          acao: string
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          erro?: string | null
          id?: string
          input_data?: Json | null
          latencia_ms?: number | null
          modelo_usado?: string | null
          output_data?: Json | null
          tokens_usados?: number | null
        }
        Update: {
          acao?: string
          comentario_id?: string | null
          conta_id?: string | null
          created_at?: string | null
          erro?: string | null
          id?: string
          input_data?: Json | null
          latencia_ms?: number | null
          modelo_usado?: string | null
          output_data?: Json | null
          tokens_usados?: number | null
        }
        Relationships: []
      }
      instarenatasene_usuarios_instagram: {
        Row: {
          bio: string | null
          categoria: string | null
          created_at: string | null
          dm_bloqueado: boolean | null
          dm_tentativas: number | null
          dm_ultima_data: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          ig_user_id: string
          is_following: boolean | null
          is_premium: boolean | null
          is_verified: boolean | null
          motivo_nao_seguir: string | null
          nome: string | null
          primeira_interacao: string | null
          profile_pic_storage_url: string | null
          profile_pic_synced_at: string | null
          profile_pic_url: string | null
          sentimento_predominante: string | null
          total_comentarios: number | null
          total_interacoes: number | null
          ultima_interacao: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_user_id: string
          is_following?: boolean | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          dm_bloqueado?: boolean | null
          dm_tentativas?: number | null
          dm_ultima_data?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          ig_user_id?: string
          is_following?: boolean | null
          is_premium?: boolean | null
          is_verified?: boolean | null
          motivo_nao_seguir?: string | null
          nome?: string | null
          primeira_interacao?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_synced_at?: string | null
          profile_pic_url?: string | null
          sentimento_predominante?: string | null
          total_comentarios?: number | null
          total_interacoes?: number | null
          ultima_interacao?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      linktv_paginaproposta: {
        Row: {
          config: Json
          id: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          id?: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lsmoto_analisesatendimento: {
        Row: {
          analise_completa: Json | null
          assunto: string
          atendente_id: string
          atendente_nome: string
          categoria: string
          cliente_nome: string
          cliente_telefone: string
          cordialidade: string | null
          created_at: string | null
          csat: number | null
          data_atendimento: string
          duracao_minutos: number | null
          fcr: boolean | null
          id: string
          info_nao_coletadas: Json | null
          nota_geral: number | null
          nps: number | null
          observacoes_atendimento: string | null
          orcamento_houve_proposta: boolean | null
          orcamento_observacoes: string | null
          orcamento_status: string | null
          orcamento_valor_desconto: number | null
          orcamento_valor_frete: number | null
          orcamento_valor_itens: Json | null
          orcamento_valor_total: number | null
          pecas_pedido: Json | null
          pecas_sem_estoque: Json | null
          pontos_atencao: Json | null
          pontos_positivos: Json | null
          problema_resolvido: string | null
          proximo_passo: string | null
          requer_seguimento: boolean | null
          satisfacao_nivel: string | null
          status_final: string
          tags: Json | null
          tempo_resposta_adequado: boolean | null
          tipo_cliente: string | null
          vendas_perdidas: Json | null
        }
        Insert: {
          analise_completa?: Json | null
          assunto: string
          atendente_id: string
          atendente_nome: string
          categoria: string
          cliente_nome: string
          cliente_telefone: string
          cordialidade?: string | null
          created_at?: string | null
          csat?: number | null
          data_atendimento: string
          duracao_minutos?: number | null
          fcr?: boolean | null
          id?: string
          info_nao_coletadas?: Json | null
          nota_geral?: number | null
          nps?: number | null
          observacoes_atendimento?: string | null
          orcamento_houve_proposta?: boolean | null
          orcamento_observacoes?: string | null
          orcamento_status?: string | null
          orcamento_valor_desconto?: number | null
          orcamento_valor_frete?: number | null
          orcamento_valor_itens?: Json | null
          orcamento_valor_total?: number | null
          pecas_pedido?: Json | null
          pecas_sem_estoque?: Json | null
          pontos_atencao?: Json | null
          pontos_positivos?: Json | null
          problema_resolvido?: string | null
          proximo_passo?: string | null
          requer_seguimento?: boolean | null
          satisfacao_nivel?: string | null
          status_final: string
          tags?: Json | null
          tempo_resposta_adequado?: boolean | null
          tipo_cliente?: string | null
          vendas_perdidas?: Json | null
        }
        Update: {
          analise_completa?: Json | null
          assunto?: string
          atendente_id?: string
          atendente_nome?: string
          categoria?: string
          cliente_nome?: string
          cliente_telefone?: string
          cordialidade?: string | null
          created_at?: string | null
          csat?: number | null
          data_atendimento?: string
          duracao_minutos?: number | null
          fcr?: boolean | null
          id?: string
          info_nao_coletadas?: Json | null
          nota_geral?: number | null
          nps?: number | null
          observacoes_atendimento?: string | null
          orcamento_houve_proposta?: boolean | null
          orcamento_observacoes?: string | null
          orcamento_status?: string | null
          orcamento_valor_desconto?: number | null
          orcamento_valor_frete?: number | null
          orcamento_valor_itens?: Json | null
          orcamento_valor_total?: number | null
          pecas_pedido?: Json | null
          pecas_sem_estoque?: Json | null
          pontos_atencao?: Json | null
          pontos_positivos?: Json | null
          problema_resolvido?: string | null
          proximo_passo?: string | null
          requer_seguimento?: boolean | null
          satisfacao_nivel?: string | null
          status_final?: string
          tags?: Json | null
          tempo_resposta_adequado?: boolean | null
          tipo_cliente?: string | null
          vendas_perdidas?: Json | null
        }
        Relationships: []
      }
      lsmoto_clientes: {
        Row: {
          ativo: string | null
          bairro: string | null
          cep: string | null
          cgf: string | null
          cidade: string | null
          cnpj: string | null
          codigo: string
          complemento: string | null
          created_at: string | null
          credito: number | null
          data_cad: string | null
          dt_alterado: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          fax: string | null
          latitude: number | null
          limite: number | null
          longitude: number | null
          nome: string
          num_end: string | null
          rota_cod: string | null
          soma_saldo_credito: number | null
          soma_saldo_devedor: number | null
          soma_saldo_devedor_atraso: number | null
          telefone: string | null
          updated_at: string | null
          vendedor: string | null
        }
        Insert: {
          ativo?: string | null
          bairro?: string | null
          cep?: string | null
          cgf?: string | null
          cidade?: string | null
          cnpj?: string | null
          codigo: string
          complemento?: string | null
          created_at?: string | null
          credito?: number | null
          data_cad?: string | null
          dt_alterado?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          fax?: string | null
          latitude?: number | null
          limite?: number | null
          longitude?: number | null
          nome: string
          num_end?: string | null
          rota_cod?: string | null
          soma_saldo_credito?: number | null
          soma_saldo_devedor?: number | null
          soma_saldo_devedor_atraso?: number | null
          telefone?: string | null
          updated_at?: string | null
          vendedor?: string | null
        }
        Update: {
          ativo?: string | null
          bairro?: string | null
          cep?: string | null
          cgf?: string | null
          cidade?: string | null
          cnpj?: string | null
          codigo?: string
          complemento?: string | null
          created_at?: string | null
          credito?: number | null
          data_cad?: string | null
          dt_alterado?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          fax?: string | null
          latitude?: number | null
          limite?: number | null
          longitude?: number | null
          nome?: string
          num_end?: string | null
          rota_cod?: string | null
          soma_saldo_credito?: number | null
          soma_saldo_devedor?: number | null
          soma_saldo_devedor_atraso?: number | null
          telefone?: string | null
          updated_at?: string | null
          vendedor?: string | null
        }
        Relationships: []
      }
      lsmoto_metavendedor: {
        Row: {
          avatar_url: string | null
          cod_vendedor: string | null
          created_at: string | null
          id: number
          meta_mensal: number | null
          nome_vendedor: string | null
        }
        Insert: {
          avatar_url?: string | null
          cod_vendedor?: string | null
          created_at?: string | null
          id?: number
          meta_mensal?: number | null
          nome_vendedor?: string | null
        }
        Update: {
          avatar_url?: string | null
          cod_vendedor?: string | null
          created_at?: string | null
          id?: number
          meta_mensal?: number | null
          nome_vendedor?: string | null
        }
        Relationships: []
      }
      lsmoto_notifications: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_completed: boolean
          scheduled_at: string
          seller_name: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          scheduled_at: string
          seller_name?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          scheduled_at?: string
          seller_name?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lsmoto_painelmeta: {
        Row: {
          cliente_cidade: string | null
          cliente_estado: string | null
          cliente_nome: string | null
          cod_produto: string | null
          created_at: string | null
          data_hora: string | null
          desconto_item: number | null
          forma_pagamento: string | null
          id: string
          id_pedido: number | null
          marca: string | null
          preco_unitario: number | null
          produto_descricao: string | null
          quantidade: number | null
          valor_total_item: number | null
          vendedor_nome: string | null
        }
        Insert: {
          cliente_cidade?: string | null
          cliente_estado?: string | null
          cliente_nome?: string | null
          cod_produto?: string | null
          created_at?: string | null
          data_hora?: string | null
          desconto_item?: number | null
          forma_pagamento?: string | null
          id: string
          id_pedido?: number | null
          marca?: string | null
          preco_unitario?: number | null
          produto_descricao?: string | null
          quantidade?: number | null
          valor_total_item?: number | null
          vendedor_nome?: string | null
        }
        Update: {
          cliente_cidade?: string | null
          cliente_estado?: string | null
          cliente_nome?: string | null
          cod_produto?: string | null
          created_at?: string | null
          data_hora?: string | null
          desconto_item?: number | null
          forma_pagamento?: string | null
          id?: string
          id_pedido?: number | null
          marca?: string | null
          preco_unitario?: number | null
          produto_descricao?: string | null
          quantidade?: number | null
          valor_total_item?: number | null
          vendedor_nome?: string | null
        }
        Relationships: []
      }
      managed_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          metadata: Json | null
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "managed_profiles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_bms: {
        Row: {
          created_at: string
          data_criacao: string
          id: string
          nome_da_bm: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_criacao?: string
          id?: string
          nome_da_bm: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_criacao?: string
          id?: string
          nome_da_bm?: string
          updated_at?: string
        }
        Relationships: []
      }
      meta_numeros: {
        Row: {
          bm_id: string
          created_at: string
          id: string
          last_updated: string
          nome_empresa: string | null
          nome_usuario: string | null
          numero_telefone: string
          status_qualidade: string
        }
        Insert: {
          bm_id: string
          created_at?: string
          id?: string
          last_updated?: string
          nome_empresa?: string | null
          nome_usuario?: string | null
          numero_telefone: string
          status_qualidade?: string
        }
        Update: {
          bm_id?: string
          created_at?: string
          id?: string
          last_updated?: string
          nome_empresa?: string | null
          nome_usuario?: string | null
          numero_telefone?: string
          status_qualidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "meta_numeros_bm_id_fkey"
            columns: ["bm_id"]
            isOneToOne: false
            referencedRelation: "meta_bms"
            referencedColumns: ["id"]
          },
        ]
      }
      note_groups: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          color: string | null
          content: string | null
          created_at: string | null
          id: string
          note_group_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          color?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          note_group_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          color?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          note_group_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_note_group_id_fkey"
            columns: ["note_group_id"]
            isOneToOne: false
            referencedRelation: "note_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_metrics: {
        Row: {
          collected_at: string | null
          comments_count: number | null
          engagement: number | null
          hashtags: string[] | null
          id: string
          likes_count: number | null
          platform: string
          posts_count: number | null
          shares_count: number | null
          top_posts: Json | null
          trend_id: string | null
        }
        Insert: {
          collected_at?: string | null
          comments_count?: number | null
          engagement?: number | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          platform: string
          posts_count?: number | null
          shares_count?: number | null
          top_posts?: Json | null
          trend_id?: string | null
        }
        Update: {
          collected_at?: string | null
          comments_count?: number | null
          engagement?: number | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          platform?: string
          posts_count?: number | null
          shares_count?: number | null
          top_posts?: Json | null
          trend_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_metrics_trend_id_fkey"
            columns: ["trend_id"]
            isOneToOne: false
            referencedRelation: "trends"
            referencedColumns: ["id"]
          },
        ]
      }
      politicians: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          flags: string[] | null
          history: string | null
          id: string
          name: string
          party: string | null
          position: string | null
          social_media: Json | null
          state: string | null
          target_position: string | null
          tone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          flags?: string[] | null
          history?: string | null
          id?: string
          name: string
          party?: string | null
          position?: string | null
          social_media?: Json | null
          state?: string | null
          target_position?: string | null
          tone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          flags?: string[] | null
          history?: string | null
          id?: string
          name?: string
          party?: string | null
          position?: string | null
          social_media?: Json | null
          state?: string | null
          target_position?: string | null
          tone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      postproject_activity_log: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json | null
          platform: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          platform?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          platform?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_broadcast_deliveries: {
        Row: {
          created_at: string
          error_message: string | null
          group_jid: string
          group_name: string
          id: string
          sent_at: string | null
          session_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          group_jid: string
          group_name: string
          id?: string
          sent_at?: string | null
          session_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          group_jid?: string
          group_name?: string
          id?: string
          sent_at?: string | null
          session_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_broadcast_deliveries_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "postproject_broadcast_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_broadcast_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_broadcast_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_broadcast_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          delivered: number
          failed: number
          id: string
          media_filename: string | null
          media_type: string | null
          media_url: string | null
          message_text: string | null
          started_at: string | null
          status: string
          target_groups: Json
          total_groups: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          delivered?: number
          failed?: number
          id?: string
          media_filename?: string | null
          media_type?: string | null
          media_url?: string | null
          message_text?: string | null
          started_at?: string | null
          status?: string
          target_groups?: Json
          total_groups?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          delivered?: number
          failed?: number
          id?: string
          media_filename?: string | null
          media_type?: string | null
          media_url?: string | null
          message_text?: string | null
          started_at?: string | null
          status?: string
          target_groups?: Json
          total_groups?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_broadcast_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_broadcast_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_connected_accounts: {
        Row: {
          connected_at: string
          created_at: string
          display_name: string | null
          follower_count: number | null
          health_status: Database["public"]["Enums"]["postproject_account_health_status"]
          id: string
          is_active: boolean
          last_synced_at: string | null
          late_account_id: string
          late_profile_id: string | null
          platform: Database["public"]["Enums"]["postproject_social_platform"]
          profile_pic_url: string | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          connected_at?: string
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          health_status?: Database["public"]["Enums"]["postproject_account_health_status"]
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          late_account_id: string
          late_profile_id?: string | null
          platform: Database["public"]["Enums"]["postproject_social_platform"]
          profile_pic_url?: string | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          connected_at?: string
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          health_status?: Database["public"]["Enums"]["postproject_account_health_status"]
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          late_account_id?: string
          late_profile_id?: string | null
          platform?: Database["public"]["Enums"]["postproject_social_platform"]
          profile_pic_url?: string | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_connected_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_connected_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_hashtag_checks: {
        Row: {
          banned_count: number
          created_at: string
          hashtags: string[]
          id: string
          restricted_count: number
          results: Json
          safe_count: number
          user_id: string
        }
        Insert: {
          banned_count?: number
          created_at?: string
          hashtags: string[]
          id?: string
          restricted_count?: number
          results: Json
          safe_count?: number
          user_id: string
        }
        Update: {
          banned_count?: number
          created_at?: string
          hashtags?: string[]
          id?: string
          restricted_count?: number
          results?: Json
          safe_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_hashtag_checks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_hashtag_checks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_late_posts: {
        Row: {
          analytics: Json | null
          connected_account_id: string
          content: string | null
          created_at: string
          id: string
          last_analytics_sync: string | null
          late_post_id: string
          late_profile_id: string
          media_items: Json | null
          metadata: Json | null
          platform: string
          platform_post_id: string | null
          platform_post_url: string | null
          published_at: string | null
          scheduled_for: string | null
          status: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analytics?: Json | null
          connected_account_id: string
          content?: string | null
          created_at?: string
          id?: string
          last_analytics_sync?: string | null
          late_post_id: string
          late_profile_id: string
          media_items?: Json | null
          metadata?: Json | null
          platform: string
          platform_post_id?: string | null
          platform_post_url?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analytics?: Json | null
          connected_account_id?: string
          content?: string | null
          created_at?: string
          id?: string
          last_analytics_sync?: string | null
          late_post_id?: string
          late_profile_id?: string
          media_items?: Json | null
          metadata?: Json | null
          platform?: string
          platform_post_id?: string | null
          platform_post_url?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_late_posts_connected_account_id_fkey"
            columns: ["connected_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_connected_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_late_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_late_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_media_library: {
        Row: {
          cleanup_after: string | null
          created_at: string
          duration_seconds: number | null
          file_size: number
          file_type: string
          filename: string
          height: number | null
          id: string
          metadata: Json | null
          original_filename: string
          public_url: string | null
          source: Database["public"]["Enums"]["postproject_media_source"]
          storage_path: string
          thumbnail_url: string | null
          updated_at: string
          usage_count: number
          user_id: string
          width: number | null
        }
        Insert: {
          cleanup_after?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size: number
          file_type: string
          filename: string
          height?: number | null
          id?: string
          metadata?: Json | null
          original_filename: string
          public_url?: string | null
          source?: Database["public"]["Enums"]["postproject_media_source"]
          storage_path: string
          thumbnail_url?: string | null
          updated_at?: string
          usage_count?: number
          user_id: string
          width?: number | null
        }
        Update: {
          cleanup_after?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_size?: number
          file_type?: string
          filename?: string
          height?: number | null
          id?: string
          metadata?: Json | null
          original_filename?: string
          public_url?: string | null
          source?: Database["public"]["Enums"]["postproject_media_source"]
          storage_path?: string
          thumbnail_url?: string | null
          updated_at?: string
          usage_count?: number
          user_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "postproject_media_library_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_media_library_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_monitored_accounts: {
        Row: {
          caption_mode: Database["public"]["Enums"]["postproject_caption_mode"]
          created_at: string
          custom_caption_template: string | null
          id: string
          is_active: boolean
          last_polled_at: string | null
          media_filter: Json
          polling_interval_minutes: number | null
          polling_schedule_type: string
          polling_times: Json | null
          target_follower_count: number | null
          target_full_name: string | null
          target_is_verified: boolean | null
          target_platform: string
          target_profile_pic_url: string | null
          target_user_id: string | null
          target_username: string
          updated_at: string
          user_id: string
        }
        Insert: {
          caption_mode?: Database["public"]["Enums"]["postproject_caption_mode"]
          created_at?: string
          custom_caption_template?: string | null
          id?: string
          is_active?: boolean
          last_polled_at?: string | null
          media_filter?: Json
          polling_interval_minutes?: number | null
          polling_schedule_type?: string
          polling_times?: Json | null
          target_follower_count?: number | null
          target_full_name?: string | null
          target_is_verified?: boolean | null
          target_platform?: string
          target_profile_pic_url?: string | null
          target_user_id?: string | null
          target_username: string
          updated_at?: string
          user_id: string
        }
        Update: {
          caption_mode?: Database["public"]["Enums"]["postproject_caption_mode"]
          created_at?: string
          custom_caption_template?: string | null
          id?: string
          is_active?: boolean
          last_polled_at?: string | null
          media_filter?: Json
          polling_interval_minutes?: number | null
          polling_schedule_type?: string
          polling_times?: Json | null
          target_follower_count?: number | null
          target_full_name?: string | null
          target_is_verified?: boolean | null
          target_platform?: string
          target_profile_pic_url?: string | null
          target_user_id?: string | null
          target_username?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_news_articles: {
        Row: {
          article_url: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          published_at: string | null
          sent_at: string | null
          source_name: string | null
          status: string | null
          summary: string | null
          title: string
          topic_id: string
          user_id: string
        }
        Insert: {
          article_url: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          sent_at?: string | null
          source_name?: string | null
          status?: string | null
          summary?: string | null
          title: string
          topic_id: string
          user_id: string
        }
        Update: {
          article_url?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          sent_at?: string | null
          source_name?: string | null
          status?: string | null
          summary?: string | null
          title?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_news_articles_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "postproject_news_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_news_send_log: {
        Row: {
          article_id: string
          created_at: string | null
          error_message: string | null
          group_jid: string
          group_name: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          error_message?: string | null
          group_jid: string
          group_name: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string | null
          error_message?: string | null
          group_jid?: string
          group_name?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_news_send_log_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "postproject_news_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_send_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_send_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_news_settings: {
        Row: {
          ai_prompt: string | null
          created_at: string | null
          id: string
          max_articles_per_fetch: number | null
          quiet_end_hour: number | null
          quiet_start_hour: number | null
          send_image: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_prompt?: string | null
          created_at?: string | null
          id?: string
          max_articles_per_fetch?: number | null
          quiet_end_hour?: number | null
          quiet_start_hour?: number | null
          send_image?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_prompt?: string | null
          created_at?: string | null
          id?: string
          max_articles_per_fetch?: number | null
          quiet_end_hour?: number | null
          quiet_start_hour?: number | null
          send_image?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_news_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_news_topics: {
        Row: {
          created_at: string | null
          cron_interval: number | null
          daily_send_count: number | null
          daily_send_date: string | null
          date_from: string | null
          date_range: string | null
          date_to: string | null
          domain_filter: string | null
          id: string
          is_active: boolean | null
          keywords: string
          last_fetched_at: string | null
          name: string
          target_groups: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          cron_interval?: number | null
          daily_send_count?: number | null
          daily_send_date?: string | null
          date_from?: string | null
          date_range?: string | null
          date_to?: string | null
          domain_filter?: string | null
          id?: string
          is_active?: boolean | null
          keywords: string
          last_fetched_at?: string | null
          name: string
          target_groups?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          cron_interval?: number | null
          daily_send_count?: number | null
          daily_send_date?: string | null
          date_from?: string | null
          date_range?: string | null
          date_to?: string | null
          domain_filter?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string
          last_fetched_at?: string | null
          name?: string
          target_groups?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_news_topics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_news_topics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_polling_log: {
        Row: {
          api_provider: string
          created_at: string
          error_message: string | null
          id: string
          monitored_account_id: string
          new_posts_count: number
          posts_found: number
          response_time_ms: number | null
          status: Database["public"]["Enums"]["postproject_polling_status"]
        }
        Insert: {
          api_provider?: string
          created_at?: string
          error_message?: string | null
          id?: string
          monitored_account_id: string
          new_posts_count?: number
          posts_found?: number
          response_time_ms?: number | null
          status: Database["public"]["Enums"]["postproject_polling_status"]
        }
        Update: {
          api_provider?: string
          created_at?: string
          error_message?: string | null
          id?: string
          monitored_account_id?: string
          new_posts_count?: number
          posts_found?: number
          response_time_ms?: number | null
          status?: Database["public"]["Enums"]["postproject_polling_status"]
        }
        Relationships: [
          {
            foreignKeyName: "postproject_polling_log_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_monitored_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_polling_log_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_accounts_due_for_polling"
            referencedColumns: ["monitored_account_id"]
          },
        ]
      }
      postproject_processed_posts: {
        Row: {
          caption: string | null
          created_at: string
          detected_at: string
          id: string
          media_type: number
          media_urls: Json | null
          monitored_account_id: string
          platform_post_id: string
          shortcode: string | null
          status: Database["public"]["Enums"]["postproject_processed_post_status"]
          taken_at: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          detected_at?: string
          id?: string
          media_type: number
          media_urls?: Json | null
          monitored_account_id: string
          platform_post_id: string
          shortcode?: string | null
          status?: Database["public"]["Enums"]["postproject_processed_post_status"]
          taken_at?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          detected_at?: string
          id?: string
          media_type?: number
          media_urls?: Json | null
          monitored_account_id?: string
          platform_post_id?: string
          shortcode?: string | null
          status?: Database["public"]["Enums"]["postproject_processed_post_status"]
          taken_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_processed_posts_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_monitored_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_processed_posts_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_accounts_due_for_polling"
            referencedColumns: ["monitored_account_id"]
          },
        ]
      }
      postproject_repost_history: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          late_post_id: string | null
          monitored_account_id: string | null
          platform_post_url: string | null
          post_as_story: boolean
          processed_post_id: string
          source_username: string | null
          status: Database["public"]["Enums"]["postproject_repost_status"]
          target_account_id: string | null
          target_platform: Database["public"]["Enums"]["postproject_social_platform"]
          target_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          late_post_id?: string | null
          monitored_account_id?: string | null
          platform_post_url?: string | null
          post_as_story?: boolean
          processed_post_id: string
          source_username?: string | null
          status?: Database["public"]["Enums"]["postproject_repost_status"]
          target_account_id?: string | null
          target_platform: Database["public"]["Enums"]["postproject_social_platform"]
          target_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          late_post_id?: string | null
          monitored_account_id?: string | null
          platform_post_url?: string | null
          post_as_story?: boolean
          processed_post_id?: string
          source_username?: string | null
          status?: Database["public"]["Enums"]["postproject_repost_status"]
          target_account_id?: string | null
          target_platform?: Database["public"]["Enums"]["postproject_social_platform"]
          target_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_repost_history_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_monitored_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_history_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_accounts_due_for_polling"
            referencedColumns: ["monitored_account_id"]
          },
          {
            foreignKeyName: "postproject_repost_history_processed_post_id_fkey"
            columns: ["processed_post_id"]
            isOneToOne: false
            referencedRelation: "postproject_processed_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_history_target_account_id_fkey"
            columns: ["target_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_connected_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_repost_targets: {
        Row: {
          connected_account_id: string
          created_at: string
          id: string
          is_active: boolean
          monitored_account_id: string
          post_as_story: boolean
        }
        Insert: {
          connected_account_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          monitored_account_id: string
          post_as_story?: boolean
        }
        Update: {
          connected_account_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          monitored_account_id?: string
          post_as_story?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "postproject_repost_targets_connected_account_id_fkey"
            columns: ["connected_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_connected_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_targets_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_monitored_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_targets_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_accounts_due_for_polling"
            referencedColumns: ["monitored_account_id"]
          },
        ]
      }
      postproject_system_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      postproject_users: {
        Row: {
          allowed_panels: Json | null
          avatar_url: string | null
          created_at: string
          email: string
          grok_api_key: string | null
          id: string
          is_active: boolean
          late_api_key: string | null
          late_extra_profile_ids: Json
          late_profile_id: string | null
          max_instagram_accounts: number
          max_tiktok_accounts: number
          max_whatsapp_instances: number | null
          name: string
          openai_api_key: string | null
          password_hash: string
          rapidapi_key: string | null
          role: Database["public"]["Enums"]["postproject_user_role"]
          serper_api_key: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          allowed_panels?: Json | null
          avatar_url?: string | null
          created_at?: string
          email: string
          grok_api_key?: string | null
          id?: string
          is_active?: boolean
          late_api_key?: string | null
          late_extra_profile_ids?: Json
          late_profile_id?: string | null
          max_instagram_accounts?: number
          max_tiktok_accounts?: number
          max_whatsapp_instances?: number | null
          name: string
          openai_api_key?: string | null
          password_hash: string
          rapidapi_key?: string | null
          role?: Database["public"]["Enums"]["postproject_user_role"]
          serper_api_key?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          allowed_panels?: Json | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          grok_api_key?: string | null
          id?: string
          is_active?: boolean
          late_api_key?: string | null
          late_extra_profile_ids?: Json
          late_profile_id?: string | null
          max_instagram_accounts?: number
          max_tiktok_accounts?: number
          max_whatsapp_instances?: number | null
          name?: string
          openai_api_key?: string | null
          password_hash?: string
          rapidapi_key?: string | null
          role?: Database["public"]["Enums"]["postproject_user_role"]
          serper_api_key?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      postproject_wa_group_autopost: {
        Row: {
          connected_account_id: string | null
          created_at: string
          group_config_id: string | null
          group_jid: string
          group_name: string
          id: string
          interval_minutes: number
          is_active: boolean
          last_error: string | null
          last_posted_at: string | null
          last_posted_post_id: string | null
          message_template: string
          quiet_end: string | null
          quiet_start: string | null
          randomize_order: boolean | null
          target_groups: Json | null
          target_username: string
          updated_at: string
          user_id: string
        }
        Insert: {
          connected_account_id?: string | null
          created_at?: string
          group_config_id?: string | null
          group_jid: string
          group_name: string
          id?: string
          interval_minutes?: number
          is_active?: boolean
          last_error?: string | null
          last_posted_at?: string | null
          last_posted_post_id?: string | null
          message_template?: string
          quiet_end?: string | null
          quiet_start?: string | null
          randomize_order?: boolean | null
          target_groups?: Json | null
          target_username: string
          updated_at?: string
          user_id: string
        }
        Update: {
          connected_account_id?: string | null
          created_at?: string
          group_config_id?: string | null
          group_jid?: string
          group_name?: string
          id?: string
          interval_minutes?: number
          is_active?: boolean
          last_error?: string | null
          last_posted_at?: string | null
          last_posted_post_id?: string | null
          message_template?: string
          quiet_end?: string | null
          quiet_start?: string | null
          randomize_order?: boolean | null
          target_groups?: Json | null
          target_username?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_wa_group_autopost_connected_account_id_fkey"
            columns: ["connected_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_connected_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_wa_group_autopost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_wa_group_autopost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_wa_group_autopost_log: {
        Row: {
          autopost_config_id: string
          created_at: string
          error_message: string | null
          group_jid: string
          group_name: string | null
          id: string
          message_sent: string
          platform: string
          post_url: string
          status: string
          user_id: string
        }
        Insert: {
          autopost_config_id: string
          created_at?: string
          error_message?: string | null
          group_jid: string
          group_name?: string | null
          id?: string
          message_sent: string
          platform: string
          post_url: string
          status?: string
          user_id: string
        }
        Update: {
          autopost_config_id?: string
          created_at?: string
          error_message?: string | null
          group_jid?: string
          group_name?: string | null
          id?: string
          message_sent?: string
          platform?: string
          post_url?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_wa_group_autopost_log_autopost_config_id_fkey"
            columns: ["autopost_config_id"]
            isOneToOne: false
            referencedRelation: "postproject_wa_group_autopost"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_wa_group_autopost_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_wa_group_autopost_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_whatsapp_instances: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string | null
          instance_name: string
          instance_token: string | null
          phone_number: string | null
          profile_name: string | null
          profile_pic_url: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          instance_name: string
          instance_token?: string | null
          phone_number?: string | null
          profile_name?: string | null
          profile_pic_url?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          instance_name?: string
          instance_token?: string | null
          phone_number?: string | null
          profile_name?: string | null
          profile_pic_url?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "postproject_whatsapp_instances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_whatsapp_instances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean
          must_change_password: boolean
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean
          must_change_password?: boolean
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          must_change_password?: boolean
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profit_distribution: {
        Row: {
          created_at: string
          douglas_percentage: number
          id: string
          month_year: string
          notes: string | null
          renan_percentage: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          douglas_percentage?: number
          id?: string
          month_year: string
          notes?: string | null
          renan_percentage?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          douglas_percentage?: number
          id?: string
          month_year?: string
          notes?: string | null
          renan_percentage?: number
          updated_at?: string
        }
        Relationships: []
      }
      quadribahia_dashboardleads: {
        Row: {
          card_id: string | null
          contexto: string | null
          data_contato: string
          follow_up_stage: number | null
          id: number
          nome: string | null
          primeiro_contato: string | null
          session_id: string | null
          step_name: string | null
          telefone: string
          ultimo_contato: string | null
          ultimo_msg_cliente: string | null
        }
        Insert: {
          card_id?: string | null
          contexto?: string | null
          data_contato?: string
          follow_up_stage?: number | null
          id?: number
          nome?: string | null
          primeiro_contato?: string | null
          session_id?: string | null
          step_name?: string | null
          telefone: string
          ultimo_contato?: string | null
          ultimo_msg_cliente?: string | null
        }
        Update: {
          card_id?: string | null
          contexto?: string | null
          data_contato?: string
          follow_up_stage?: number | null
          id?: number
          nome?: string | null
          primeiro_contato?: string | null
          session_id?: string | null
          step_name?: string | null
          telefone?: string
          ultimo_contato?: string | null
          ultimo_msg_cliente?: string | null
        }
        Relationships: []
      }
      quadribahia_motos: {
        Row: {
          created_at: string
          id: string
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          ordem: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: []
      }
      quadribahia_pagamentos: {
        Row: {
          created_at: string
          data_pagamento: string
          id: string
          reserva_id: string
          valor_pago: number
        }
        Insert: {
          created_at?: string
          data_pagamento: string
          id?: string
          reserva_id: string
          valor_pago: number
        }
        Update: {
          created_at?: string
          data_pagamento?: string
          id?: string
          reserva_id?: string
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "quadribahia_pagamentos_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "quadribahia_reservas"
            referencedColumns: ["id"]
          },
        ]
      }
      quadribahia_passeios: {
        Row: {
          ativo: boolean
          created_at: string | null
          descricao: string | null
          horarios_disponiveis: string[] | null
          id: number
          nome: string
          tem_horario: boolean
        }
        Insert: {
          ativo?: boolean
          created_at?: string | null
          descricao?: string | null
          horarios_disponiveis?: string[] | null
          id?: number
          nome: string
          tem_horario?: boolean
        }
        Update: {
          ativo?: boolean
          created_at?: string | null
          descricao?: string | null
          horarios_disponiveis?: string[] | null
          id?: number
          nome?: string
          tem_horario?: boolean
        }
        Relationships: []
      }
      quadribahia_passeios_precos: {
        Row: {
          ativo: boolean
          created_at: string
          data_fim: string | null
          data_inicio: string
          id: string
          passeio_id: number
          updated_at: string
          valor: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          data_fim?: string | null
          data_inicio: string
          id?: string
          passeio_id: number
          updated_at?: string
          valor: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          passeio_id?: number
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "quadribahia_passeios_precos_passeio_id_fkey"
            columns: ["passeio_id"]
            isOneToOne: false
            referencedRelation: "quadribahia_passeios"
            referencedColumns: ["id"]
          },
        ]
      }
      quadribahia_reservas: {
        Row: {
          apartamento: string | null
          codigo_moto: string | null
          compareceu: boolean
          confirmado: boolean
          created_at: string | null
          data: string
          data_pagamento: string | null
          horario: string | null
          hotel: string | null
          id: string
          participantes: string | null
          passeio_id: number
          periodo: string | null
          responsavel: string
          status_pagamento: string
          telefone: string | null
          updated_at: string | null
          valor: number
          valor_pago: number | null
        }
        Insert: {
          apartamento?: string | null
          codigo_moto?: string | null
          compareceu?: boolean
          confirmado?: boolean
          created_at?: string | null
          data: string
          data_pagamento?: string | null
          horario?: string | null
          hotel?: string | null
          id?: string
          participantes?: string | null
          passeio_id: number
          periodo?: string | null
          responsavel: string
          status_pagamento?: string
          telefone?: string | null
          updated_at?: string | null
          valor: number
          valor_pago?: number | null
        }
        Update: {
          apartamento?: string | null
          codigo_moto?: string | null
          compareceu?: boolean
          confirmado?: boolean
          created_at?: string | null
          data?: string
          data_pagamento?: string | null
          horario?: string | null
          hotel?: string | null
          id?: string
          participantes?: string | null
          passeio_id?: number
          periodo?: string | null
          responsavel?: string
          status_pagamento?: string
          telefone?: string | null
          updated_at?: string | null
          valor?: number
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_passeio_id_fkey"
            columns: ["passeio_id"]
            isOneToOne: false
            referencedRelation: "quadribahia_passeios"
            referencedColumns: ["id"]
          },
        ]
      }
      renatasene_aniversariantes: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          dados_helena: Json | null
          data_nascimento: string | null
          email: string | null
          genero: string | null
          helena_id: string | null
          id: string
          nome: string
          notificado_ano: number | null
          notificado_em: string | null
          sincronizado_em: string | null
          tags: string[] | null
          telefone: string | null
          ultima_mensagem_enviada_em: string | null
          ultima_mensagem_whatsapp: string | null
          ultimo_pdf_gerado_em: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          dados_helena?: Json | null
          data_nascimento?: string | null
          email?: string | null
          genero?: string | null
          helena_id?: string | null
          id?: string
          nome: string
          notificado_ano?: number | null
          notificado_em?: string | null
          sincronizado_em?: string | null
          tags?: string[] | null
          telefone?: string | null
          ultima_mensagem_enviada_em?: string | null
          ultima_mensagem_whatsapp?: string | null
          ultimo_pdf_gerado_em?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          dados_helena?: Json | null
          data_nascimento?: string | null
          email?: string | null
          genero?: string | null
          helena_id?: string | null
          id?: string
          nome?: string
          notificado_ano?: number | null
          notificado_em?: string | null
          sincronizado_em?: string | null
          tags?: string[] | null
          telefone?: string | null
          ultima_mensagem_enviada_em?: string | null
          ultima_mensagem_whatsapp?: string | null
          ultimo_pdf_gerado_em?: string | null
        }
        Relationships: []
      }
      renatasene_comentarios: {
        Row: {
          comentario: string | null
          created_at: string
          data: string | null
          esta_seguindo: string | null
          horario: string | null
          id: number
          id_user: string | null
          imagem: string | null
          imagem_post: string | null
          name: string | null
          perfil: string | null
          post_comentou: string | null
          resposta_ia: string | null
          seguidores: string | null
          seguindo: string | null
          status: string | null
          user_name: string | null
          verificado: string | null
        }
        Insert: {
          comentario?: string | null
          created_at?: string
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Update: {
          comentario?: string | null
          created_at?: string
          data?: string | null
          esta_seguindo?: string | null
          horario?: string | null
          id?: number
          id_user?: string | null
          imagem?: string | null
          imagem_post?: string | null
          name?: string | null
          perfil?: string | null
          post_comentou?: string | null
          resposta_ia?: string | null
          seguidores?: string | null
          seguindo?: string | null
          status?: string | null
          user_name?: string | null
          verificado?: string | null
        }
        Relationships: []
      }
      renatasene_dash: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          consentimento_lgpd: string | null
          criado_em: string
          email: string | null
          endereco_completo: string | null
          helena_card_id: string | null
          helena_contact_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          nome: string | null
          origem: string | null
          resumo_conversa: string | null
          rua: string | null
          sobrenome: string | null
          telefone: string
          uf: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          consentimento_lgpd?: string | null
          criado_em?: string
          email?: string | null
          endereco_completo?: string | null
          helena_card_id?: string | null
          helena_contact_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          origem?: string | null
          resumo_conversa?: string | null
          rua?: string | null
          sobrenome?: string | null
          telefone: string
          uf?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          consentimento_lgpd?: string | null
          criado_em?: string
          email?: string | null
          endereco_completo?: string | null
          helena_card_id?: string | null
          helena_contact_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          origem?: string | null
          resumo_conversa?: string | null
          rua?: string | null
          sobrenome?: string | null
          telefone?: string
          uf?: string | null
        }
        Relationships: []
      }
      renatasene_lpeventos_participants: {
        Row: {
          birth_date: string | null
          cargo: string | null
          cep: string | null
          city: string | null
          complemento: string | null
          confirmed_at: string | null
          created_at: string | null
          email: string | null
          event_id: string | null
          event_name: string | null
          full_name: string
          id: string
          instagram: string | null
          latitude: number | null
          lgpd_consent: boolean
          lgpd_consent_date: string | null
          lgpd_consent_ip: string | null
          longitude: number | null
          neighborhood: string | null
          numero: string | null
          phone: string
          state: string | null
          street: string | null
        }
        Insert: {
          birth_date?: string | null
          cargo?: string | null
          cep?: string | null
          city?: string | null
          complemento?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string | null
          event_id?: string | null
          event_name?: string | null
          full_name: string
          id?: string
          instagram?: string | null
          latitude?: number | null
          lgpd_consent?: boolean
          lgpd_consent_date?: string | null
          lgpd_consent_ip?: string | null
          longitude?: number | null
          neighborhood?: string | null
          numero?: string | null
          phone: string
          state?: string | null
          street?: string | null
        }
        Update: {
          birth_date?: string | null
          cargo?: string | null
          cep?: string | null
          city?: string | null
          complemento?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string | null
          event_id?: string | null
          event_name?: string | null
          full_name?: string
          id?: string
          instagram?: string | null
          latitude?: number | null
          lgpd_consent?: boolean
          lgpd_consent_date?: string | null
          lgpd_consent_ip?: string | null
          longitude?: number | null
          neighborhood?: string | null
          numero?: string | null
          phone?: string
          state?: string | null
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renatasene_lpeventos_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "renatasene_lpeventos_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      renatasene_lpeventos_settings: {
        Row: {
          accent_color: string
          active: boolean
          cover_image_url: string | null
          created_at: string | null
          event_address: string | null
          event_date: string
          event_description: string | null
          event_location: string
          event_name: string
          event_time: string | null
          footer_text: string | null
          gradient_end: string
          gradient_start: string
          hero_decoration: string | null
          hero_subtitle: string | null
          hero_subtitle_position: string | null
          hero_title: string | null
          id: string
          logo_url: string | null
          primary_color: string
          secondary_color: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          accent_color?: string
          active?: boolean
          cover_image_url?: string | null
          created_at?: string | null
          event_address?: string | null
          event_date?: string
          event_description?: string | null
          event_location?: string
          event_name?: string
          event_time?: string | null
          footer_text?: string | null
          gradient_end?: string
          gradient_start?: string
          hero_decoration?: string | null
          hero_subtitle?: string | null
          hero_subtitle_position?: string | null
          hero_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          accent_color?: string
          active?: boolean
          cover_image_url?: string | null
          created_at?: string | null
          event_address?: string | null
          event_date?: string
          event_description?: string | null
          event_location?: string
          event_name?: string
          event_time?: string | null
          footer_text?: string | null
          gradient_end?: string
          gradient_start?: string
          hero_decoration?: string | null
          hero_subtitle?: string | null
          hero_subtitle_position?: string | null
          hero_title?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      renatasene_maps: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          id: number
          latitude: string | null
          logradouro: string | null
          longitude: string | null
          nome: string | null
          numero: string | null
          recebido_por: string | null
          responsavel_indicacao: string | null
          whatsapp: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          id?: number
          latitude?: string | null
          logradouro?: string | null
          longitude?: string | null
          nome?: string | null
          numero?: string | null
          recebido_por?: string | null
          responsavel_indicacao?: string | null
          whatsapp?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          id?: number
          latitude?: string | null
          logradouro?: string | null
          longitude?: string | null
          nome?: string | null
          numero?: string | null
          recebido_por?: string | null
          responsavel_indicacao?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      renatasene_pesquisainteresse: {
        Row: {
          area_atuacao: string[] | null
          area_atuacao_outro: string | null
          area_interesse_outro: string | null
          areas_interesse: string[] | null
          bairro: string | null
          cep: string | null
          cidade: string
          como_conheceu: string | null
          como_conheceu_outro: string | null
          created_at: string | null
          email: string | null
          escolaridade: string | null
          faixa_etaria: string | null
          id: number
          logradouro: string | null
          nome: string
          prefere_ser_chamado: string | null
          situacao_profissional: string | null
          sugestao_livre: string | null
          telefone: string | null
          topicos_selecionados: Json | null
          uf: string | null
          user_agent: string | null
        }
        Insert: {
          area_atuacao?: string[] | null
          area_atuacao_outro?: string | null
          area_interesse_outro?: string | null
          areas_interesse?: string[] | null
          bairro?: string | null
          cep?: string | null
          cidade: string
          como_conheceu?: string | null
          como_conheceu_outro?: string | null
          created_at?: string | null
          email?: string | null
          escolaridade?: string | null
          faixa_etaria?: string | null
          id?: number
          logradouro?: string | null
          nome: string
          prefere_ser_chamado?: string | null
          situacao_profissional?: string | null
          sugestao_livre?: string | null
          telefone?: string | null
          topicos_selecionados?: Json | null
          uf?: string | null
          user_agent?: string | null
        }
        Update: {
          area_atuacao?: string[] | null
          area_atuacao_outro?: string | null
          area_interesse_outro?: string | null
          areas_interesse?: string[] | null
          bairro?: string | null
          cep?: string | null
          cidade?: string
          como_conheceu?: string | null
          como_conheceu_outro?: string | null
          created_at?: string | null
          email?: string | null
          escolaridade?: string | null
          faixa_etaria?: string | null
          id?: number
          logradouro?: string | null
          nome?: string
          prefere_ser_chamado?: string | null
          situacao_profissional?: string | null
          sugestao_livre?: string | null
          telefone?: string | null
          topicos_selecionados?: Json | null
          uf?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      renatasene_site: {
        Row: {
          bairro: string
          cidade: string
          created_at: string | null
          data_nascimento: string
          email: string
          id: number
          indicado_por: string | null
          mensagem: string
          nome: string
          outra_cidade: string | null
          privacidade_aceita: boolean
          whatsapp: string
        }
        Insert: {
          bairro: string
          cidade: string
          created_at?: string | null
          data_nascimento: string
          email: string
          id?: number
          indicado_por?: string | null
          mensagem: string
          nome: string
          outra_cidade?: string | null
          privacidade_aceita?: boolean
          whatsapp: string
        }
        Update: {
          bairro?: string
          cidade?: string
          created_at?: string | null
          data_nascimento?: string
          email?: string
          id?: number
          indicado_por?: string | null
          mensagem?: string
          nome?: string
          outra_cidade?: string | null
          privacidade_aceita?: boolean
          whatsapp?: string
        }
        Relationships: []
      }
      routines: {
        Row: {
          created_at: string | null
          descricao: string | null
          domain: string
          horario: string | null
          id: string
          is_active: boolean | null
          nome: string
          priority_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          domain: string
          horario?: string | null
          id?: string
          is_active?: boolean | null
          nome: string
          priority_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          domain?: string
          horario?: string | null
          id?: string
          is_active?: boolean | null
          nome?: string
          priority_level?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sadu_cupido_conselhos: {
        Row: {
          created_at: string | null
          id: number
          idade: number
          nome: string
          relato: string
          whatsapp_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          idade: number
          nome: string
          relato: string
          whatsapp_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          idade?: number
          nome?: string
          relato?: string
          whatsapp_id?: string
        }
        Relationships: []
      }
      sadu_cupido_inscricoes_dia_fa: {
        Row: {
          cep: string | null
          created_at: string
          id: number
          idade: number
          motivo: string | null
          nome_completo: string
          sorteado: boolean | null
          telefone: string
          whatsapp_id: string
        }
        Insert: {
          cep?: string | null
          created_at?: string
          id?: number
          idade: number
          motivo?: string | null
          nome_completo: string
          sorteado?: boolean | null
          telefone: string
          whatsapp_id: string
        }
        Update: {
          cep?: string | null
          created_at?: string
          id?: number
          idade?: number
          motivo?: string | null
          nome_completo?: string
          sorteado?: boolean | null
          telefone?: string
          whatsapp_id?: string
        }
        Relationships: []
      }
      sadu_cupido_lgpd: {
        Row: {
          aceite: boolean
          created_at: string | null
          id: number
          whatsapp_id: string
        }
        Insert: {
          aceite?: boolean
          created_at?: string | null
          id?: never
          whatsapp_id: string
        }
        Update: {
          aceite?: boolean
          created_at?: string | null
          id?: never
          whatsapp_id?: string
        }
        Relationships: []
      }
      sadu_cupido_perfis: {
        Row: {
          bio: string
          created_at: string
          foto_url: string | null
          id: number
          idade: number
          instagram: string
          nome: string
          procura: string | null
          whatsapp_id: string
        }
        Insert: {
          bio: string
          created_at?: string
          foto_url?: string | null
          id?: number
          idade: number
          instagram: string
          nome: string
          procura?: string | null
          whatsapp_id: string
        }
        Update: {
          bio?: string
          created_at?: string
          foto_url?: string | null
          id?: number
          idade?: number
          instagram?: string
          nome?: string
          procura?: string | null
          whatsapp_id?: string
        }
        Relationships: []
      }
      scripts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          compliance_checklist: Json | null
          compliance_notes: string | null
          compliance_status: string | null
          content: string
          created_at: string | null
          id: string
          image_prompt: string | null
          image_url: string | null
          platform: string
          politician_id: string | null
          title: string | null
          trend_id: string | null
          type: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          compliance_checklist?: Json | null
          compliance_notes?: string | null
          compliance_status?: string | null
          content: string
          created_at?: string | null
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          platform: string
          politician_id?: string | null
          title?: string | null
          trend_id?: string | null
          type: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          compliance_checklist?: Json | null
          compliance_notes?: string | null
          compliance_status?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image_prompt?: string | null
          image_url?: string | null
          platform?: string
          politician_id?: string | null
          title?: string | null
          trend_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "scripts_politician_id_fkey"
            columns: ["politician_id"]
            isOneToOne: false
            referencedRelation: "politicians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripts_trend_id_fkey"
            columns: ["trend_id"]
            isOneToOne: false
            referencedRelation: "trends"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      shopping_items: {
        Row: {
          created_at: string | null
          id: string
          name: string
          notes: string | null
          quantity: number | null
          status: string | null
          tag_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          quantity?: number | null
          status?: string | null
          tag_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          quantity?: number | null
          status?: string | null
          tag_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_items_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "shopping_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_tags: {
        Row: {
          color: string
          created_at: string | null
          id: string
          is_default: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sistemaaniversario_aniversariantes: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          dados_helena: Json | null
          data_nascimento: string | null
          dia_nascimento: number | null
          email: string | null
          genero: string | null
          helena_id: string | null
          id: string
          mes_nascimento: number | null
          nome: string
          notificado_ano: number | null
          notificado_em: string | null
          sincronizado_em: string | null
          tags: string[] | null
          telefone: string | null
          tenant_id: string
          ultima_mensagem_enviada_em: string | null
          ultima_mensagem_whatsapp: string | null
          ultimo_pdf_gerado_em: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          dados_helena?: Json | null
          data_nascimento?: string | null
          dia_nascimento?: number | null
          email?: string | null
          genero?: string | null
          helena_id?: string | null
          id?: string
          mes_nascimento?: number | null
          nome: string
          notificado_ano?: number | null
          notificado_em?: string | null
          sincronizado_em?: string | null
          tags?: string[] | null
          telefone?: string | null
          tenant_id: string
          ultima_mensagem_enviada_em?: string | null
          ultima_mensagem_whatsapp?: string | null
          ultimo_pdf_gerado_em?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          dados_helena?: Json | null
          data_nascimento?: string | null
          dia_nascimento?: number | null
          email?: string | null
          genero?: string | null
          helena_id?: string | null
          id?: string
          mes_nascimento?: number | null
          nome?: string
          notificado_ano?: number | null
          notificado_em?: string | null
          sincronizado_em?: string | null
          tags?: string[] | null
          telefone?: string | null
          tenant_id?: string
          ultima_mensagem_enviada_em?: string | null
          ultima_mensagem_whatsapp?: string | null
          ultimo_pdf_gerado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sistemaaniversario_aniversariantes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_aniversariantes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sistemaaniversario_config_log: {
        Row: {
          campo: string
          criado_em: string | null
          id: string
          tenant_id: string
          user_id: string
          valor_anterior: string | null
          valor_novo: string | null
        }
        Insert: {
          campo: string
          criado_em?: string | null
          id?: string
          tenant_id: string
          user_id: string
          valor_anterior?: string | null
          valor_novo?: string | null
        }
        Update: {
          campo?: string
          criado_em?: string | null
          id?: string
          tenant_id?: string
          user_id?: string
          valor_anterior?: string | null
          valor_novo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sistemaaniversario_config_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_config_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sistemaaniversario_envios: {
        Row: {
          aniversariante_id: string
          criado_em: string
          enviado_em: string | null
          erro: string | null
          helena_message_id: string | null
          id: string
          mensagem: string | null
          status: string
          template_id: string | null
          tenant_id: string
          tipo: string
        }
        Insert: {
          aniversariante_id: string
          criado_em?: string
          enviado_em?: string | null
          erro?: string | null
          helena_message_id?: string | null
          id?: string
          mensagem?: string | null
          status?: string
          template_id?: string | null
          tenant_id: string
          tipo: string
        }
        Update: {
          aniversariante_id?: string
          criado_em?: string
          enviado_em?: string | null
          erro?: string | null
          helena_message_id?: string | null
          id?: string
          mensagem?: string | null
          status?: string
          template_id?: string | null
          tenant_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "sistemaaniversario_envios_aniversariante_id_fkey"
            columns: ["aniversariante_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_aniversariantes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_envios_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_envios_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sistemaaniversario_templates_mensagem: {
        Row: {
          ativo: boolean
          atualizado_em: string | null
          codigo: string
          corpo: string
          criado_em: string | null
          faixa_etaria: string
          genero: string
          id: string
          ordem: number | null
          peso: number | null
          tenant_id: string
          tom: string
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string | null
          codigo: string
          corpo: string
          criado_em?: string | null
          faixa_etaria: string
          genero?: string
          id?: string
          ordem?: number | null
          peso?: number | null
          tenant_id: string
          tom?: string
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string | null
          codigo?: string
          corpo?: string
          criado_em?: string | null
          faixa_etaria?: string
          genero?: string
          id?: string
          ordem?: number | null
          peso?: number | null
          tenant_id?: string
          tom?: string
        }
        Relationships: [
          {
            foreignKeyName: "sistemaaniversario_templates_mensagem_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_templates_mensagem_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sistemaaniversario_tenant_users: {
        Row: {
          ativo: boolean
          convidado_em: string | null
          criado_em: string | null
          id: string
          role: string
          tenant_id: string | null
          ultimo_acesso_em: string | null
          user_id: string
        }
        Insert: {
          ativo?: boolean
          convidado_em?: string | null
          criado_em?: string | null
          id?: string
          role?: string
          tenant_id?: string | null
          ultimo_acesso_em?: string | null
          user_id: string
        }
        Update: {
          ativo?: boolean
          convidado_em?: string | null
          criado_em?: string | null
          id?: string
          role?: string
          tenant_id?: string | null
          ultimo_acesso_em?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sistemaaniversario_tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sistemaaniversario_tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "sistemaaniversario_tenants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sistemaaniversario_tenants: {
        Row: {
          ativo: boolean
          atualizado_em: string | null
          cargo: string
          cidade: string | null
          cor_accent: string | null
          cor_primaria: string | null
          cor_primaria_hover: string | null
          cor_sidebar: string | null
          criado_em: string | null
          cron_secret: string | null
          envio_automatico: boolean
          helena_api_base_url: string | null
          helena_api_token: string | null
          helena_channel_id: string | null
          helena_custom_field_nascimento: string[] | null
          helena_template_id: string | null
          helena_template_nome: string | null
          horario_envio: string | null
          id: string
          intervalo_envio_max: number | null
          intervalo_envio_min: number | null
          logo_url: string | null
          mensagem_aniversario: string | null
          nome: string
          pdf_assinatura_cargo: string | null
          pdf_assinatura_nome: string | null
          pdf_corpo_template: string | null
          pdf_saudacao: string | null
          pdf_titulo: string | null
          slug: string
          subtitulo: string | null
          titulo_sidebar: string | null
          ultima_sync_em: string | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string | null
          cargo: string
          cidade?: string | null
          cor_accent?: string | null
          cor_primaria?: string | null
          cor_primaria_hover?: string | null
          cor_sidebar?: string | null
          criado_em?: string | null
          cron_secret?: string | null
          envio_automatico?: boolean
          helena_api_base_url?: string | null
          helena_api_token?: string | null
          helena_channel_id?: string | null
          helena_custom_field_nascimento?: string[] | null
          helena_template_id?: string | null
          helena_template_nome?: string | null
          horario_envio?: string | null
          id?: string
          intervalo_envio_max?: number | null
          intervalo_envio_min?: number | null
          logo_url?: string | null
          mensagem_aniversario?: string | null
          nome: string
          pdf_assinatura_cargo?: string | null
          pdf_assinatura_nome?: string | null
          pdf_corpo_template?: string | null
          pdf_saudacao?: string | null
          pdf_titulo?: string | null
          slug: string
          subtitulo?: string | null
          titulo_sidebar?: string | null
          ultima_sync_em?: string | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string | null
          cargo?: string
          cidade?: string | null
          cor_accent?: string | null
          cor_primaria?: string | null
          cor_primaria_hover?: string | null
          cor_sidebar?: string | null
          criado_em?: string | null
          cron_secret?: string | null
          envio_automatico?: boolean
          helena_api_base_url?: string | null
          helena_api_token?: string | null
          helena_channel_id?: string | null
          helena_custom_field_nascimento?: string[] | null
          helena_template_id?: string | null
          helena_template_nome?: string | null
          horario_envio?: string | null
          id?: string
          intervalo_envio_max?: number | null
          intervalo_envio_min?: number | null
          logo_url?: string | null
          mensagem_aniversario?: string | null
          nome?: string
          pdf_assinatura_cargo?: string | null
          pdf_assinatura_nome?: string | null
          pdf_corpo_template?: string | null
          pdf_saudacao?: string | null
          pdf_titulo?: string | null
          slug?: string
          subtitulo?: string | null
          titulo_sidebar?: string | null
          ultima_sync_em?: string | null
        }
        Relationships: []
      }
      smarfit_planos: {
        Row: {
          created_at: string
          id: number
          informacoes_planos: Json | null
          nome_unidade: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          informacoes_planos?: Json | null
          nome_unidade?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          informacoes_planos?: Json | null
          nome_unidade?: string | null
        }
        Relationships: []
      }
      smartday_realtime_config: {
        Row: {
          enabled: boolean
          function_url: string
          id: number
          trigger_secret: string
        }
        Insert: {
          enabled?: boolean
          function_url: string
          id?: number
          trigger_secret: string
        }
        Update: {
          enabled?: boolean
          function_url?: string
          id?: number
          trigger_secret?: string
        }
        Relationships: []
      }
      smartfit_analise_ia: {
        Row: {
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          descricao_solicitacao: string | null
          follow: string | null
          horario_comercial: string | null
          id: string
          nome_cliente: string | null
          plano_solicitado: string | null
          sentimento: string | null
          solicitacao_cliente: string | null
          telefone_cliente: string | null
          transferiu_para_humano: string | null
          unidades_solicitadas: string | null
        }
        Insert: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          descricao_solicitacao?: string | null
          follow?: string | null
          horario_comercial?: string | null
          id?: string
          nome_cliente?: string | null
          plano_solicitado?: string | null
          sentimento?: string | null
          solicitacao_cliente?: string | null
          telefone_cliente?: string | null
          transferiu_para_humano?: string | null
          unidades_solicitadas?: string | null
        }
        Update: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          descricao_solicitacao?: string | null
          follow?: string | null
          horario_comercial?: string | null
          id?: string
          nome_cliente?: string | null
          plano_solicitado?: string | null
          sentimento?: string | null
          solicitacao_cliente?: string | null
          telefone_cliente?: string | null
          transferiu_para_humano?: string | null
          unidades_solicitadas?: string | null
        }
        Relationships: []
      }
      smartfit_analisesatendente: {
        Row: {
          agendou_visita_tecnica: boolean | null
          analisado_em: string | null
          analise_completa: Json | null
          atendente_id: string | null
          atendente_nome: string | null
          clareza_comunicacao: number | null
          classificacao_geral: string | null
          cliente_nome: string | null
          cliente_telefone: string | null
          conseguiu_reter: boolean | null
          created_at: string | null
          data_hora_atendimento: string | null
          dentro_horario_comercial: boolean | null
          duracao_total: string | null
          feedback_explicito: string | null
          horario_fim: string | null
          horario_inicio: string | null
          id: number
          linguagem_profissional: boolean | null
          mensagem_erro: string | null
          nivel_satisfacao: string | null
          nota_final: number | null
          nps_estimado: number | null
          observacao_periodo: string | null
          ofereceu_upgrade: boolean | null
          oportunidades_comerciais: Json | null
          paciencia: number | null
          personalizacao: number | null
          pontos_atencao: Json | null
          pontos_fortes_atendente: Json | null
          proatividade: boolean | null
          problema_resolvido: string | null
          proxima_acao: string | null
          requer_acao: boolean | null
          resumo_atendimento: string | null
          session_id: string
          tags: Json | null
          tem_erro: boolean | null
          tempo_resposta_classificacao: string | null
          tempo_resposta_media: string | null
          tom_cordialidade: number | null
          total_mensagens: number | null
          updated_at: string | null
        }
        Insert: {
          agendou_visita_tecnica?: boolean | null
          analisado_em?: string | null
          analise_completa?: Json | null
          atendente_id?: string | null
          atendente_nome?: string | null
          clareza_comunicacao?: number | null
          classificacao_geral?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          conseguiu_reter?: boolean | null
          created_at?: string | null
          data_hora_atendimento?: string | null
          dentro_horario_comercial?: boolean | null
          duracao_total?: string | null
          feedback_explicito?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: number
          linguagem_profissional?: boolean | null
          mensagem_erro?: string | null
          nivel_satisfacao?: string | null
          nota_final?: number | null
          nps_estimado?: number | null
          observacao_periodo?: string | null
          ofereceu_upgrade?: boolean | null
          oportunidades_comerciais?: Json | null
          paciencia?: number | null
          personalizacao?: number | null
          pontos_atencao?: Json | null
          pontos_fortes_atendente?: Json | null
          proatividade?: boolean | null
          problema_resolvido?: string | null
          proxima_acao?: string | null
          requer_acao?: boolean | null
          resumo_atendimento?: string | null
          session_id: string
          tags?: Json | null
          tem_erro?: boolean | null
          tempo_resposta_classificacao?: string | null
          tempo_resposta_media?: string | null
          tom_cordialidade?: number | null
          total_mensagens?: number | null
          updated_at?: string | null
        }
        Update: {
          agendou_visita_tecnica?: boolean | null
          analisado_em?: string | null
          analise_completa?: Json | null
          atendente_id?: string | null
          atendente_nome?: string | null
          clareza_comunicacao?: number | null
          classificacao_geral?: string | null
          cliente_nome?: string | null
          cliente_telefone?: string | null
          conseguiu_reter?: boolean | null
          created_at?: string | null
          data_hora_atendimento?: string | null
          dentro_horario_comercial?: boolean | null
          duracao_total?: string | null
          feedback_explicito?: string | null
          horario_fim?: string | null
          horario_inicio?: string | null
          id?: number
          linguagem_profissional?: boolean | null
          mensagem_erro?: string | null
          nivel_satisfacao?: string | null
          nota_final?: number | null
          nps_estimado?: number | null
          observacao_periodo?: string | null
          ofereceu_upgrade?: boolean | null
          oportunidades_comerciais?: Json | null
          paciencia?: number | null
          personalizacao?: number | null
          pontos_atencao?: Json | null
          pontos_fortes_atendente?: Json | null
          proatividade?: boolean | null
          problema_resolvido?: string | null
          proxima_acao?: string | null
          requer_acao?: boolean | null
          resumo_atendimento?: string | null
          session_id?: string
          tags?: Json | null
          tem_erro?: boolean | null
          tempo_resposta_classificacao?: string | null
          tempo_resposta_media?: string | null
          tom_cordialidade?: number | null
          total_mensagens?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      smartfit_blocklist: {
        Row: {
          bloqueado_em: string | null
          bloqueado_por: string | null
          cpf: string
          id: number
          motivo: string | null
        }
        Insert: {
          bloqueado_em?: string | null
          bloqueado_por?: string | null
          cpf: string
          id?: number
          motivo?: string | null
        }
        Update: {
          bloqueado_em?: string | null
          bloqueado_por?: string | null
          cpf?: string
          id?: number
          motivo?: string | null
        }
        Relationships: []
      }
      smartfit_cadastros: {
        Row: {
          aderiu_plano: boolean | null
          bairro: string
          cep: string
          cidade: string
          confirmou_presenca: boolean | null
          cpf: string
          created_at: string | null
          data_adesao_plano: string | null
          data_confirmacao_presenca: string | null
          data_nascimento: string | null
          email: string
          endereco: string
          estado: string
          evento: string | null
          id: number
          latitude: string | null
          longitude: string | null
          nome: string
          unidade: string
          whatsapp: string
        }
        Insert: {
          aderiu_plano?: boolean | null
          bairro?: string
          cep?: string
          cidade?: string
          confirmou_presenca?: boolean | null
          cpf: string
          created_at?: string | null
          data_adesao_plano?: string | null
          data_confirmacao_presenca?: string | null
          data_nascimento?: string | null
          email: string
          endereco?: string
          estado?: string
          evento?: string | null
          id?: number
          latitude?: string | null
          longitude?: string | null
          nome: string
          unidade: string
          whatsapp: string
        }
        Update: {
          aderiu_plano?: boolean | null
          bairro?: string
          cep?: string
          cidade?: string
          confirmou_presenca?: boolean | null
          cpf?: string
          created_at?: string | null
          data_adesao_plano?: string | null
          data_confirmacao_presenca?: string | null
          data_nascimento?: string | null
          email?: string
          endereco?: string
          estado?: string
          evento?: string | null
          id?: number
          latitude?: string | null
          longitude?: string | null
          nome?: string
          unidade?: string
          whatsapp?: string
        }
        Relationships: []
      }
      smartfit_conversoes: {
        Row: {
          convertido: boolean | null
          created_at: string | null
          data_conversao: string | null
          data_transferencia: string | null
          email: string | null
          id: number
          nome: string | null
          observacao: string | null
          plano_fechamento: string | null
          plano_origem: string | null
          telefone: string
          unidade_fechamento: string | null
          unidade_origem: string | null
          updated_at: string | null
          valor_mensal: number | null
        }
        Insert: {
          convertido?: boolean | null
          created_at?: string | null
          data_conversao?: string | null
          data_transferencia?: string | null
          email?: string | null
          id?: number
          nome?: string | null
          observacao?: string | null
          plano_fechamento?: string | null
          plano_origem?: string | null
          telefone: string
          unidade_fechamento?: string | null
          unidade_origem?: string | null
          updated_at?: string | null
          valor_mensal?: number | null
        }
        Update: {
          convertido?: boolean | null
          created_at?: string | null
          data_conversao?: string | null
          data_transferencia?: string | null
          email?: string | null
          id?: number
          nome?: string | null
          observacao?: string | null
          plano_fechamento?: string | null
          plano_origem?: string | null
          telefone?: string
          unidade_fechamento?: string | null
          unidade_origem?: string | null
          updated_at?: string | null
          valor_mensal?: number | null
        }
        Relationships: []
      }
      smartfit_convidados: {
        Row: {
          created_at: string | null
          id: string
          nome: string
          ultima_visita: string | null
          unidade: string
          visitas: number | null
          whatsapp: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
          ultima_visita?: string | null
          unidade: string
          visitas?: number | null
          whatsapp: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
          ultima_visita?: string | null
          unidade?: string
          visitas?: number | null
          whatsapp?: string
        }
        Relationships: []
      }
      smartfit_convidados_campanha: {
        Row: {
          ativa: boolean
          channel_from: string | null
          delay_minutos: number
          id: number
          template_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          ativa?: boolean
          channel_from?: string | null
          delay_minutos?: number
          id?: number
          template_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          ativa?: boolean
          channel_from?: string | null
          delay_minutos?: number
          id?: number
          template_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      smartfit_convidados_envios: {
        Row: {
          convidado_id: string
          created_at: string | null
          enviado_em: string | null
          enviar_em: string
          helena_error: string | null
          helena_message_id: string | null
          helena_status: string | null
          id: number
          payload_request: Json | null
          payload_response: Json | null
          status: string
          template_id_usado: string | null
          tentativas: number
          to_telefone: string | null
        }
        Insert: {
          convidado_id: string
          created_at?: string | null
          enviado_em?: string | null
          enviar_em: string
          helena_error?: string | null
          helena_message_id?: string | null
          helena_status?: string | null
          id?: number
          payload_request?: Json | null
          payload_response?: Json | null
          status?: string
          template_id_usado?: string | null
          tentativas?: number
          to_telefone?: string | null
        }
        Update: {
          convidado_id?: string
          created_at?: string | null
          enviado_em?: string | null
          enviar_em?: string
          helena_error?: string | null
          helena_message_id?: string | null
          helena_status?: string | null
          id?: number
          payload_request?: Json | null
          payload_response?: Json | null
          status?: string
          template_id_usado?: string | null
          tentativas?: number
          to_telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smartfit_convidados_envios_convidado_id_fkey"
            columns: ["convidado_id"]
            isOneToOne: true
            referencedRelation: "smartfit_convidados"
            referencedColumns: ["id"]
          },
        ]
      }
      smartfit_dashboardleads: {
        Row: {
          bairro: string | null
          card_id: string | null
          cep: string | null
          cidade: string | null
          contexto: string | null
          cpf: string | null
          data_contato: string
          email: string | null
          estado: string | null
          follow_up_stage: number | null
          id: number
          latitude: number | null
          longitude: number | null
          nome: string | null
          plano_solicitado: string | null
          primeiro_contato: string | null
          solicitacao_cliente: string | null
          solicitou_valor: boolean | null
          step_name: string | null
          telefone: string
          transferido_para: string | null
          ultimo_contato: string | null
          ultimo_msg_cliente: string | null
          unidade_interesse: string | null
        }
        Insert: {
          bairro?: string | null
          card_id?: string | null
          cep?: string | null
          cidade?: string | null
          contexto?: string | null
          cpf?: string | null
          data_contato?: string
          email?: string | null
          estado?: string | null
          follow_up_stage?: number | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          plano_solicitado?: string | null
          primeiro_contato?: string | null
          solicitacao_cliente?: string | null
          solicitou_valor?: boolean | null
          step_name?: string | null
          telefone: string
          transferido_para?: string | null
          ultimo_contato?: string | null
          ultimo_msg_cliente?: string | null
          unidade_interesse?: string | null
        }
        Update: {
          bairro?: string | null
          card_id?: string | null
          cep?: string | null
          cidade?: string | null
          contexto?: string | null
          cpf?: string | null
          data_contato?: string
          email?: string | null
          estado?: string | null
          follow_up_stage?: number | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          plano_solicitado?: string | null
          primeiro_contato?: string | null
          solicitacao_cliente?: string | null
          solicitou_valor?: boolean | null
          step_name?: string | null
          telefone?: string
          transferido_para?: string | null
          ultimo_contato?: string | null
          ultimo_msg_cliente?: string | null
          unidade_interesse?: string | null
        }
        Relationships: []
      }
      smartfit_evento_config: {
        Row: {
          chave: string
          created_at: string | null
          descricao: string | null
          id: number
          tipo: string | null
          updated_at: string | null
          valor: string
        }
        Insert: {
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: number
          tipo?: string | null
          updated_at?: string | null
          valor: string
        }
        Update: {
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: number
          tipo?: string | null
          updated_at?: string | null
          valor?: string
        }
        Relationships: []
      }
      smartfit_eventoday: {
        Row: {
          aluno: boolean
          cpf: string
          created_at: string
          evento: string
          id: string
          nome: string
          telefone: string
          unidade: string | null
        }
        Insert: {
          aluno: boolean
          cpf: string
          created_at?: string
          evento?: string
          id?: string
          nome: string
          telefone: string
          unidade?: string | null
        }
        Update: {
          aluno?: boolean
          cpf?: string
          created_at?: string
          evento?: string
          id?: string
          nome?: string
          telefone?: string
          unidade?: string | null
        }
        Relationships: []
      }
      smartfit_eventos: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_evento_fim: string | null
          data_evento_inicio: string | null
          data_fim: string
          data_inicio: string
          desc_cta: string
          desc_cta_destaque: string
          desc_intro: string
          desc_intro_destaque: string
          desc_intro_fim: string
          descricao: string
          horario_fim: string
          horario_inicio: string
          id: number
          nome: string
          texto_p1: string | null
          texto_p3: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_evento_fim?: string | null
          data_evento_inicio?: string | null
          data_fim: string
          data_inicio: string
          desc_cta?: string
          desc_cta_destaque?: string
          desc_intro?: string
          desc_intro_destaque?: string
          desc_intro_fim?: string
          descricao?: string
          horario_fim: string
          horario_inicio: string
          id?: number
          nome: string
          texto_p1?: string | null
          texto_p3?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_evento_fim?: string | null
          data_evento_inicio?: string | null
          data_fim?: string
          data_inicio?: string
          desc_cta?: string
          desc_cta_destaque?: string
          desc_intro?: string
          desc_intro_destaque?: string
          desc_intro_fim?: string
          descricao?: string
          horario_fim?: string
          horario_inicio?: string
          id?: number
          nome?: string
          texto_p1?: string | null
          texto_p3?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      smartfit_login: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: number
          nome_completo: string | null
          password: string
          ultimo_acesso: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: number
          nome_completo?: string | null
          password: string
          ultimo_acesso?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: number
          nome_completo?: string | null
          password?: string
          ultimo_acesso?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      smartfit_recuperacao: {
        Row: {
          cpf: string
          created_at: string | null
          data_cancelamento_plano: string | null
          data_conversao: string | null
          data_reativacao: string | null
          data_resposta: string | null
          data_vencimento: string
          desconto_pct: number
          direcionado_comercial: boolean
          divida_total: number
          follow_up_stage: number | null
          id: number
          matricula: string
          nome: string
          nome_plano: string
          observacoes: string | null
          plano_cancelado: boolean
          quantidade_acesso: number
          reativado: boolean
          status: string
          unidade: string
          updated_at: string | null
          valor_desconto: number
          valor_negociado: number
          valor_pago: number | null
          whatsapp: string
        }
        Insert: {
          cpf: string
          created_at?: string | null
          data_cancelamento_plano?: string | null
          data_conversao?: string | null
          data_reativacao?: string | null
          data_resposta?: string | null
          data_vencimento: string
          desconto_pct?: number
          direcionado_comercial?: boolean
          divida_total: number
          follow_up_stage?: number | null
          id?: number
          matricula: string
          nome: string
          nome_plano: string
          observacoes?: string | null
          plano_cancelado?: boolean
          quantidade_acesso?: number
          reativado?: boolean
          status?: string
          unidade: string
          updated_at?: string | null
          valor_desconto?: number
          valor_negociado?: number
          valor_pago?: number | null
          whatsapp: string
        }
        Update: {
          cpf?: string
          created_at?: string | null
          data_cancelamento_plano?: string | null
          data_conversao?: string | null
          data_reativacao?: string | null
          data_resposta?: string | null
          data_vencimento?: string
          desconto_pct?: number
          direcionado_comercial?: boolean
          divida_total?: number
          follow_up_stage?: number | null
          id?: number
          matricula?: string
          nome?: string
          nome_plano?: string
          observacoes?: string | null
          plano_cancelado?: boolean
          quantidade_acesso?: number
          reativado?: boolean
          status?: string
          unidade?: string
          updated_at?: string | null
          valor_desconto?: number
          valor_negociado?: number
          valor_pago?: number | null
          whatsapp?: string
        }
        Relationships: []
      }
      smartfit_recuperacao_campanha: {
        Row: {
          ativa: boolean
          channel_from: string | null
          id: number
          janela_fim: string
          janela_inicio: string
          jitter_max_seg: number
          jitter_min_seg: number
          template_d10_id: string | null
          template_d15_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          ativa?: boolean
          channel_from?: string | null
          id?: number
          janela_fim?: string
          janela_inicio?: string
          jitter_max_seg?: number
          jitter_min_seg?: number
          template_d10_id?: string | null
          template_d15_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          ativa?: boolean
          channel_from?: string | null
          id?: number
          janela_fim?: string
          janela_inicio?: string
          jitter_max_seg?: number
          jitter_min_seg?: number
          template_d10_id?: string | null
          template_d15_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      smartfit_recuperacao_envios: {
        Row: {
          cliente_id: number | null
          created_at: string
          data_vencimento_ref: string | null
          enviado_em: string | null
          enviar_em: string
          helena_error: string | null
          helena_message_id: string | null
          helena_status: string | null
          id: number
          payload_request: Json | null
          payload_response: Json | null
          status: string
          template_id_usado: string | null
          tentativas: number
          texto_livre: string | null
          tipo: string
          to_telefone: string | null
        }
        Insert: {
          cliente_id?: number | null
          created_at?: string
          data_vencimento_ref?: string | null
          enviado_em?: string | null
          enviar_em: string
          helena_error?: string | null
          helena_message_id?: string | null
          helena_status?: string | null
          id?: number
          payload_request?: Json | null
          payload_response?: Json | null
          status?: string
          template_id_usado?: string | null
          tentativas?: number
          texto_livre?: string | null
          tipo: string
          to_telefone?: string | null
        }
        Update: {
          cliente_id?: number | null
          created_at?: string
          data_vencimento_ref?: string | null
          enviado_em?: string | null
          enviar_em?: string
          helena_error?: string | null
          helena_message_id?: string | null
          helena_status?: string | null
          id?: number
          payload_request?: Json | null
          payload_response?: Json | null
          status?: string
          template_id_usado?: string | null
          tentativas?: number
          texto_livre?: string | null
          tipo?: string
          to_telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smartfit_recuperacao_envios_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "smartfit_recuperacao"
            referencedColumns: ["id"]
          },
        ]
      }
      smartfit_recuperacao_faixas: {
        Row: {
          acesso_max: number | null
          acesso_min: number
          created_at: string | null
          desconto_pct: number
          id: number
        }
        Insert: {
          acesso_max?: number | null
          acesso_min: number
          created_at?: string | null
          desconto_pct: number
          id?: number
        }
        Update: {
          acesso_max?: number | null
          acesso_min?: number
          created_at?: string | null
          desconto_pct?: number
          id?: number
        }
        Relationships: []
      }
      smartfit_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      smartfit_smartday: {
        Row: {
          aderiu_plano: boolean
          aluno: boolean
          confirmou_presenca: boolean
          cpf: string
          created_at: string
          data_adesao_plano: string | null
          data_confirmacao_presenca: string | null
          evento: string
          id: string
          nome: string
          telefone: string
          unidade: string | null
        }
        Insert: {
          aderiu_plano?: boolean
          aluno: boolean
          confirmou_presenca?: boolean
          cpf: string
          created_at?: string
          data_adesao_plano?: string | null
          data_confirmacao_presenca?: string | null
          evento?: string
          id?: string
          nome: string
          telefone: string
          unidade?: string | null
        }
        Update: {
          aderiu_plano?: boolean
          aluno?: boolean
          confirmou_presenca?: boolean
          cpf?: string
          created_at?: string
          data_adesao_plano?: string | null
          data_confirmacao_presenca?: string | null
          evento?: string
          id?: string
          nome?: string
          telefone?: string
          unidade?: string | null
        }
        Relationships: []
      }
      smartfit_sorteios: {
        Row: {
          aluno: boolean
          cpf: string
          created_at: string | null
          evento: string
          filtro_usado: string
          id: string
          nome: string
          smartday_registration_id: string
          sorteado_por: string
          status: string
          telefone: string
          unidade: string | null
        }
        Insert: {
          aluno?: boolean
          cpf: string
          created_at?: string | null
          evento: string
          filtro_usado: string
          id?: string
          nome: string
          smartday_registration_id: string
          sorteado_por: string
          status: string
          telefone: string
          unidade?: string | null
        }
        Update: {
          aluno?: boolean
          cpf?: string
          created_at?: string | null
          evento?: string
          filtro_usado?: string
          id?: string
          nome?: string
          smartday_registration_id?: string
          sorteado_por?: string
          status?: string
          telefone?: string
          unidade?: string | null
        }
        Relationships: []
      }
      smartfit_usuarios: {
        Row: {
          ativo: boolean
          created_at: string | null
          id: number
          nome: string
          password: string
          role: string
          unidade: string | null
          username: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string | null
          id?: number
          nome: string
          password: string
          role?: string
          unidade?: string | null
          username: string
        }
        Update: {
          ativo?: boolean
          created_at?: string | null
          id?: number
          nome?: string
          password?: string
          role?: string
          unidade?: string | null
          username?: string
        }
        Relationships: []
      }
      smartfitmidia_unidades: {
        Row: {
          id: number
          legenda: string | null
          nome_unidade: string
          url: string
        }
        Insert: {
          id?: number
          legenda?: string | null
          nome_unidade: string
          url: string
        }
        Update: {
          id?: number
          legenda?: string | null
          nome_unidade?: string
          url?: string
        }
        Relationships: []
      }
      solidariedade_dash: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          consentimento_lgpd: string | null
          criado_em: string
          data_nascimento: string | null
          endereco_completo: string | null
          helena_card_id: string | null
          helena_contact_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          nome: string | null
          origem: string | null
          profissao: string | null
          resumo_conversa: string | null
          rua: string | null
          telefone: string
          uf: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          consentimento_lgpd?: string | null
          criado_em?: string
          data_nascimento?: string | null
          endereco_completo?: string | null
          helena_card_id?: string | null
          helena_contact_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          origem?: string | null
          profissao?: string | null
          resumo_conversa?: string | null
          rua?: string | null
          telefone: string
          uf?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          consentimento_lgpd?: string | null
          criado_em?: string
          data_nascimento?: string | null
          endereco_completo?: string | null
          helena_card_id?: string | null
          helena_contact_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string | null
          origem?: string | null
          profissao?: string | null
          resumo_conversa?: string | null
          rua?: string | null
          telefone?: string
          uf?: string | null
        }
        Relationships: []
      }
      systemcreatoragencia_assets: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          height: number | null
          id: string
          job_id: string | null
          kind: string
          metadata: Json | null
          mime_type: string | null
          public_url: string | null
          size_bytes: number | null
          storage_path: string
          tenant_id: string
          width: number | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          height?: number | null
          id?: string
          job_id?: string | null
          kind: string
          metadata?: Json | null
          mime_type?: string | null
          public_url?: string | null
          size_bytes?: number | null
          storage_path: string
          tenant_id: string
          width?: number | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          height?: number | null
          id?: string
          job_id?: string | null
          kind?: string
          metadata?: Json | null
          mime_type?: string | null
          public_url?: string | null
          size_bytes?: number | null
          storage_path?: string
          tenant_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "systemcreatoragencia_assets_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "systemcreatoragencia_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      systemcreatoragencia_conversations: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          tenant_id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tenant_id: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tenant_id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "systemcreatoragencia_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "systemcreatoragencia_users"
            referencedColumns: ["id"]
          },
        ]
      }
      systemcreatoragencia_jobs: {
        Row: {
          conversation_id: string | null
          cost_usd: number | null
          created_at: string | null
          error: string | null
          finished_at: string | null
          id: string
          input: Json | null
          output: Json | null
          squad: string
          started_at: string | null
          state: Json | null
          status: string
          tenant_id: string
          tokens_in: number | null
          tokens_out: number | null
        }
        Insert: {
          conversation_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          error?: string | null
          finished_at?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          squad: string
          started_at?: string | null
          state?: Json | null
          status?: string
          tenant_id: string
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Update: {
          conversation_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          error?: string | null
          finished_at?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          squad?: string
          started_at?: string | null
          state?: Json | null
          status?: string
          tenant_id?: string
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "systemcreatoragencia_jobs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "systemcreatoragencia_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      systemcreatoragencia_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          tenant_id: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          tenant_id: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "systemcreatoragencia_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "systemcreatoragencia_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      systemcreatoragencia_profiles_cache: {
        Row: {
          apify_run_id: string | null
          created_at: string | null
          data: Json | null
          expires_at: string | null
          handle: string
          id: string
          platform: string
          tenant_id: string
        }
        Insert: {
          apify_run_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          handle: string
          id?: string
          platform: string
          tenant_id: string
        }
        Update: {
          apify_run_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          handle?: string
          id?: string
          platform?: string
          tenant_id?: string
        }
        Relationships: []
      }
      systemcreatoragencia_tenants: {
        Row: {
          created_at: string | null
          id: string
          name: string
          plan: string | null
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          plan?: string | null
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          plan?: string | null
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      systemcreatoragencia_users: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "systemcreatoragencia_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "systemcreatoragencia_tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      systemcreatoragencia_voices: {
        Row: {
          created_at: string | null
          description: string | null
          elevenlabs_voice_id: string
          id: string
          is_default: boolean | null
          metadata: Json | null
          name: string | null
          preview_url: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          elevenlabs_voice_id: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          name?: string | null
          preview_url?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          elevenlabs_voice_id?: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          name?: string | null
          preview_url?: string | null
          tenant_id?: string
        }
        Relationships: []
      }
      taca_dashboard: {
        Row: {
          atendido_por_humano: boolean | null
          cardapio_solicitado: string | null
          cliente_retornante: boolean | null
          created_at: string | null
          data_atendimento_humano: string | null
          data_conversa: string
          dia_semana: string
          dia_semana_consultado: string | null
          eh_aniversario: boolean | null
          elogio_texto: string | null
          ferramenta_usada: string[] | null
          fora_horario: boolean | null
          hora_primeira_mensagem: string
          hora_ultima_mensagem: string
          id: number
          interacao_negativa: boolean | null
          interacao_positiva: boolean | null
          necessita_humano: boolean | null
          reclamacao_texto: string | null
          respondido_por: string
          resumo_atendimento: string | null
          solicitou_cardapio: boolean | null
          solicitou_reserva: boolean | null
          telefone: string
          tempo_resposta_ms: number | null
          tipo_atendimento: string | null
          total_mensagens: number | null
          total_pessoas_reserva: number | null
          total_reservas_dia: number | null
          turno: string | null
          updated_at: string | null
        }
        Insert: {
          atendido_por_humano?: boolean | null
          cardapio_solicitado?: string | null
          cliente_retornante?: boolean | null
          created_at?: string | null
          data_atendimento_humano?: string | null
          data_conversa: string
          dia_semana: string
          dia_semana_consultado?: string | null
          eh_aniversario?: boolean | null
          elogio_texto?: string | null
          ferramenta_usada?: string[] | null
          fora_horario?: boolean | null
          hora_primeira_mensagem?: string
          hora_ultima_mensagem?: string
          id?: number
          interacao_negativa?: boolean | null
          interacao_positiva?: boolean | null
          necessita_humano?: boolean | null
          reclamacao_texto?: string | null
          respondido_por?: string
          resumo_atendimento?: string | null
          solicitou_cardapio?: boolean | null
          solicitou_reserva?: boolean | null
          telefone: string
          tempo_resposta_ms?: number | null
          tipo_atendimento?: string | null
          total_mensagens?: number | null
          total_pessoas_reserva?: number | null
          total_reservas_dia?: number | null
          turno?: string | null
          updated_at?: string | null
        }
        Update: {
          atendido_por_humano?: boolean | null
          cardapio_solicitado?: string | null
          cliente_retornante?: boolean | null
          created_at?: string | null
          data_atendimento_humano?: string | null
          data_conversa?: string
          dia_semana?: string
          dia_semana_consultado?: string | null
          eh_aniversario?: boolean | null
          elogio_texto?: string | null
          ferramenta_usada?: string[] | null
          fora_horario?: boolean | null
          hora_primeira_mensagem?: string
          hora_ultima_mensagem?: string
          id?: number
          interacao_negativa?: boolean | null
          interacao_positiva?: boolean | null
          necessita_humano?: boolean | null
          reclamacao_texto?: string | null
          respondido_por?: string
          resumo_atendimento?: string | null
          solicitou_cardapio?: boolean | null
          solicitou_reserva?: boolean | null
          telefone?: string
          tempo_resposta_ms?: number | null
          tipo_atendimento?: string | null
          total_mensagens?: number | null
          total_pessoas_reserva?: number | null
          total_reservas_dia?: number | null
          turno?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      taca_mensagens: {
        Row: {
          conteudo: string
          dashboard_id: number | null
          data: string
          hora: string
          id: number
          remetente: string
          respondido_por: string
          telefone: string
          tempo_ms: number | null
          tipo_mensagem: string
          tools_usadas: string | null
        }
        Insert: {
          conteudo: string
          dashboard_id?: number | null
          data?: string
          hora?: string
          id?: number
          remetente: string
          respondido_por?: string
          telefone: string
          tempo_ms?: number | null
          tipo_mensagem?: string
          tools_usadas?: string | null
        }
        Update: {
          conteudo?: string
          dashboard_id?: number | null
          data?: string
          hora?: string
          id?: number
          remetente?: string
          respondido_por?: string
          telefone?: string
          tempo_ms?: number | null
          tipo_mensagem?: string
          tools_usadas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "taca_mensagens_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "taca_dashboard"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas: {
        Row: {
          colaborador_id: string | null
          completed_at: string | null
          created_at: string | null
          data: string
          descricao: string | null
          id: string
          periodo: string | null
          prazo_final: string | null
          prioridade: string | null
          projeto: string | null
          status: string | null
          tempo_estimado: number | null
          titulo: string
        }
        Insert: {
          colaborador_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          data: string
          descricao?: string | null
          id?: string
          periodo?: string | null
          prazo_final?: string | null
          prioridade?: string | null
          projeto?: string | null
          status?: string | null
          tempo_estimado?: number | null
          titulo: string
        }
        Update: {
          colaborador_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          data?: string
          descricao?: string | null
          id?: string
          periodo?: string | null
          prazo_final?: string | null
          prioridade?: string | null
          projeto?: string | null
          status?: string | null
          tempo_estimado?: number | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      task_checklist_items: {
        Row: {
          created_at: string | null
          id: string
          is_checked: boolean | null
          position: number | null
          quantity: number | null
          task_id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_checked?: boolean | null
          position?: number | null
          quantity?: number | null
          task_id: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_checked?: boolean | null
          position?: number | null
          quantity?: number | null
          task_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_checklist_items_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          category_id: string | null
          created_at: string | null
          data_tarefa: string
          descricao: string | null
          horario: string | null
          id: string
          is_priority: boolean | null
          position: number | null
          priority_level: string | null
          status: string
          titulo: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          data_tarefa?: string
          descricao?: string | null
          horario?: string | null
          id?: string
          is_priority?: boolean | null
          position?: number | null
          priority_level?: string | null
          status?: string
          titulo: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          data_tarefa?: string
          descricao?: string | null
          horario?: string | null
          id?: string
          is_priority?: boolean | null
          position?: number | null
          priority_level?: string | null
          status?: string
          titulo?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      trends: {
        Row: {
          category: string | null
          city: string | null
          collected_at: string | null
          country: string | null
          created_at: string | null
          id: string
          keyword: string
          raw_data: Json | null
          score: number | null
          sentiment: string | null
          source: string
          state: string | null
          volume: number | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          collected_at?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          keyword: string
          raw_data?: Json | null
          score?: number | null
          sentiment?: string | null
          source: string
          state?: string | null
          volume?: number | null
        }
        Update: {
          category?: string | null
          city?: string | null
          collected_at?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          keyword?: string
          raw_data?: Json | null
          score?: number | null
          sentiment?: string | null
          source?: string
          state?: string | null
          volume?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          ativo: boolean | null
          created_at: string
          id: string
          permissions: string[] | null
          username: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          id: string
          permissions?: string[] | null
          username: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          id?: string
          permissions?: string[] | null
          username?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      borabike2026_estatisticas: {
        Row: {
          dias_com_inscricoes: number | null
          primeira_inscricao: string | null
          total_feminino: number | null
          total_inscricoes: number | null
          total_masculino: number | null
          total_outros: number | null
          ultima_inscricao: string | null
        }
        Relationships: []
      }
      postproject_v_accounts_due_for_polling: {
        Row: {
          caption_mode:
            | Database["public"]["Enums"]["postproject_caption_mode"]
            | null
          custom_caption_template: string | null
          is_due: boolean | null
          last_polled_at: string | null
          late_api_key: string | null
          late_profile_id: string | null
          media_filter: Json | null
          monitored_account_id: string | null
          next_poll_at: string | null
          polling_interval_minutes: number | null
          rapidapi_key: string | null
          target_platform: string | null
          target_user_id: string | null
          target_username: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      postproject_v_repost_targets_detail: {
        Row: {
          account_is_active: boolean | null
          connected_account_id: string | null
          health_status:
            | Database["public"]["Enums"]["postproject_account_health_status"]
            | null
          late_account_id: string | null
          monitored_account_id: string | null
          platform:
            | Database["public"]["Enums"]["postproject_social_platform"]
            | null
          post_as_story: boolean | null
          repost_target_id: string | null
          source_username: string | null
          target_account_display_name: string | null
          target_account_username: string | null
          target_is_active: boolean | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_monitored_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "postproject_repost_targets_connected_account_id_fkey"
            columns: ["connected_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_connected_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_targets_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_monitored_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postproject_repost_targets_monitored_account_id_fkey"
            columns: ["monitored_account_id"]
            isOneToOne: false
            referencedRelation: "postproject_v_accounts_due_for_polling"
            referencedColumns: ["monitored_account_id"]
          },
        ]
      }
      postproject_v_user_dashboard_stats: {
        Row: {
          active_accounts_count: number | null
          active_monitors_count: number | null
          failed_reposts_this_month: number | null
          media_library_count: number | null
          name: string | null
          reposts_this_month: number | null
          role: Database["public"]["Enums"]["postproject_user_role"] | null
          total_storage_bytes: number | null
          user_id: string | null
        }
        Relationships: []
      }
      quadribahia_vw_metricas_dashboard: {
        Row: {
          reservas_hoje: number | null
          reservas_mes: number | null
          reservas_semana: number | null
          total_arrecadado: number | null
          total_confirmadas: number | null
          total_hoje: number | null
          total_mes: number | null
          total_pago: number | null
          total_pendente: number | null
          total_reservas: number | null
          total_semana: number | null
        }
        Relationships: []
      }
      renatasene_pesquisa_publica: {
        Row: {
          apelido: string | null
          area_atuacao: string[] | null
          areas_interesse: string[] | null
          bairro: string | null
          cidade: string | null
          como_conheceu: string | null
          created_at: string | null
          escolaridade: string | null
          faixa_etaria: string | null
          id: number | null
          situacao_profissional: string | null
          sugestao_livre: string | null
          topicos_selecionados: Json | null
          uf: string | null
        }
        Insert: {
          apelido?: string | null
          area_atuacao?: string[] | null
          areas_interesse?: string[] | null
          bairro?: string | null
          cidade?: string | null
          como_conheceu?: string | null
          created_at?: string | null
          escolaridade?: string | null
          faixa_etaria?: string | null
          id?: number | null
          situacao_profissional?: string | null
          sugestao_livre?: string | null
          topicos_selecionados?: Json | null
          uf?: string | null
        }
        Update: {
          apelido?: string | null
          area_atuacao?: string[] | null
          areas_interesse?: string[] | null
          bairro?: string | null
          cidade?: string | null
          como_conheceu?: string | null
          created_at?: string | null
          escolaridade?: string | null
          faixa_etaria?: string | null
          id?: number | null
          situacao_profissional?: string | null
          sugestao_livre?: string | null
          topicos_selecionados?: Json | null
          uf?: string | null
        }
        Relationships: []
      }
      sistemaaniversario_tenants_public: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          cargo: string | null
          cidade: string | null
          cor_accent: string | null
          cor_primaria: string | null
          cor_primaria_hover: string | null
          cor_sidebar: string | null
          criado_em: string | null
          id: string | null
          logo_url: string | null
          nome: string | null
          pdf_assinatura_cargo: string | null
          pdf_assinatura_nome: string | null
          pdf_corpo_template: string | null
          pdf_saudacao: string | null
          pdf_titulo: string | null
          slug: string | null
          subtitulo: string | null
          titulo_sidebar: string | null
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cargo?: string | null
          cidade?: string | null
          cor_accent?: string | null
          cor_primaria?: string | null
          cor_primaria_hover?: string | null
          cor_sidebar?: string | null
          criado_em?: string | null
          id?: string | null
          logo_url?: string | null
          nome?: string | null
          pdf_assinatura_cargo?: string | null
          pdf_assinatura_nome?: string | null
          pdf_corpo_template?: string | null
          pdf_saudacao?: string | null
          pdf_titulo?: string | null
          slug?: string | null
          subtitulo?: string | null
          titulo_sidebar?: string | null
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          cargo?: string | null
          cidade?: string | null
          cor_accent?: string | null
          cor_primaria?: string | null
          cor_primaria_hover?: string | null
          cor_sidebar?: string | null
          criado_em?: string | null
          id?: string | null
          logo_url?: string | null
          nome?: string | null
          pdf_assinatura_cargo?: string | null
          pdf_assinatura_nome?: string | null
          pdf_corpo_template?: string | null
          pdf_saudacao?: string | null
          pdf_titulo?: string | null
          slug?: string | null
          subtitulo?: string | null
          titulo_sidebar?: string | null
        }
        Relationships: []
      }
      v_fbpaulinhoforca_contas_public: {
        Row: {
          about: string | null
          ativo: boolean | null
          categoria: string | null
          created_at: string | null
          fan_count: number | null
          fb_page_id: string | null
          followers_count: number | null
          id: string | null
          last_profile_sync_at: string | null
          nome: string | null
          profile_pic_storage_url: string | null
          profile_pic_url: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fan_count?: number | null
          fb_page_id?: string | null
          followers_count?: number | null
          id?: string | null
          last_profile_sync_at?: string | null
          nome?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fan_count?: number | null
          fb_page_id?: string | null
          followers_count?: number | null
          id?: string | null
          last_profile_sync_at?: string | null
          nome?: string | null
          profile_pic_storage_url?: string | null
          profile_pic_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      v_fbpaulinhoforca_latest_insights: {
        Row: {
          captured_at: string | null
          conta_id: string | null
          id: string | null
          page_fan_adds: number | null
          page_fans: number | null
          page_follows: number | null
          page_post_engagements: number | null
          page_video_views: number | null
          page_views_total: number | null
          period: string | null
          period_days: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fbpaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "fbpaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbpaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_fbpaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      v_instapaulinhoforca_contas_public: {
        Row: {
          ativo: boolean | null
          bio: string | null
          categoria: string | null
          created_at: string | null
          external_url: string | null
          followers_count: number | null
          following_count: number | null
          id: string | null
          ig_user_id: string | null
          is_business_account: boolean | null
          is_verified: boolean | null
          last_profile_sync_at: string | null
          media_count: number | null
          nome: string | null
          profile_pic_url: string | null
          profile_pic_url_hd: string | null
          token_expira_em: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string | null
          ig_user_id?: string | null
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          token_expira_em?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          ativo?: boolean | null
          bio?: string | null
          categoria?: string | null
          created_at?: string | null
          external_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string | null
          ig_user_id?: string | null
          is_business_account?: boolean | null
          is_verified?: boolean | null
          last_profile_sync_at?: string | null
          media_count?: number | null
          nome?: string | null
          profile_pic_url?: string | null
          profile_pic_url_hd?: string | null
          token_expira_em?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      v_instapaulinhoforca_ia_chat_sessions: {
        Row: {
          last_at: string | null
          last_squad_id: string | null
          message_count: number | null
          session_id: string | null
          started_at: string | null
          title: string | null
        }
        Relationships: []
      }
      v_instapaulinhoforca_ia_config_pub: {
        Row: {
          api_key_set: boolean | null
          api_key_tail: string | null
          key: string | null
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          api_key_set?: never
          api_key_tail?: never
          key?: string | null
          updated_at?: string | null
          value?: never
        }
        Update: {
          api_key_set?: never
          api_key_tail?: never
          key?: string | null
          updated_at?: string | null
          value?: never
        }
        Relationships: []
      }
      v_instapaulinhoforca_latest_insights: {
        Row: {
          accounts_engaged: number | null
          captured_at: string | null
          comments: number | null
          conta_id: string | null
          engaged_audience_demographics: Json | null
          error: string | null
          follower_demographics: Json | null
          follows: number | null
          id: string | null
          likes: number | null
          net_follows: number | null
          period: string | null
          period_days: number | null
          profile_links_taps: number | null
          raw: Json | null
          reach: number | null
          replies: number | null
          reposts: number | null
          saves: number | null
          shares: number | null
          total_interactions: number | null
          unfollows: number | null
          views: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instapaulinhoforca_insights_snapshots_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "v_instapaulinhoforca_contas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      v_instapaulinhoforca_latest_post_insights: {
        Row: {
          captured_at: string | null
          clips_replays_count: number | null
          comments: number | null
          error: string | null
          follows: number | null
          id: string | null
          ig_media_id: string | null
          ig_reels_aggregated_all_plays_count: number | null
          ig_reels_avg_watch_time: number | null
          ig_reels_video_view_total_time: number | null
          likes: number | null
          post_id: string | null
          profile_activity: number | null
          profile_visits: number | null
          raw: Json | null
          reach: number | null
          saves: number | null
          shares: number | null
          tipo_media: string | null
          total_interactions: number | null
          views: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instapaulinhoforca_post_insights_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "instapaulinhoforca_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      admin_get_tenant: {
        Args: { p_tenant_id: string }
        Returns: {
          ativo: boolean
          atualizado_em: string | null
          cargo: string
          cidade: string | null
          cor_accent: string | null
          cor_primaria: string | null
          cor_primaria_hover: string | null
          cor_sidebar: string | null
          criado_em: string | null
          cron_secret: string | null
          envio_automatico: boolean
          helena_api_base_url: string | null
          helena_api_token: string | null
          helena_channel_id: string | null
          helena_custom_field_nascimento: string[] | null
          helena_template_id: string | null
          helena_template_nome: string | null
          horario_envio: string | null
          id: string
          intervalo_envio_max: number | null
          intervalo_envio_min: number | null
          logo_url: string | null
          mensagem_aniversario: string | null
          nome: string
          pdf_assinatura_cargo: string | null
          pdf_assinatura_nome: string | null
          pdf_corpo_template: string | null
          pdf_saudacao: string | null
          pdf_titulo: string | null
          slug: string
          subtitulo: string | null
          titulo_sidebar: string | null
          ultima_sync_em: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "sistemaaniversario_tenants"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_list_users: {
        Args: never
        Returns: {
          ativo: boolean
          criado_em: string
          email: string
          id: string
          role: string
          tenant_id: string
          tenant_nome: string
          ultimo_acesso_em: string
        }[]
      }
      check_dashboard_access: { Args: { user_email: string }; Returns: boolean }
      claim_next_job: {
        Args: { p_queues: string[]; p_worker_id: string }
        Returns: {
          attempts: number
          available_at: string
          channel_id: string | null
          completed_at: string | null
          created_at: string
          failed_at: string | null
          id: string
          last_error: string | null
          locked_at: string | null
          locked_by: string | null
          max_attempts: number
          payload: Json
          priority: number
          queue_name: string
          singleton_key: string | null
          state: string
          tenant_id: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "agentredes_job_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      cleanup_spam_contacts: { Args: never; Returns: undefined }
      convert_to_brazil_time: { Args: { utc_time: string }; Returns: string }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      extrair_data_texto: { Args: { texto: string }; Returns: string }
      generate_unique_codigo: { Args: never; Returns: string }
      get_card_invoice: {
        Args: { p_card_id: string; p_month: number; p_year: number }
        Returns: number
      }
      get_monthly_summary: {
        Args: { p_month: number; p_user_id: string; p_year: number }
        Returns: {
          balance: number
          total_expenses: number
          total_income: number
          total_saved: number
        }[]
      }
      get_public_brand_settings: { Args: never; Returns: Json }
      get_tenant_ids: { Args: never; Returns: string[] }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_nf_cliente_owner: { Args: { cliente_id: string }; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
      is_user_approved: { Args: never; Returns: boolean }
      limpar_taca_mensagens_antigas: { Args: never; Returns: undefined }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      postproject_auth_is_superadmin: { Args: never; Returns: boolean }
      postproject_auth_user_id: { Args: never; Returns: string }
      postproject_cleanup_old_activity_logs: {
        Args: { p_retention_days?: number }
        Returns: number
      }
      postproject_cleanup_old_polling_logs: {
        Args: { p_retention_days?: number }
        Returns: number
      }
      postproject_force_poll_monitor: {
        Args: { p_monitor_id: string }
        Returns: Json
      }
      postproject_increment_media_usage: {
        Args: { p_media_id: string }
        Returns: undefined
      }
      postproject_is_post_already_processed: {
        Args: { p_monitored_account_id: string; p_platform_post_id: string }
        Returns: boolean
      }
      postproject_log_activity: {
        Args: {
          p_message: string
          p_metadata?: Json
          p_platform?: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      postproject_update_poll_timestamp: {
        Args: { p_monitored_account_id: string }
        Returns: undefined
      }
      release_advisory_lock: { Args: { p_key: number }; Returns: boolean }
      requeue_job: {
        Args: {
          p_attempts: number
          p_backoff_seconds: number
          p_error: string
          p_job_id: string
        }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      snapshot_queue_metrics: {
        Args: never
        Returns: {
          active_count: number | null
          avg_process_seconds: number | null
          avg_wait_seconds: number | null
          captured_at: string | null
          channel_id: string | null
          completed_today: number | null
          failed_today: number | null
          id: string
          queue_name: string | null
          queued_count: number | null
          tenant_id: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "agentredes_queue_metrics"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      systemcreatoragencia_current_tenant: { Args: never; Returns: string }
      try_advisory_lock: { Args: { p_key: number }; Returns: boolean }
      upsert_taca_dashboard: {
        Args: {
          p_cardapio_solicitado: string
          p_dia_semana_consultado: string
          p_eh_aniversario: boolean
          p_elogio_texto: string
          p_ferramenta_usada: string[]
          p_fora_horario: boolean
          p_interacao_negativa: boolean
          p_interacao_positiva: boolean
          p_necessita_humano?: boolean
          p_pessoas_reserva: number
          p_reclamacao_texto: string
          p_respondido_por?: string
          p_resumo_atendimento: string
          p_solicitou_cardapio: boolean
          p_solicitou_reserva: boolean
          p_telefone: string
          p_tempo_resposta_ms: number
          p_tipo_atendimento: string
          p_turno: string
        }
        Returns: Json
      }
      validate_dashboard_login: {
        Args: { user_email: string; user_password: string }
        Returns: boolean
      }
    }
    Enums: {
      agentpolitico_agent_type_enum: "principal" | "assessor"
      agentpolitico_sync_status_enum: "synced" | "orphaned"
      app_role: "admin" | "user"
      postproject_account_health_status: "healthy" | "warning" | "error"
      postproject_caption_mode: "original" | "credits" | "custom"
      postproject_media_source: "upload" | "repost" | "download"
      postproject_polling_status: "success" | "failed" | "rate_limited"
      postproject_processed_post_status:
        | "detected"
        | "downloading"
        | "downloaded"
        | "reposting"
        | "completed"
        | "failed"
      postproject_repost_status: "pending" | "published" | "failed" | "skipped"
      postproject_social_platform:
        | "instagram"
        | "youtube"
        | "facebook"
        | "tiktok"
      postproject_user_role: "superadmin" | "admin"
      prioridade: "alta" | "media" | "baixa"
      status_projeto:
        | "planejamento"
        | "andamento"
        | "pendente"
        | "concluido"
        | "em_teste"
        | "em_producao"
        | "pausado"
      status_tarefa: "a_fazer" | "em_progresso" | "concluida"
      tipo_projeto: "Automações" | "Agente de IA" | "Marketing" | "Outros"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agentpolitico_agent_type_enum: ["principal", "assessor"],
      agentpolitico_sync_status_enum: ["synced", "orphaned"],
      app_role: ["admin", "user"],
      postproject_account_health_status: ["healthy", "warning", "error"],
      postproject_caption_mode: ["original", "credits", "custom"],
      postproject_media_source: ["upload", "repost", "download"],
      postproject_polling_status: ["success", "failed", "rate_limited"],
      postproject_processed_post_status: [
        "detected",
        "downloading",
        "downloaded",
        "reposting",
        "completed",
        "failed",
      ],
      postproject_repost_status: ["pending", "published", "failed", "skipped"],
      postproject_social_platform: [
        "instagram",
        "youtube",
        "facebook",
        "tiktok",
      ],
      postproject_user_role: ["superadmin", "admin"],
      prioridade: ["alta", "media", "baixa"],
      status_projeto: [
        "planejamento",
        "andamento",
        "pendente",
        "concluido",
        "em_teste",
        "em_producao",
        "pausado",
      ],
      status_tarefa: ["a_fazer", "em_progresso", "concluida"],
      tipo_projeto: ["Automações", "Agente de IA", "Marketing", "Outros"],
    },
  },
} as const
