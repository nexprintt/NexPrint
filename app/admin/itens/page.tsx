import React from "react";
import prisma from "@/lib/prisma";
import ItemManagerClient from "@/components/admin/ItemManagerClient";

export default async function ItensPage() {
  const itens = await prisma.badgeItem.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <ItemManagerClient initialItens={itens} />
    </div>
  );
}
