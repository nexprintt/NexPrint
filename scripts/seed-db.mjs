import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapterFactory = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter: adapterFactory });

async function main() {
  console.log("Seeding database...");

  // Criar Evento
  const event = await prisma.event.upsert({
    where: { slug: "congresso-2025" },
    update: {},
    create: {
      name: "Congresso Adoração Pura 2025",
      slug: "congresso-2025",
    },
  });

  // Criar Template Base
  await prisma.badgeTemplate.create({
    data: {
      eventId: event.id,
      name: "Modelo Padrão Oceano",
      bgImageUrl: "/templates/congresso-2025.png",
      isActive: true,
      configJson: JSON.stringify({
        namePos: { x: 505, y: 700, fontSize: 80, color: "#001B48" },
        congPos: { x: 505, y: 820, fontSize: 50, color: "#001B48" },
      }),
    },
  });

  // Criar Itens (Acessórios)
  await prisma.badgeItem.createMany({
    data: [
      { name: "Roller Clip (Ioiô) - Verde", price: 5.0, stock: 100 },
      { name: "Cordão Personalizado NexPrint", price: 12.0, stock: 50 },
      { name: "Suporte Rígido Transparente", price: 3.5, stock: 200 },
    ],
  });

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
