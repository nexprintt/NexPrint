import React from "react";
import prisma from "@/lib/prisma";
import PrintClient from "./PrintClient";
import { notFound } from "next/navigation";

export default async function ImprimirPedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      template: true,
      event: true
    }
  });
  
  if (!order) {
    return notFound();
  }
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <PrintClient order={order} />
    </div>
  );
}
