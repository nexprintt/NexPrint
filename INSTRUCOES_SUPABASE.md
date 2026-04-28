# 📘 Guia Definitivo de Integração Supabase - NexPrint

Este é o manual completo, linha por linha, para a transição do banco local/Prisma para o **Supabase**. Todas as variáveis, comandos, arquivos exatos e blocos de código necessários estão detalhados aqui. O projeto atual está 100% estável e pronto para receber essas mudanças sem quebrar as lógicas críticas de negócio e hardware.

---

## 1. ⚙️ Variáveis de Ambiente (Setup Inicial)

Adicione as seguintes variáveis no seu arquivo `.env`:

```env
# Mantenha o Prisma, apenas mude a URL para o seu Postgres do Supabase
DATABASE_URL="postgres://postgres.[SUA-REFERENCIA]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.[SUA-REFERENCIA]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

# Variáveis do Cliente Supabase (para Auth e Storage no Frontend)
NEXT_PUBLIC_SUPABASE_URL="https://[SUA-REFERENCIA].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG..."
```

---

## 2. 🗄️ Banco de Dados e Prisma

O sistema já está todo modelado usando **Prisma**. Você **não precisa** reescrever as Server Actions (`app/admin/pedidos/actions.ts`), pois elas continuarão funcionando através do Prisma conectado ao Supabase.

**Ações Necessárias:**
1. No arquivo `prisma/schema.prisma`, altere o provider:
```prisma
datasource db {
  provider  = "postgresql" // Mude de "sqlite" para "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```
2. Delete a pasta `prisma/migrations` (já que estamos mudando de SQLite para Postgres).
3. Rode o comando no terminal para criar o banco no Supabase:
```bash
npx prisma db push
```

---

## 3. 📸 Migração do Upload de Fotos (Storage)

Atualmente, o arquivo `components/client/PedidoForm.tsx` lê a foto do usuário e a converte para Base64 (linha ~109). Isso não é sustentável em escala.

**O que fazer:**
1. Crie um bucket público no painel do Supabase chamado `badge-photos`.
2. Instale o SDK do Supabase: `npm install @supabase/supabase-js`.
3. Crie um arquivo `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

4. No arquivo `components/client/PedidoForm.tsx`, substitua a função `handlePhotoUpload` atual por esta:
```typescript
import { supabase } from "@/lib/supabase";

const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Mostra um loader visual se quiser...
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('badge-photos')
    .upload(filePath, file);

  if (error) {
    console.error("Erro no upload:", error);
    return;
  }

  // Pega a URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('badge-photos')
    .getPublicUrl(filePath);

  // Atualiza o estado do formulário com a URL final
  handleUpdate({ photoUrl: publicUrl });
};
```

---

## 4. 🔐 Autenticação (Admin Auth)

Hoje a rota `/admin` não tem um Auth robusto bloqueando acesso.

**Ação:**
Implemente o `@supabase/ssr` (ou `@supabase/auth-helpers-nextjs`).
1. Crie um `middleware.ts` na raiz do projeto.
2. Use o `createMiddlewareClient` para checar se existe sessão ativa e verificar se o `user.id` corresponde a um admin.
3. Se não houver sessão, faça redirect para `/login`.

---

## 5. ⚠️ AVISOS CRÍTICOS - NÃO TOQUE NESTAS LÓGICAS ⚠️

Para garantir que a comunicação com a impressora **Sigma DS3** e o layout físico dos crachás não quebrem, **PRESERVE RIGOROSAMENTE** as seguintes partes:

### A. Auto-Shrink e Cálculos do Canvas (`components/canvas/BadgeCanvas.tsx`)
As funções que calculam a redução da fonte baseada em `displayWidth * 0.85` e a proporção de 1011x638 (`BASE_WIDTH`/`BASE_HEIGHT`) são matematicamente essenciais para que o crachá físico saia legível e na sangria correta.

### B. Hardware API (`app/api/printer/control/route.ts`)
Este arquivo é uma ponte para um script de PowerShell que controla a Sigma DS3. Ele injeta configurações como `PrinterResolution` e margens absolutas. Não troque a rota ou o formato de payload esperado (`action`, `value`, `orientation`, `settings`).

### C. Fluxo "Auto Em Produção" (`components/admin/OrdersTableClient.tsx`)
O sistema atualmente muda o status para `PRINTING` (banco de dados) assim que o usuário clica em imprimir. Isso foi validado com o cliente. Mantenha essa chamada para a `bulkUpdateStatus` ou `updateOrderStatus` logo após o fetch para a `/api/printer/control`.

---

## 🚀 Resumo de Deploy
Se você seguir esses 4 passos (Setup Env, Prisma Postgres, Storage e Middleware de Auth), o sistema se tornará um SaaS pronto para produção, mantendo toda a complexidade de impressão intacta!
