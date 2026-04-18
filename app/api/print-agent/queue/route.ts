import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const queue = await prisma.order.findMany({
      where: { status: "APPROVED" },
      include: {
        template: true,
        event: true,
        items: { include: { item: true } }
      },
      orderBy: { createdAt: "asc" }
    });

    return NextResponse.json({ success: true, count: queue.length, orders: queue });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// Endpoint para o agente confirmar que imprimiu
export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    
    // Obter Itens do pedido antes de atualizar
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (order && order.status !== "PRINTED") {
      // 1. Deduzir o Crachá Base (Automático)
      // Procuramos por um item que se chame exatamente "Crachá" ou "Cracha" (Case Insensitive)
      const baseBadgeItem = await prisma.badgeItem.findFirst({
        where: {
          OR: [
            { name: { equals: "Crachá" } },
            { name: { equals: "Cracha" } },
            { name: { equals: "cracha" } },
            { name: { equals: "CRACHÁ" } },
          ]
        }
      });

      if (baseBadgeItem && baseBadgeItem.stock > 0) {
        await prisma.badgeItem.update({
          where: { id: baseBadgeItem.id },
          data: { stock: { decrement: 1 } }
        });
      }

      // 2. Deduzir acessórios extras vinculados ao pedido
      for (const item of order.items) {
        if (item.itemId) {
          await prisma.badgeItem.update({
            where: { id: item.itemId },
            data: { stock: { decrement: item.quantity || 1 } }
          });
        }
      }
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PRINTED" }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Falha ao atualizar status" }, { status: 400 });
  }
}
