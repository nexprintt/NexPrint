-- 🔒 Políticas de Segurança (RLS) para o Supabase Storage
-- Copie e cole este código no "SQL Editor" do painel do seu Supabase e clique em RUN.

-- 1. Habilitar RLS na tabela de objetos do Storage (se ainda não estiver)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Política para permitir UPLOAD (Insert)
-- Permite uploads APENAS no bucket 'badges'
-- Permite APENAS imagens (image/jpeg, image/png, image/webp)
-- Limita o tamanho do arquivo para menos de 5MB (5242880 bytes)
DROP POLICY IF EXISTS "Permitir upload público restrito no badges" ON storage.objects;
CREATE POLICY "Permitir upload público restrito no badges" 
ON storage.objects FOR INSERT 
TO public 
WITH CHECK (
    bucket_id = 'badges' 
    AND (auth.role() = 'anon' OR auth.role() = 'authenticated')
    AND (storage.extension(name) = 'jpg' OR storage.extension(name) = 'png' OR storage.extension(name) = 'jpeg' OR storage.extension(name) = 'webp')
    AND (length(COALESCE(metadata->>'size', '0'))::int < 5242880)
);

-- 3. Política para permitir LEITURA (Select)
-- Permite que qualquer um veja as fotos (necessário para o site mostrar a foto)
DROP POLICY IF EXISTS "Permitir leitura pública no badges" ON storage.objects;
CREATE POLICY "Permitir leitura pública no badges" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'badges');

-- 4. Política para DELETAR/ATUALIZAR (Somente Admin)
-- Ninguém de fora pode deletar ou substituir arquivos, apenas usuários autenticados (Admin)
DROP POLICY IF EXISTS "Permitir delete/update apenas para admin" ON storage.objects;
CREATE POLICY "Permitir delete/update apenas para admin" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'badges');

CREATE POLICY "Permitir delete apenas para admin" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'badges');
