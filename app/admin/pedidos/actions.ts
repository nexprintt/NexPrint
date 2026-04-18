"use server";
// v2: Adicionado Zod para validar status antes de gravar
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { orderStatusSchema, bulkOrderStatusSchema, deleteOrdersSchema } from "@/lib/validators";

/**
 * Atualiza qualquer campo de status do pedido (impressão ou pagamento)
 */
export async function updateOrderStatus(
  orderId: string,
  data: { status?: string; paymentStatus?: string }
) {
  // ── Validação simples do ID ────────────────────────────────────────────────
  if (!orderId || typeof orderId !== "string") {
    return { success: false, error: "ID de pedido inválido." };
  }

  // ── Validação dos status ───────────────────────────────────────────────────
  const parsed = orderStatusSchema.safeParse(data);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Dados inválidos.";
    return { success: false, error: msg };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: parsed.data,
    });

    revalidatePath("/admin/pedidos");
    return { success: true };
  } catch (error) {
    console.error("DEBUG - Erro ao atualizar pedido:", error);
    return { success: false, error: "Falha ao atualizar o banco de dados." };
  }
}

/**
 * Atualização em massa (Lote)
 */
export async function bulkUpdateStatus(orderIds: string[], status: string) {
  const parsed = bulkOrderStatusSchema.safeParse({ orderIds, status });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Dados inválidos.";
    return { success: false, error: msg };
  }

  try {
    await prisma.order.updateMany({
      where: { id: { in: parsed.data.orderIds } },
      data: { status: parsed.data.status },
    });

    revalidatePath("/admin/pedidos");
    return { success: true };
  } catch (error) {
    console.error("DEBUG - Erro em lote:", error);
    return { success: false };
  }
}

/**
 * Excluir pedidos (em lote ou único)
 */
export async function deleteOrders(orderIds: string[]) {
  const parsed = deleteOrdersSchema.safeParse({ orderIds });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || "Dados inválidos.";
    return { success: false, error: msg };
  }

  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: { in: parsed.data.orderIds } },
    });

    await prisma.order.deleteMany({
      where: { id: { in: parsed.data.orderIds } },
    });

    revalidatePath("/admin/pedidos");
    return { success: true };
  } catch (error) {
    console.error("DEBUG - Erro ao excluir lote:", error);
    return { success: false, error: "Falha ao excluir." };
  }
}
