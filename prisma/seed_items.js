const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const path = require('path');

async function main() {
  const dbPath = path.resolve(__dirname, 'dev.db');
  const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
  const prisma = new PrismaClient({ adapter });

  console.log('🌱 Semeando dados do NexPrint...');

  // 1. Criar Evento padrão
  const event = await prisma.event.upsert({
    where: { slug: 'congresso-2025' },
    update: {},
    create: {
      name: 'Congresso 2025',
      slug: 'congresso-2025',
      active: true,
    }
  });
  console.log(`✅ Evento: ${event.name} (${event.id})`);

  // 2. Criar Itens de Acessório
  const clip = await prisma.badgeItem.upsert({
    where: { id: 'clip' },
    update: { name: 'Roller Clip (Ioiô)', description: 'Clipe retrátil para pendurar o crachá na roupa.', price: 5.0, stock: 100 },
    create: {
      id: 'clip',
      name: 'Roller Clip (Ioiô)',
      description: 'Clipe retrátil para pendurar o crachá na roupa.',
      price: 5.0,
      stock: 100
    }
  });

  const cord = await prisma.badgeItem.upsert({
    where: { id: 'cord' },
    update: { name: 'Cordão Personalizado', description: 'Cordão para usar o crachá pendurado no pescoço.', price: 10.0, stock: 100 },
    create: {
      id: 'cord',
      name: 'Cordão Personalizado',
      description: 'Cordão para usar o crachá pendurado no pescoço.',
      price: 10.0,
      stock: 100
    }
  });

  const ima = await prisma.badgeItem.upsert({
    where: { id: 'ima' },
    update: { name: 'Imã para Crachá PVC', description: 'Fica no verso do crachá para fixar na roupa sem furar.', price: 3.5, stock: 100 },
    create: {
      id: 'ima',
      name: 'Imã para Crachá PVC',
      description: 'Fica no verso do crachá para fixar na roupa sem furar.',
      price: 3.5,
      stock: 100
    }
  });

  const jacare = await prisma.badgeItem.upsert({
    where: { id: 'jacare' },
    update: { name: 'Jacarezinho (Presilha)', description: 'Presilha tipo jacaré para prender o crachá no bolso.', price: 1.5, stock: 100 },
    create: {
      id: 'jacare',
      name: 'Jacarezinho (Presilha)',
      description: 'Presilha tipo jacaré para prender o crachá no bolso.',
      price: 1.5,
      stock: 100
    }
  });

  console.log(`✅ Itens: ${clip.name}, ${cord.name}, ${ima.name}, ${jacare.name}`);

  console.log('\n🎉 Seed completo! Todos os dados foram restaurados.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
