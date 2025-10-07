export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          ativo: boolean | null
          cpf_cnpj: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          endereco: Json | null
          id: string
          nome: string
          observacoes: string | null
          telefone: string | null
          tipo: string | null
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          cpf_cnpj?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: Json | null
          id?: string
          nome: string
          observacoes?: string | null
          telefone?: string | null
          tipo?: string | null
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          cpf_cnpj?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: Json | null
          id?: string
          nome?: string
          observacoes?: string | null
          telefone?: string | null
          tipo?: string | null
          updated_at?: string | null
          usuario_id?: string
        }
      }
      comandas: {
        Row: {
          cliente_nome: string | null
          cliente_telefone: string | null
          created_at: string | null
          data_abertura: string | null
          data_fechamento: string | null
          desconto: number | null
          forma_pagamento: string | null
          id: string
          mesa_id: string
          numero_comanda: string
          observacoes: string | null
          status: string | null
          subtotal: number | null
          total: number | null
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          cliente_nome?: string | null
          cliente_telefone?: string | null
          created_at?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          desconto?: number | null
          forma_pagamento?: string | null
          id?: string
          mesa_id: string
          numero_comanda: string
          observacoes?: string | null
          status?: string | null
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          cliente_nome?: string | null
          cliente_telefone?: string | null
          created_at?: string | null
          data_abertura?: string | null
          data_fechamento?: string | null
          desconto?: number | null
          forma_pagamento?: string | null
          id?: string
          mesa_id?: string
          numero_comanda?: string
          observacoes?: string | null
          status?: string | null
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          usuario_id?: string
        }
      }
      configuracoes: {
        Row: {
          alerta_estoque_critico: number | null
          backup_automatico: boolean | null
          created_at: string | null
          dias_relatorio_padrao: number | null
          email_contato: string | null
          endereco: string | null
          estoque_minimo_padrao: number | null
          formato_data: string | null
          frequencia_backup: string | null
          id: string
          inscricao_estadual: string | null
          logo_url: string | null
          moeda: string | null
          nome_estabelecimento: string | null
          notificacao_email: boolean | null
          notificacao_estoque_baixo: boolean | null
          notificacao_push: boolean | null
          regime_tributario: string | null
          telefone: string | null
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          alerta_estoque_critico?: number | null
          backup_automatico?: boolean | null
          created_at?: string | null
          dias_relatorio_padrao?: number | null
          email_contato?: string | null
          endereco?: string | null
          estoque_minimo_padrao?: number | null
          formato_data?: string | null
          frequencia_backup?: string | null
          id?: string
          inscricao_estadual?: string | null
          logo_url?: string | null
          moeda?: string | null
          nome_estabelecimento?: string | null
          notificacao_email?: boolean | null
          notificacao_estoque_baixo?: boolean | null
          notificacao_push?: boolean | null
          regime_tributario?: string | null
          telefone?: string | null
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          alerta_estoque_critico?: number | null
          backup_automatico?: boolean | null
          created_at?: string | null
          dias_relatorio_padrao?: number | null
          email_contato?: string | null
          endereco?: string | null
          estoque_minimo_padrao?: number | null
          formato_data?: string | null
          frequencia_backup?: string | null
          id?: string
          inscricao_estadual?: string | null
          logo_url?: string | null
          moeda?: string | null
          nome_estabelecimento?: string | null
          notificacao_email?: boolean | null
          notificacao_estoque_baixo?: boolean | null
          notificacao_push?: boolean | null
          regime_tributario?: string | null
          telefone?: string | null
          updated_at?: string | null
          usuario_id?: string
        }
      }
      itens_comanda: {
        Row: {
          comanda_id: string
          created_at: string | null
          data_pedido: string | null
          desconto_item: number | null
          id: string
          observacoes: string | null
          preco_unitario: number
          produto_id: string
          quantidade: number
          subtotal: number | null
        }
        Insert: {
          comanda_id: string
          created_at?: string | null
          data_pedido?: string | null
          desconto_item?: number | null
          id?: string
          observacoes?: string | null
          preco_unitario: number
          produto_id: string
          quantidade: number
          subtotal?: number | null
        }
        Update: {
          comanda_id?: string
          created_at?: string | null
          data_pedido?: string | null
          desconto_item?: number | null
          id?: string
          observacoes?: string | null
          preco_unitario?: number
          produto_id?: string
          quantidade?: number
          subtotal?: number | null
        }
      }
      itens_venda: {
        Row: {
          created_at: string | null
          desconto_item: number | null
          id: string
          preco_unitario: number
          produto_id: string
          quantidade: number
          subtotal: number | null
          venda_id: string
        }
        Insert: {
          created_at?: string | null
          desconto_item?: number | null
          id?: string
          preco_unitario: number
          produto_id: string
          quantidade: number
          subtotal?: number | null
          venda_id: string
        }
        Update: {
          created_at?: string | null
          desconto_item?: number | null
          id?: string
          preco_unitario?: number
          produto_id?: string
          quantidade?: number
          subtotal?: number | null
          venda_id?: string
        }
      }
      mesas: {
        Row: {
          ativo: boolean | null
          capacidade_pessoas: number | null
          created_at: string | null
          id: string
          nome_mesa: string | null
          numero_mesa: number
          observacoes: string | null
          status: string | null
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          capacidade_pessoas?: number | null
          created_at?: string | null
          id?: string
          nome_mesa?: string | null
          numero_mesa: number
          observacoes?: string | null
          status?: string | null
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          capacidade_pessoas?: number | null
          created_at?: string | null
          id?: string
          nome_mesa?: string | null
          numero_mesa?: number
          observacoes?: string | null
          status?: string | null
          updated_at?: string | null
          usuario_id?: string
        }
      }
      movimentacoes: {
        Row: {
          cliente: string | null
          created_at: string | null
          data_movimentacao: string | null
          documento: string | null
          fornecedor: string | null
          id: string
          motivo: string
          observacao: string | null
          preco_unitario: number | null
          produto_id: string
          quantidade: number
          responsavel: string
          status: string | null
          tipo: string
          updated_at: string | null
          usuario_id: string
          valor_total: number | null
        }
        Insert: {
          cliente?: string | null
          created_at?: string | null
          data_movimentacao?: string | null
          documento?: string | null
          fornecedor?: string | null
          id?: string
          motivo: string
          observacao?: string | null
          preco_unitario?: number | null
          produto_id: string
          quantidade: number
          responsavel: string
          status?: string | null
          tipo: string
          updated_at?: string | null
          usuario_id: string
          valor_total?: number | null
        }
        Update: {
          cliente?: string | null
          created_at?: string | null
          data_movimentacao?: string | null
          documento?: string | null
          fornecedor?: string | null
          id?: string
          motivo?: string
          observacao?: string | null
          preco_unitario?: number | null
          produto_id?: string
          quantidade?: number
          responsavel?: string
          status?: string | null
          tipo?: string
          updated_at?: string | null
          usuario_id?: string
          valor_total?: number | null
        }
      }
      produtos: {
        Row: {
          ativo: boolean | null
          categoria: string
          codigo_barras: string | null
          created_at: string | null
          data_validade: string | null
          descricao: string | null
          estoque_atual: number | null
          estoque_minimo: number | null
          fornecedor: string | null
          id: string
          imagem_url: string | null
          marca: string | null
          nome: string
          preco_compra: number | null
          preco_venda: number | null
          updated_at: string | null
          usuario_id: string
          volume: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria: string
          codigo_barras?: string | null
          created_at?: string | null
          data_validade?: string | null
          descricao?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          fornecedor?: string | null
          id?: string
          imagem_url?: string | null
          marca?: string | null
          nome: string
          preco_compra?: number | null
          preco_venda?: number | null
          updated_at?: string | null
          usuario_id: string
          volume?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: string
          codigo_barras?: string | null
          created_at?: string | null
          data_validade?: string | null
          descricao?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          fornecedor?: string | null
          id?: string
          imagem_url?: string | null
          marca?: string | null
          nome?: string
          preco_compra?: number | null
          preco_venda?: number | null
          updated_at?: string | null
          usuario_id?: string
          volume?: string | null
        }
      }
      usuarios: {
        Row: {
          avatar_url: string | null
          cnpj_cpf: string | null
          created_at: string | null
          email: string
          id: string
          nome: string
          nome_completo: string | null
          nome_estabelecimento: string | null
          role: string | null
          senha_hash: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          cnpj_cpf?: string | null
          created_at?: string | null
          email: string
          id: string
          nome: string
          nome_completo?: string | null
          nome_estabelecimento?: string | null
          role?: string | null
          senha_hash?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          cnpj_cpf?: string | null
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          nome_completo?: string | null
          nome_estabelecimento?: string | null
          role?: string | null
          senha_hash?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
      }
      vendas: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_venda: string | null
          desconto: number | null
          forma_pagamento: string
          id: string
          numero_venda: string
          observacoes: string | null
          parcelas: number | null
          status: string | null
          subtotal: number | null
          total: number
          updated_at: string | null
          usuario_id: string
          vendedor: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_venda?: string | null
          desconto?: number | null
          forma_pagamento: string
          id?: string
          numero_venda: string
          observacoes?: string | null
          parcelas?: number | null
          status?: string | null
          subtotal?: number | null
          total: number
          updated_at?: string | null
          usuario_id: string
          vendedor?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_venda?: string | null
          desconto?: number | null
          forma_pagamento?: string
          id?: string
          numero_venda?: string
          observacoes?: string | null
          parcelas?: number | null
          status?: string | null
          subtotal?: number | null
          total?: number
          updated_at?: string | null
          usuario_id?: string
          vendedor?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Tipos auxiliares
export type Usuario = Database["public"]["Tables"]["usuarios"]["Row"]
export type Produto = Database["public"]["Tables"]["produtos"]["Row"]
export type Movimentacao = Database["public"]["Tables"]["movimentacoes"]["Row"]
export type Configuracao = Database["public"]["Tables"]["configuracoes"]["Row"]
export type Venda = Database["public"]["Tables"]["vendas"]["Row"]
export type ItemVenda = Database["public"]["Tables"]["itens_venda"]["Row"]
export type Cliente = Database["public"]["Tables"]["clientes"]["Row"]
export type Mesa = Database["public"]["Tables"]["mesas"]["Row"]
export type Comanda = Database["public"]["Tables"]["comandas"]["Row"]
export type ItemComanda = Database["public"]["Tables"]["itens_comanda"]["Row"]

export type NovoUsuario = Database["public"]["Tables"]["usuarios"]["Insert"]
export type NovoProduto = Database["public"]["Tables"]["produtos"]["Insert"]
export type NovaMovimentacao = Database["public"]["Tables"]["movimentacoes"]["Insert"]
export type NovaConfiguracao = Database["public"]["Tables"]["configuracoes"]["Insert"]
export type NovaVenda = Database["public"]["Tables"]["vendas"]["Insert"]
export type NovoItemVenda = Database["public"]["Tables"]["itens_venda"]["Insert"]
export type NovoCliente = Database["public"]["Tables"]["clientes"]["Insert"]
export type NovaMesa = Database["public"]["Tables"]["mesas"]["Insert"]
export type NovaComanda = Database["public"]["Tables"]["comandas"]["Insert"]
export type NovoItemComanda = Database["public"]["Tables"]["itens_comanda"]["Insert"]

export type AtualizarUsuario = Database["public"]["Tables"]["usuarios"]["Update"]
export type AtualizarProduto = Database["public"]["Tables"]["produtos"]["Update"]
export type AtualizarMovimentacao = Database["public"]["Tables"]["movimentacoes"]["Update"]
export type AtualizarConfiguracao = Database["public"]["Tables"]["configuracoes"]["Update"]
export type AtualizarVenda = Database["public"]["Tables"]["vendas"]["Update"]
export type AtualizarItemVenda = Database["public"]["Tables"]["itens_venda"]["Update"]
export type AtualizarCliente = Database["public"]["Tables"]["clientes"]["Update"]
export type AtualizarMesa = Database["public"]["Tables"]["mesas"]["Update"]
export type AtualizarComanda = Database["public"]["Tables"]["comandas"]["Update"]
export type AtualizarItemComanda = Database["public"]["Tables"]["itens_comanda"]["Update"]
