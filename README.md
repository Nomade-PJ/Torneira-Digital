# 🍺 Torneira Digital - Sistema PDV & ERP

Sistema completo de **Ponto de Venda (PDV)** e **ERP** para bares, restaurantes e estabelecimentos comerciais.

![Status](https://img.shields.io/badge/Status-Ativo-green) ![Versão](https://img.shields.io/badge/Versão-1.0.0-blue) ![React](https://img.shields.io/badge/React-18+-blue) ![Vite](https://img.shields.io/badge/Vite-5+-purple)

## 🎯 **Funcionalidades Principais**

### 🛒 **PDV - Ponto de Venda**
- **Vendas Diretas:** Balcão rápido com impressão automática
- **Controle de Mesas:** Gestão visual (Livre/Ocupada/Reservada)  
- **Sistema de Comandas:** Números personalizáveis, dados do cliente
- **Múltiplas Formas de Pagamento:** Dinheiro, Cartão, PIX
- **Sistema de Descontos:** Flexível para vendas e comandas

### 📦 **Gestão de Estoque**
- **Catálogo Completo:** Produtos, preços, categorias
- **Controle de Estoque:** Atual, mínimo, crítico, baixo
- **Códigos de Barras:** Scanner integrado
- **Alertas Inteligentes:** Estoque baixo/crítico

### 📊 **Relatórios e Analytics**
- **KPIs Principais:** Receita, produtos vendidos, ticket médio
- **Gráficos Avançados:** Vendas por mês, top produtos
- **Exportação PDF:** Relatórios profissionais

## 🚀 **Instalação**

```bash
git clone https://github.com/Nomade-PJ/Torneira-Digital-Es-Vercel.git
cd Torneira-Digital-Es-Vercel
npm install
```

### 🔧 **Configuração de Ambiente**
1. Configure as variáveis de ambiente no Vercel:
   - `VITE_SUPABASE_URL=
   - `VITE_SUPABASE_ANON_KEY=[sua_chave_anon]`

2. Para desenvolvimento local:
```bash
# Crie um arquivo .env.local com:
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

npm run dev
```

## 🚀 **Deploy na Vercel**

1. **Conectar Repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório `Nomade-PJ/Torneira-Digital-Es-Vercel`

2. **Configurar Variáveis de Ambiente:**
   ```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   ```

3. **Deploy Automático:** O projeto está configurado com `vercel.json` para deploy automático!

## 🛠️ **Tecnologias**

- ⚛️ **React 18** - Biblioteca JavaScript
- ⚡ **Vite 5** - Build tool moderna
- 🗄️ **Supabase** - Backend completo
- 🎨 **Tailwind CSS** - Estilização  
- 📊 **Recharts** - Gráficos
- 🔐 **RLS** - Segurança de dados
- 📱 **Radix UI** - Componentes acessíveis

## 📱 **Recursos Avançados**

- 🖨️ **Impressão Térmica** automática
- 📊 **Exportação PDF** profissional
- 🔍 **Scanner** de códigos integrado
- ⚡ **Performance** otimizada
- 📱 **Multiplataforma** (Web/Desktop/Mobile)

---

**Transforme seu estabelecimento hoje mesmo!** 🚀
