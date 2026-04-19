import React from "react";
import LandingHero from "@/components/client/LandingHero";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Busca todos os eventos ativos no banco de dados
  const events = await prisma.event.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" }
  });

  return <LandingHero events={events} />;
}
