# Documentação Técnica para Integração Supabase - NexPrint

Este documento serve como guia para o desenvolvedor (ou IA) que irá implementar o Supabase neste projeto.

## 🚀 Estado Atual do Projeto
O NexPrint é um sistema de gerenciamento e impressão de crachás profissionais em cartões de PVC usando a impressora **Sigma DS3**.

### Stack Principal:
- **Framework**: Next.js 14 (App Router)
- **Estilização**: Tailwind CSS + Framer Motion (Design Premium)
- **Canvas**: Fabric.js v6 (Manipulação das artes dos crachás)
- **Banco de Dados**: Prisma ORM (Atualmente configurado para SQLite/Postgres)
- **Hardware**: Integração direta com SDK Sigma DS3 via PowerShell/API local.

---

## 🛠️ Onde o Supabase deve ser "Plugado"

### 1. Banco de Dados (Postgres)
O projeto já usa Prisma. Para migrar para o Supabase:
1. Pegue a Connection String no painel do Supabase.
2. Atualize a `DATABASE_URL` no arquivo `.env`.
3. Rode `npx prisma db push` para criar as tabelas no Supabase.
*Dica: Não é necessário abandonar o Prisma, ele funciona perfeitamente com Supabase.*

### 2. Autenticação (Supabase Auth)
Hoje o sistema tem uma estrutura básica de Admin. Recomenda-se:
- Implementar `@supabase/auth-helpers-nextjs` para proteger as rotas `/admin/*`.
- Configurar RLS (Row Level Security) nas tabelas de `Order` e `Template`.

### 3. Armazenamento de Fotos (Supabase Storage)
Atualmente, as fotos são salvas em `/public/uploads`.
- **Tarefa**: Criar um bucket chamado `badge-photos`.
- **Ação**: No componente `PedidoForm.tsx`, alterar o upload para usar `supabase.storage.from('badge-photos').upload()`.
- O `photoUrl` no banco deve apontar para a URL pública do Supabase.

---

## ⚠️ Lógicas Críticas (NÃO ALTERAR SEM REVISÃO)

### Motor de Impressão (`BadgeCanvas.tsx`)
- **Auto-Shrink**: Existe uma lógica dinâmica que reduz o tamanho da fonte se o nome do participante ultrapassar 85% da largura do crachá. Isso evita erros de impressão física.
- **DPI**: O canvas é renderizado em 1011x638 para garantir 300/600 DPI na Sigma DS3.

### Fluxo de Impressão (`OrdersTableClient.tsx`)
- Ao clicar em "Imprimir", o status do pedido muda automaticamente para `PRINTING` ("Em Produção").
- Existe um **Modal de Preview** antes de enviar para a impressora. O envio final acontece via `/api/printer/control`.

### Hardware (`app/api/printer/control/route.ts`)
- Este endpoint "conversa" com a impressora Sigma DS3. Ele espera um JSON com `action: "printBatch"`, `value: [base64_images]` e `settings: { highDPI: boolean, monochrome: boolean }`.

---

## 📋 Próximos Passos Sugeridos
1. Configurar as variáveis de ambiente do Supabase (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
2. Migrar o `schema.prisma` para o Postgres do Supabase.
3. Implementar o Dashboard em tempo real usando `supabase.channel('orders')` para monitorar novos pedidos.

---
*Documento gerado para auxiliar a transição técnica de backend.*
