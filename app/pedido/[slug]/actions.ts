"use server";
// v4: Adicionado Zod para validação de dados antes de tocar no banco
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { calculateShipping } from "@/lib/melhorEnvio";
import { createOrderSchema } from "@/lib/validators";

export async function calculateShippingAction(cep: string, subtotal: number) {
  return await calculateShipping(cep, subtotal);
}

export async function createOrder(data: unknown) {
  // ── 1. VALIDAÇÃO ZOD ──────────────────────────────────────────────────────
  const parsed = createOrderSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Dados inválidos no formulário.";
    return { success: false, error: firstError };
  }

  const validData = parsed.data;

  try {
    const groupId = `FML_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

    // ── 2. TRAVA ANTI-DUPLICIDADE ─────────────────────────────────────────────
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const firstMember = validData.members[0];

    const existingOrder = await prisma.order.findFirst({
      where: {
        eventId: validData.eventId,
        phone: validData.phone,
        clientName: firstMember.clientName,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingOrder) {
      // Se já existe um pedido idêntico recente, consideramos sucesso para permitir 
      // que o cliente veja o PIX novamente sem gerar erro de duplicidade.
      return {
        success: true,
        orderIds: [existingOrder.id],
        groupId: existingOrder.groupId,
        isExisting: true // Flag opcional para controle interno
      };
    }

    // ── 3. BUSCAR PREÇOS E TEMPLATE ───────────────────────────────────────────
    const template = await prisma.badgeTemplate.findUnique({
      where: { id: validData.badgeTemplateId },
      include: { 
        items: {
          include: {
            item: true
          }
        } 
      },
    });

    if (!template) {
      return { success: false, error: "Template de crachá não encontrado." };
    }

    const basePrice = template.basePrice || 0;
    const requiredItemIds = template.items.filter((ti) => ti.isRequired).map((ti) => ti.itemId);

    // ── 4. CRIAR PEDIDOS EM TRANSAÇÃO (Tudo ou Nada) ──────────────────────────
    const createdOrders = await prisma.$transaction(async (tx) => {
      const orders = [];
      
      for (const member of validData.members) {
        // Unir itens selecionados pelo cliente (opcionais) + itens obrigatórios (automáticos)
        const allItemIds = Array.from(new Set([...member.items, ...requiredItemIds]));

        // Buscar os preços reais dos itens para salvar no histórico
        const itemsWithPrices = allItemIds.map(id => {
          const templateItem = template.items.find(ti => ti.itemId === id);
          return {
            itemId: id,
            price: templateItem?.item?.price || 0
          };
        });

        const newOrder = await tx.order.create({
          data: {
            eventId: validData.eventId,
            badgeTemplateId: validData.badgeTemplateId,
            groupId: validData.members.length > 1 ? groupId : null,
            clientName: member.clientName,
            phone: validData.phone,
            congregation: member.congregation || "",
            photoUrl: member.photoUrl ?? null,
            customConfigJson: member.customConfigJson,
            isFromItabira: validData.isFromItabira,
            zipCode: validData.zipCode,
            address: validData.address,
            number: validData.number,
            complement: validData.complement,
            neighborhood: validData.neighborhood,
            city: validData.city,
            state: validData.state,
            shippingCost: validData.shippingCost,
            shippingService: validData.shippingService,
            paymentMethod: validData.paymentMethod,
            items: {
              create: itemsWithPrices.map((ip) => ({
                itemId: ip.itemId,
                priceAtTime: ip.price,
              })),
            },
            totalAmount: basePrice + itemsWithPrices
              .filter(ip => !requiredItemIds.includes(ip.itemId))
              .reduce((sum, item) => sum + item.price, 0),
          },
        });

        for (const itemId of allItemIds) {
          await tx.badgeItem.update({
            where: { id: itemId },
            data: { stock: { decrement: 1 } }
          });
        }
        orders.push(newOrder);
      }
      return orders;
    });

    revalidatePath(`/pedido/${validData.eventId}`);
    revalidatePath(`/admin/pedidos`);

    return {
      success: true,
      orderIds: createdOrders.map((o) => o.id),
      groupId: validData.members.length > 1 ? groupId : null,
    };
  } catch (error: any) {
    console.error("ERRO CRÍTICO LOTE:", error);
    return {
      success: false,
      error:
        "Ocorreu um problema técnico ao processar seu pedido. Por favor, tente novamente ou entre em contato se o erro persistir.",
    };
  }
}
