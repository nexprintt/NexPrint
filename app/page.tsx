import React from "react";
import LandingHero from "@/components/client/LandingHero";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Busca o primeiro evento ativo (ou o principal, ex: Congresso) e seus templates
  const event = await prisma.event.findFirst({
    where: { 
      active: true,
      templates: {
        some: { isActive: true }
      }
    },
    orderBy: { createdAt: "desc" },
    include: {
      templates: {
        where: { isActive: true },
        include: {
          items: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });

  return <LandingHero event={event} />;
}
