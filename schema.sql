-- Enable required extensions
create extension if not exists "pgcrypto";

-- Users table
create table if not exists public.usuarios (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  nome text not null,
  nome_completo text,
  nome_estabelecimento text,
  telefone text,
  cnpj_cpf text,
  role text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

-- Customers
create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  nome text not null,
  cpf_cnpj text,
  email text,
  telefone text,
  tipo text,
  data_nascimento date,
  endereco jsonb,
  observacoes text,
  ativo boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

-- Tables in the establishment
create table if not exists public.mesas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  numero_mesa integer not null,
  nome_mesa text,
  capacidade_pessoas integer,
  status text,
  observacoes text,
  ativo boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

create unique index if not exists mesas_usuario_numero_idx on public.mesas (usuario_id, numero_mesa);

-- Products
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  nome text not null,
  marca text,
  volume text,
  categoria text not null,
  descricao text,
  fornecedor text,
  codigo_barras text,
  imagem_url text,
  data_validade date,
  estoque_atual integer default 0,
  estoque_minimo integer default 10,
  preco_compra numeric(12,2) default 0,
  preco_venda numeric(12,2) default 0,
  ativo boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

create index if not exists produtos_usuario_idx on public.produtos (usuario_id);
create index if not exists produtos_codigo_barras_idx on public.produtos (codigo_barras);

-- Sales
create table if not exists public.vendas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  numero_venda text not null,
  forma_pagamento text not null,
  status text,
  vendedor text,
  parcelas integer,
  subtotal numeric(12,2),
  desconto numeric(12,2),
  total numeric(12,2) not null,
  observacoes text,
  data_venda timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

create unique index if not exists vendas_usuario_numero_idx on public.vendas (usuario_id, numero_venda);
create index if not exists vendas_cliente_idx on public.vendas (cliente_id);

-- Sale items
create table if not exists public.itens_venda (
  id uuid primary key default gen_random_uuid(),
  venda_id uuid not null references public.vendas(id) on delete cascade,
  produto_id uuid not null references public.produtos(id) on delete restrict,
  quantidade integer not null,
  preco_unitario numeric(12,2) not null,
  desconto_item numeric(12,2),
  subtotal numeric(12,2),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists itens_venda_venda_idx on public.itens_venda (venda_id);
create index if not exists itens_venda_produto_idx on public.itens_venda (produto_id);

-- Inventory movements
create table if not exists public.movimentacoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  produto_id uuid not null references public.produtos(id) on delete restrict,
  tipo text not null,
  motivo text not null,
  quantidade integer not null,
  preco_unitario numeric(12,2),
  valor_total numeric(12,2),
  responsavel text not null,
  fornecedor text,
  cliente text,
  documento text,
  status text,
  observacao text,
  data_movimentacao timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

create index if not exists movimentacoes_usuario_idx on public.movimentacoes (usuario_id);
create index if not exists movimentacoes_produto_idx on public.movimentacoes (produto_id);

-- Configurations per tenant
create table if not exists public.configuracoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  nome_estabelecimento text,
  email_contato text,
  telefone text,
  endereco text,
  estoque_minimo_padrao integer,
  alerta_estoque_critico integer,
  notificacao_estoque_baixo boolean,
  notificacao_email boolean,
  notificacao_push boolean,
  backup_automatico boolean,
  frequencia_backup text,
  moeda text,
  formato_data text,
  inscricao_estadual text,
  regime_tributario text,
  dias_relatorio_padrao integer,
  logo_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz,
  constraint configuracoes_usuario_unique unique (usuario_id)
);

-- Restaurant orders (comandas)
create table if not exists public.comandas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  mesa_id uuid not null references public.mesas(id) on delete restrict,
  numero_comanda text not null,
  status text,
  subtotal numeric(12,2),
  desconto numeric(12,2),
  total numeric(12,2),
  forma_pagamento text,
  cliente_nome text,
  cliente_telefone text,
  observacoes text,
  data_abertura timestamptz,
  data_fechamento timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz
);

create unique index if not exists comandas_usuario_numero_idx on public.comandas (usuario_id, numero_comanda);
create index if not exists comandas_mesa_idx on public.comandas (mesa_id);

-- Items inside comandas
create table if not exists public.itens_comanda (
  id uuid primary key default gen_random_uuid(),
  comanda_id uuid not null references public.comandas(id) on delete cascade,
  produto_id uuid not null references public.produtos(id) on delete restrict,
  quantidade integer not null,
  preco_unitario numeric(12,2) not null,
  desconto_item numeric(12,2),
  subtotal numeric(12,2),
  observacoes text,
  data_pedido timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists itens_comanda_comanda_idx on public.itens_comanda (comanda_id);
create index if not exists itens_comanda_produto_idx on public.itens_comanda (produto_id);

-- Audit timestamps triggers can be added via Supabase if desired
