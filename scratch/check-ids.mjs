import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany();
  console.log("Events IDs:", JSON.stringify(events.map(e => ({ name: e.name, id: e.id })), null, 2));

  const templates = await prisma.badgeTemplate.findMany();
  console.log("Templates IDs:", JSON.stringify(templates.map(t => ({ name: t.name, id: t.id })), null, 2));

  const items = await prisma.badgeItem.findMany();
  console.log("BadgeItems IDs:", JSON.stringify(items.map(i => ({ name: i.name, id: i.id })), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
