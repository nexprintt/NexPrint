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
      return {
        success: false,
        error:
          "Detectamos um pedido idêntico enviado recentemente. Por favor, aguarde alguns minutos ou verifique se já recebeu a confirmação.",
      };
    }

    // ── 3. BUSCAR PREÇOS E TEMPLATE ───────────────────────────────────────────
    const template = await prisma.badgeTemplate.findUnique({
      where: { id: validData.badgeTemplateId },
      include: { items: true },
    });

    if (!template) {
      return { success: false, error: "Template de crachá não encontrado." };
    }

    const basePrice = template.basePrice || 0;
    const requiredItemIds = new Set(
      template.items.filter((ti) => ti.isRequired).map((ti) => ti.itemId)
    );

    // ── 4. CRIAR PEDIDOS EM TRANSAÇÃO (Tudo ou Nada) ──────────────────────────
    const createdOrders = await prisma.$transaction(
      validData.members.map((member) => {
        return prisma.order.create({
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
              create: member.items.map((itemId) => ({
                itemId: itemId,
                priceAtTime: requiredItemIds.has(itemId) ? 0 : 0,
              })),
            },
            totalAmount: basePrice,
          },
        });
      })
    );

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
