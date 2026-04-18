import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany({
    include: { templates: true }
  });
  
  console.log("=== DIAGNÓSTICO DE DADOS ===");
  if (events.length === 0) {
    console.log("NENHUM EVENTO ENCONTRADO NO BANCO!");
  }
  
  events.forEach(e => {
    console.log(`Evento: ${e.name} | Slug: ${e.slug}`);
    e.templates.forEach(t => {
      console.log(`  - Template: ${t.name} | Ativo: ${t.isActive}`);
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
