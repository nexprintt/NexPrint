import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../prisma/dev.db");

console.log(`Using DB at: ${dbPath}`);

// O construtor correto para PrismaBetterSqlite3 no Prisma 7 espera um objeto com 'url'
const adapter = new PrismaBetterSqlite3({ 
  url: `file:${dbPath}` 
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding mock data...");

  // Limpar dados existentes
  try {
    await prisma.templateItem.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.badgeTemplate.deleteMany();
    await prisma.badgeItem.deleteMany();
    await prisma.event.deleteMany();
  } catch (e) {
    console.log("Cleaning failed (probably no tables yet):", e.message);
  }

  // 1. Criar Evento
  const event = await prisma.event.upsert({
    where: { slug: "congresso-2025" },
    update: {},
    create: {
      name: "Congresso Adoração Pura 2025",
      slug: "congresso-2025",
    },
  });

  // 2. Criar Template Base
  const template = await prisma.badgeTemplate.create({
    data: {
      eventId: event.id,
      name: "Modelo Padrão Oceano",
      bgImageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop",
      isActive: true,
      configJson: JSON.stringify({
        namePos: { x: 505, y: 450, fontSize: 80, color: "#001B48" },
        congPos: { x: 505, y: 550, fontSize: 50, color: "#001B48" },
      }),
      basePrice: 15.0,
    },
  });

  // 3. Criar Itens (Acessórios)
  const item1 = await prisma.badgeItem.create({
    data: { name: "Roller Clip (Ioiô) - Verde", price: 5.0, stock: 100, description: "Presilha retrátil para crachá" },
  });
  
  const item2 = await prisma.badgeItem.create({
    data: { name: "Cordão Personalizado NexPrint", price: 12.0, stock: 50, description: "Cordão de alta qualidade" },
  });

  // 4. Vincular itens ao template
  await prisma.templateItem.create({
    data: {
      templateId: template.id,
      itemId: item1.id,
      isRequired: false,
    },
  });

  await prisma.templateItem.create({
    data: {
      templateId: template.id,
      itemId: item2.id,
      isRequired: false,
    },
  });

  // 5. Criar alguns pedidos mock
  await prisma.order.create({
    data: {
      eventId: event.id,
      badgeTemplateId: template.id,
      clientName: "João Silva",
      phone: "11999998888",
      congregation: "Vila Mariana",
      status: "PENDING",
      totalAmount: 20.0,
      paymentMethod: "PIX",
      paymentStatus: "PAID",
      city: "São Paulo",
      state: "SP",
    }
  });

  console.log("Mock seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
