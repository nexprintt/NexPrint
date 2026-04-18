/**
 * lib/validators.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Schemas Zod centralizados para todas as Server Actions do NexPrint.
 * Garante que dados maliciosos ou mal-formatados sejam rejeitados ANTES
 * de chegarem ao banco de dados.
 */
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT — createOrder
// ─────────────────────────────────────────────────────────────────────────────

export const memberSchema = z.object({
  clientName: z
    .string()
    .min(3, "Nome precisa ter pelo menos 3 caracteres.")
    .max(100, "Nome muito longo."),
  congregation: z
    .string()
    .max(100, "Nome da congregação muito longo.")
    .optional()
    .default(""),
  photoUrl: z.string().url().nullable().optional(),
  items: z.array(z.string().min(1)).default([]),
  customConfigJson: z.string().optional(),
});

export const createOrderSchema = z.object({
  eventId: z.string().min(1, "ID de evento inválido."),
  badgeTemplateId: z.string().min(1, "ID de template inválido."),

  // Contato
  phone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone inválido. Use o formato (XX) XXXXX-XXXX."
    ),

  // Lote de membros
  members: z
    .array(memberSchema)
    .min(1, "Precisa ter pelo menos 1 membro.")
    .max(10, "Limite de 10 crachás por pedido."),

  // Entrega
  isFromItabira: z.boolean().optional().default(true),
  zipCode: z.string().max(9).optional(),
  address: z.string().max(200).optional(),
  number: z.string().max(20).optional(),
  complement: z.string().max(100).optional(),
  neighborhood: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(2).optional(),
  shippingCost: z.number().min(0).max(500).optional().default(0),
  shippingService: z.string().max(100).optional(),

  // Pagamento
  paymentMethod: z.enum(["PIX", "CASH"]).optional().default("CASH"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — Badge Items
// ─────────────────────────────────────────────────────────────────────────────

export const badgeItemSchema = z.object({
  name: z
    .string()
    .min(3, "Nome precisa ter pelo menos 3 caracteres.")
    .max(100, "Nome muito longo."),
  description: z.string().max(500).optional().nullable(),
  price: z
    .number()
    .min(0, "Preço não pode ser negativo.")
    .max(9999, "Preço muito alto (máximo R$9.999)."),
  stock: z
    .number()
    .int("Estoque precisa ser um número inteiro.")
    .min(0, "Estoque não pode ser negativo.")
    .max(100000),
  imageUrl: z.string().url().nullable().optional(),
});

export type BadgeItemInput = z.infer<typeof badgeItemSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — Order Status
// ─────────────────────────────────────────────────────────────────────────────

const ORDER_STATUSES = ["PENDING", "APPROVED", "PRINTED", "DELIVERED", "CANCELLED"] as const;
const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;

export const orderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  paymentStatus: z.enum(PAYMENT_STATUSES).optional(),
}).refine(
  (data) => data.status !== undefined || data.paymentStatus !== undefined,
  { message: "Precisa atualizar pelo menos um campo (status ou paymentStatus)." }
);

export const bulkOrderStatusSchema = z.object({
  orderIds: z.array(z.string().min(1)).min(1, "Selecione pelo menos 1 pedido.").max(200),
  status: z.enum(ORDER_STATUSES),
});

export const deleteOrdersSchema = z.object({
  orderIds: z.array(z.string().min(1)).min(1, "Selecione pelo menos 1 pedido.").max(200),
});

export type OrderStatusInput = z.infer<typeof orderStatusSchema>;
