import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Listar eventos
  const events = await prisma.event.findMany();
  console.log("=== EVENTOS ===");
  console.log(JSON.stringify(events, null, 2));

  // 2. Listar templates
  const templates = await prisma.badgeTemplate.findMany({ select: { id: true, name: true, eventId: true, isActive: true, basePrice: true } });
  console.log("\n=== TEMPLATES ===");
  console.log(JSON.stringify(templates, null, 2));

  // 3. Tentar simular o que o TemplateForm faz
  if (templates.length > 0) {
    const t = templates[0];
    console.log(`\n=== TESTANDO UPDATE no template ${t.id} ===`);
    try {
      await prisma.badgeTemplate.update({
        where: { id: t.id },
        data: {
          name: t.name,
          basePrice: 7.0,
          items: {
            deleteMany: {},
          }
        },
      });
      console.log("UPDATE OK!");
    } catch (err) {
      console.error("UPDATE FALHOU:", err.message);
    }
  }

  // 4. Tentar criar um novo template
  console.log("\n=== TESTANDO CREATE ===");
  try {
    let event = events[0];
    if (!event) {
      event = await prisma.event.create({
        data: { name: "Congresso Teste", slug: "congresso-teste", active: true }
      });
      console.log("Evento criado:", event.id);
    }
    
    const newT = await prisma.badgeTemplate.create({
      data: {
        name: "Teste Save",
        bgImageUrl: "https://example.com/test.jpg",
        configJson: "{}",
        basePrice: 5.0,
        eventId: event.id,
        isActive: true,
      }
    });
    console.log("CREATE OK! ID:", newT.id);
    
    // Apagar pra não sujar
    await prisma.badgeTemplate.delete({ where: { id: newT.id } });
    console.log("Cleanup OK");
  } catch (err) {
    console.error("CREATE FALHOU:", err.message);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
