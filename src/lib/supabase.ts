import { createClient } from "@supabase/supabase-js"

// Helper to read env vars in both Vite (import.meta.env) and Node (process.env)
const getEnvVar = (key: string): string | undefined => {
  try {
    // Try to read Vite-provided env (available in the browser build/runtime)
    const meta = (import.meta as any)
    if (meta && meta.env && meta.env[key]) return meta.env[key]
  } catch (e) {
    // import.meta access can throw in some environments; ignore
  }

  // Node environment fallback (SSR, serverless)
  if (typeof process !== 'undefined' && process.env) {
    return (process.env as any)[key]
  }

  return undefined
}

// Configuração das variáveis de ambiente (sem fallback - totalmente seguro)
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

// Validação rigorosa das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ VARIÁVEIS DE AMBIENTE DO SUPABASE OBRIGATÓRIAS!\n\n' +
    '🔧 Configure estas variáveis:\n' +
    '   VITE_SUPABASE_URL=sua-url-do-projeto\n' +
    '   VITE_SUPABASE_ANON_KEY=sua-chave-publica\n\n' +
    '📂 Onde configurar:\n' +
    '   • Desenvolvimento: arquivo .env.local\n' +
    '   • Produção: dashboard da Vercel\n' +
    '   • CI/CD: secrets do repositório\n\n' +
    '📋 Consulte: env.example para modelo'
  )
}

// Configuração otimizada para produção
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit' as const,
    storageKey: 'torneira-digital-auth'
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-application': 'torneira-digital'
    }
  },
  realtime: {
    // Reduzir overhead do realtime se não usado
    params: {
      eventsPerSecond: 10
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
