"use server";
// v4: Adicionado suporte a regras de exclusão (exclusiveWith)

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveTemplate(data: {
  id?: string;
  name: string;
  bgImageUrl: string;
  orientation: string;
  config: any;
  eventId?: string;
  basePrice: number;
   items: { id: string; isRequired: boolean; isHidden?: boolean; exclusiveWith?: string }[];
}) {
  try {
    const configJson = JSON.stringify(data.config);

    // --- 1. Resolver o Event ID ---
    let finalEventId = "";

    if (data.id) {
      // Editando: sempre busca o eventId original do banco
      const currentTemplate = await prisma.badgeTemplate.findUnique({
        where: { id: data.id },
        select: { eventId: true },
      });
      if (currentTemplate) {
        finalEventId = currentTemplate.eventId;
      }
    } else if (data.eventId) {
      // Criando com eventId fornecido: valida se existe
      const eventExists = await prisma.event
        .findUnique({ where: { id: data.eventId } })
        .catch(() => null);
      if (eventExists) {
        finalEventId = data.eventId;
      }
    }

    // Fallback: usa o primeiro evento disponível ou cria um padrão
    if (!finalEventId) {
      let defaultEvent = await prisma.event.findFirst();
      if (!defaultEvent) {
        defaultEvent = await prisma.event.create({
          data: {
            name: "Congresso Principal",
            slug: "congresso-principal",
            active: true,
          },
        });
      }
      finalEventId = defaultEvent.id;
    }

    // --- 2. Validar items (filtrar IDs inválidos que não existem no banco) ---
    let validItems: { id: string; isRequired: boolean; isHidden: boolean; exclusiveWith?: string }[] = [];
    if (data.items && data.items.length > 0) {
      const existingItems = await prisma.badgeItem.findMany({
        where: { id: { in: data.items.map((i) => i.id) } },
        select: { id: true },
      });
      const validIds = new Set(existingItems.map((i) => i.id));
      validItems = data.items.filter((i) => validIds.has(i.id)).map(i => ({...i, isHidden: !!i.isHidden}));
      console.log(
        `[saveTemplate] Itens solicitados: ${data.items.length}, válidos: ${validItems.length}`,
        validItems.map((i) => `${i.id}(required:${i.isRequired})`)
      );
    }

    // --- 3. Salvar em transação atômica ---
    if (data.id) {
      await prisma.$transaction(async (tx) => {
        // Atualiza dados do template
        await tx.badgeTemplate.update({
          where: { id: data.id },
          data: {
            name: data.name,
            bgImageUrl: data.bgImageUrl,
            configJson,
            basePrice: data.basePrice,
          },
        });

        // Remove todos os TemplateItems antigos
        await tx.templateItem.deleteMany({
          where: { templateId: data.id },
        });

        // Recria com a lista atualizada
        if (validItems.length > 0) {
          for (const item of validItems) {
            await tx.templateItem.create({
              data: {
                templateId: data.id as string,
                itemId: item.id,
                isRequired: item.isRequired,
                isHidden: item.isHidden,
                exclusiveWith: item.exclusiveWith,
              }
            });
          }
        }
      });

      console.log(
        `[saveTemplate] Template ${data.id} atualizado com ${validItems.length} itens.`
      );
    } else {
      await prisma.$transaction(async (tx) => {
        const newTemplate = await tx.badgeTemplate.create({
          data: {
            name: data.name,
            bgImageUrl: data.bgImageUrl,
            configJson,
            basePrice: data.basePrice,
            eventId: finalEventId,
            isActive: true,
          },
        });

        if (validItems.length > 0) {
          for (const item of validItems) {
            await tx.templateItem.create({
              data: {
                templateId: newTemplate.id,
                itemId: item.id,
                isRequired: item.isRequired,
                isHidden: item.isHidden,
                exclusiveWith: item.exclusiveWith,
              }
            });
          }
        }

        console.log(
          `[saveTemplate] Template ${newTemplate.id} criado com ${validItems.length} itens.`
        );
      });
    }

    revalidatePath("/admin/templates");
    revalidatePath("/pedido/[slug]", "page");
    return { success: true };
  } catch (error: any) {
    console.error("CRITICAL SAVE TEMPLATE ERROR:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    const msg = error?.message || "Erro desconhecido";
    return { success: false, error: `Falha ao salvar: ${msg.substring(0, 200)}` };
  }
}

export async function deleteTemplate(id: string) {
  try {
    const ordersCount = await prisma.order.count({
      where: { badgeTemplateId: id },
    });

    if (ordersCount > 0) {
      await prisma.badgeTemplate.update({
        where: { id },
        data: { isActive: false },
      });
      revalidatePath("/admin/templates");
      revalidatePath("/pedido/[slug]", "page");
      return { success: true, archived: true };
    } else {
      await prisma.badgeTemplate.delete({ where: { id } });
      revalidatePath("/admin/templates");
      revalidatePath("/pedido/[slug]", "page");
      return { success: true, archived: false };
    }
  } catch (error) {
    console.error("Delete Template Error:", error);
    return { success: false, error: "Falha ao excluir o template." };
  }
}

export async function toggleTemplateStatus(id: string, currentStatus: boolean) {
  try {
    const updated = await prisma.badgeTemplate.update({
      where: { id },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/admin/templates");
    revalidatePath("/pedido/[slug]", "page");
    return { success: true, isActive: updated.isActive };
  } catch (error) {
    console.error("Toggle Status Error:", error);
    return { success: false, error: "Falha ao alterar o status do template." };
  }
}
