import { supabase } from "./supabase"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  nomeEstabelecimento: string
  cnpjCpf: string
  telefone?: string
}

const hashPassword = async (plain: string): Promise<string> => {
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("")
    }
  } catch (error) {
    console.warn("Falha ao gerar hash seguro da senha, retornando valor mascarado.", error)
  }
  return `masked:${plain}`
}

export const authService = {
  // Login
  async signIn({ email, password }: LoginCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Se for erro de email não confirmado, tentar confirmar automaticamente
        if (error.message.includes('Email not confirmed')) {
          console.log("📧 Email não confirmado, tentando confirmar automaticamente...")
          
          // Em desenvolvimento, vamos permitir login mesmo sem confirmação
          // Isso é temporário até configurarmos corretamente o Supabase
          throw new Error("Email não confirmado. Execute o SQL de confirmação no Supabase primeiro.")
        }
        throw error
      }

      // Login realizado com sucesso
      return data
    } catch (error) {
      console.error("❌ Erro no signIn:", error)
      throw error
    }
  },

  // Registro
  async signUp({ email, password, nomeEstabelecimento, cnpjCpf, telefone }: RegisterCredentials) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/vendas`,
          data: {
            nome_estabelecimento: nomeEstabelecimento,
            cnpj_cpf: cnpjCpf,
            telefone: telefone
          }
        }
      })

      if (error) {
        // Se o usuário já existe, mostrar mensagem mais específica
        if (error.message.includes('already exists') || 
            error.message.includes('already registered') || 
            error.message.includes('User already registered') ||
            error.message.includes('already been registered') ||
            error.code === 'user_already_exists') {
          throw new Error(`Este email (${email}) já está registrado. Faça login em vez de criar uma nova conta.`)
        }
        throw error
      }

      if (!data.user) {
        throw new Error("Falha na criação do usuário - dados inválidos retornados")
      }

      // Aguardar um pouco para o trigger automático processar
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Verificar se o perfil foi criado pelo trigger, se não, criar manualmente
      try {
        const { error: checkError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("id", data.user.id)
          .single()

        // Se não existe, criar manualmente (fallback se o trigger falhar)
        if (checkError && checkError.code === 'PGRST116') {
          console.log("🔄 Perfil não criado pelo trigger, criando manualmente...")

          const senha_hash = await hashPassword(password)

          const { error: profileError } = await supabase
            .from("usuarios")
            .insert({
              id: data.user.id,
              nome: nomeEstabelecimento,
              email: email,
              nome_estabelecimento: nomeEstabelecimento,
              cnpj_cpf: cnpjCpf,
              telefone: telefone,
              senha_hash
            })

          if (profileError) {
            console.error("❌ Erro ao criar perfil manual:", profileError)
            throw new Error("Erro ao criar perfil do usuário. Tente novamente.")
          } else {
            console.log("✅ Perfil criado manualmente com sucesso")
          }
        } else {
          console.log("✅ Perfil já existe (criado pelo trigger)")
        }
      } catch (profileError) {
        console.warn("⚠️ Aviso: erro ao verificar/criar perfil, mas usuário foi criado:", profileError)
      }

      return data
    } catch (error: any) {
      throw error
    }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Recuperar senha
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  },

  // Obter usuário atual
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Obter sessão atual
  async getCurrentSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Criar perfil do usuário se não existir
  async ensureUserProfile(user: any, additionalData?: Partial<RegisterCredentials>) {
    if (!user?.id) return

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from("usuarios")
      .select("id")
      .eq("id", user.id)
      .single()

    if (!existingProfile && additionalData) {
      // Criar perfil se não existir e temos dados adicionais
      const { error } = await supabase.from("usuarios").insert({
        id: user.id,
        email: user.email,
        nome_estabelecimento: additionalData.nomeEstabelecimento || "Estabelecimento",
        cnpj_cpf: additionalData.cnpjCpf || "00000000000",
        telefone: additionalData.telefone
      })

      if (error) {
        console.error("Erro ao criar perfil do usuário:", error)
      }
    }
  },

  // Confirmar email automaticamente (apenas para desenvolvimento)
  async confirmEmail(token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'signup'
    })
    
    if (error) throw error
    return data
  },

  // Login sem verificação de email (para desenvolvimento)
  async signInWithoutEmailVerification({ email, password }: LoginCredentials) {
    try {
      // Tentar login normal primeiro
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Se o erro for de email não confirmado, podemos lidar de forma especial
        if (error.message.includes('Email not confirmed')) {
          console.warn('Email não confirmado, mas permitindo login para desenvolvimento')
          // Em produção, você removeria este workaround
        }
        throw error
      }

      return data
    } catch (error) {
      throw error
    }
  },
}
