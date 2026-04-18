"use server";
// v2: Adicionado Zod para validação dos dados dos itens
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";
import { badgeItemSchema } from "@/lib/validators";

export async function createBadgeItem(formData: FormData) {
  try {
    // ── Validação de dados ─────────────────────────────────────────────────
    const raw = {
      name: formData.get("name"),
      description: formData.get("description") || null,
      price: parseFloat((formData.get("price") as string || "0").replace(",", ".")),
      stock: parseInt(formData.get("stock") as string || "0"),
    };

    const parsed = badgeItemSchema.pick({ name: true, description: true, price: true, stock: true }).safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Dados inválidos.";
      return { success: false, error: msg };
    }

    // ── Upload de imagem ───────────────────────────────────────────────────
    let imageUrl = null;
    const file = formData.get("image") as File;
    const customUrl = formData.get("customUrl") as string;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const publicPath = join(process.cwd(), "public", "uploads", "items");
      const filePath = join(publicPath, fileName);

      try {
        await writeFile(filePath, buffer);
        imageUrl = `/uploads/items/${fileName}`;
      } catch (err) {
        console.error("Erro ao salvar arquivo, pasta pode não existir. Salvando sem imagem", err);
      }
    } else if (customUrl) {
      imageUrl = customUrl;
    }

    await prisma.badgeItem.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        price: parsed.data.price,
        stock: parsed.data.stock,
        imageUrl,
      },
    });

    revalidatePath("/admin/itens");
    return { success: true };
  } catch (error) {
    console.error("Error creating item:", error);
    return { success: false, error: "Falha ao criar item" };
  }
}

export async function updateBadgeItem(id: string, formData: FormData) {
  try {
    // ── Validação de dados ─────────────────────────────────────────────────
    const raw = {
      name: formData.get("name"),
      description: formData.get("description") || null,
      price: parseFloat((formData.get("price") as string || "0").replace(",", ".")),
      stock: parseInt(formData.get("stock") as string || "0"),
    };

    const parsed = badgeItemSchema.pick({ name: true, description: true, price: true, stock: true }).safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Dados inválidos.";
      return { success: false, error: msg };
    }

    let updateData: any = {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      price: parsed.data.price,
      stock: parsed.data.stock,
    };

    const file = formData.get("image") as File;
    const customUrl = formData.get("customUrl") as string;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(process.cwd(), "public", "uploads", "items", fileName);

      try {
        await writeFile(filePath, buffer);
        updateData.imageUrl = `/uploads/items/${fileName}`;
      } catch (err) {
        console.error("Erro ao salvar arquivo", err);
      }
    } else if (customUrl) {
      updateData.imageUrl = customUrl;
    }

    await prisma.badgeItem.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/itens");
    return { success: true };
  } catch (error) {
    console.error("Error updating item:", error);
    return { success: false, error: "Falha ao atualizar item" };
  }
}

export async function deleteBadgeItem(id: string) {
  try {
    if (!id || typeof id !== "string" || id.length < 1) {
      return { success: false, error: "ID inválido." };
    }

    const count = await prisma.orderItem.count({
      where: { itemId: id },
    });

    if (count > 0) {
      return {
        success: false,
        error: "Este item não pode ser excluído pois já está associado a pedidos.",
      };
    }

    await prisma.badgeItem.delete({
      where: { id },
    });

    revalidatePath("/admin/itens");
    return { success: true };
  } catch (error) {
    console.error("Error deleting item:", error);
    return { success: false, error: "Falha ao excluir item" };
  }
}
