import { db } from "@agenda-facil-app/db";
import { service } from "@agenda-facil-app/db/schema/service";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../index";

const MIN_DURATION_MINUTES = 15;
const MAX_DURATION_MINUTES = 480;

export const serviceRouter = router({
  // Listar todos os serviços ativos ordenados por displayOrder
  getAll: publicProcedure.query(
    async () =>
      await db
        .select()
        .from(service)
        .where(eq(service.active, true))
        .orderBy(service.displayOrder, service.name)
  ),

  // Obter serviço por ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(service)
        .where(and(eq(service.id, input.id), eq(service.active, true)))
        .limit(1);

      return result[0] || null;
    }),

  // Criar novo serviço (apenas admin)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        duration: z
          .number()
          .min(MIN_DURATION_MINUTES)
          .max(MAX_DURATION_MINUTES),
        price: z.number().optional(),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(
      async ({ input }) =>
        await db.insert(service).values({
          name: input.name,
          description: input.description,
          duration: input.duration,
          price: input.price,
          displayOrder: input.displayOrder,
        })
    ),

  // Atualizar serviço (apenas admin)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        duration: z
          .number()
          .min(MIN_DURATION_MINUTES)
          .max(MAX_DURATION_MINUTES)
          .optional(),
        price: z.number().optional(),
        active: z.boolean().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      return await db.update(service).set(updateData).where(eq(service.id, id));
    }),

  // Deletar serviço (apenas admin) - soft delete
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(
      async ({ input }) =>
        await db
          .update(service)
          .set({ active: false })
          .where(eq(service.id, input.id))
    ),
});
