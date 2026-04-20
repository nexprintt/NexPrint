const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany({
    where: { active: true },
    include: {
      templates: true
    }
  });
  
  console.log("Active events:");
  events.forEach(e => {
    console.log(`- ${e.name} (ID: ${e.id}, Slug: ${e.slug})`);
    console.log(`  Templates: ${e.templates.length}`);
    e.templates.forEach(t => {
      console.log(`    - ${t.name} (Active: ${t.isActive})`);
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
