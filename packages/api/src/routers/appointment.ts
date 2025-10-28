import { db } from "@agenda-facil-app/db";
import { appointment } from "@agenda-facil-app/db/schema/appointment";
import { blockedSlot } from "@agenda-facil-app/db/schema/blocked-slot";
import { service } from "@agenda-facil-app/db/schema/service";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, gte, lte, or } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../index";

const MIN_NAME_LENGTH = 2;
const MS_PER_MINUTE = 60_000;
const BUFFER_MINUTES = 15;
const DEFAULT_SERVICE_DURATION = 60;
const BUSINESS_HOUR_START = 8;
const BUSINESS_HOUR_END = 18;
const MAX_APPOINTMENTS_PER_QUERY = 50;

export const appointmentRouter = router({
  // Listar todos os agendamentos
  getAll: publicProcedure.query(
    async () =>
      await db
        .select({
          id: appointment.id,
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          notes: appointment.notes,
          scheduledAt: appointment.scheduledAt,
          status: appointment.status,
          createdAt: appointment.createdAt,
          service: {
            id: service.id,
            name: service.name,
            duration: service.duration,
          },
        })
        .from(appointment)
        .leftJoin(service, eq(appointment.serviceId, service.id))
        .orderBy(desc(appointment.scheduledAt))
        .limit(MAX_APPOINTMENTS_PER_QUERY)
  ),

  // Criar novo agendamento
  create: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(MIN_NAME_LENGTH, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
        serviceId: z.number().positive("ID do serviço inválido"),
        scheduledAt: z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
            "Formato de data/hora inválido"
          ),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Verificar se o serviço existe e está ativo
      const serviceData = await db
        .select({ id: service.id, duration: service.duration })
        .from(service)
        .where(and(eq(service.id, input.serviceId), eq(service.active, true)))
        .limit(1);

      if (!serviceData.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Serviço não encontrado ou inativo",
        });
      }

      // Verificar se o horário não está bloqueado
      const scheduledDate = new Date(input.scheduledAt);
      const serviceDurationMs =
        serviceData[0]?.duration ?? DEFAULT_SERVICE_DURATION;
      const serviceEndTime = new Date(
        scheduledDate.getTime() + serviceDurationMs * MS_PER_MINUTE
      );

      // Verificar se há bloqueios que se sobrepõem ao horário do agendamento
      const isBlocked = await db
        .select({ id: blockedSlot.id })
        .from(blockedSlot)
        .where(
          and(
            // O bloqueio começa antes do fim do agendamento
            lte(blockedSlot.startAt, serviceEndTime),
            // O bloqueio termina depois do início do agendamento
            gte(blockedSlot.endAt, scheduledDate)
          )
        )
        .limit(1);

      if (isBlocked.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Horário não disponível (bloqueado)",
        });
      }

      // Verificar se já existe agendamento que conflita (incluindo buffers)
      const bufferStart = new Date(
        scheduledDate.getTime() - BUFFER_MINUTES * MS_PER_MINUTE
      );
      const bufferEnd = new Date(
        serviceEndTime.getTime() + BUFFER_MINUTES * MS_PER_MINUTE
      );

      const conflictingAppointment = await db
        .select({
          id: appointment.id,
          scheduledAt: appointment.scheduledAt,
          name: appointment.name,
        })
        .from(appointment)
        .where(
          and(
            // Verificar se há conflito considerando buffers
            lte(appointment.scheduledAt, bufferEnd),
            gte(appointment.scheduledAt, bufferStart),
            or(
              eq(appointment.status, "pending"),
              eq(appointment.status, "confirmed")
            )
          )
        )
        .limit(1);

      if (conflictingAppointment.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Horário não disponível (conflito com agendamento existente)",
        });
      }

      const result = await db
        .insert(appointment)
        .values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          serviceId: input.serviceId,
          scheduledAt: scheduledDate,
          notes: input.notes,
          status: "pending",
        })
        .returning({ id: appointment.id });

      return result[0];
    }),

  // Listar agendamentos por período (admin)
  getByDateRange: protectedProcedure
    .input(
      z.object({
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        status: z
          .enum(["pending", "confirmed", "cancelled", "completed"])
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      let whereConditions = and(
        gte(appointment.scheduledAt, startDate),
        lte(appointment.scheduledAt, endDate)
      );

      if (input.status) {
        whereConditions = and(
          whereConditions,
          eq(appointment.status, input.status)
        );
      }

      return await db
        .select({
          id: appointment.id,
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          notes: appointment.notes,
          scheduledAt: appointment.scheduledAt,
          status: appointment.status,
          createdAt: appointment.createdAt,
          service: {
            id: service.id,
            name: service.name,
            duration: service.duration,
          },
        })
        .from(appointment)
        .leftJoin(service, eq(appointment.serviceId, service.id))
        .where(whereConditions)
        .orderBy(desc(appointment.scheduledAt));
    }),

  // Obter agendamento por ID (público para página de confirmação)
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: appointment.id,
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          notes: appointment.notes,
          scheduledAt: appointment.scheduledAt,
          status: appointment.status,
          createdAt: appointment.createdAt,
          service: {
            id: service.id,
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
          },
        })
        .from(appointment)
        .leftJoin(service, eq(appointment.serviceId, service.id))
        .where(eq(appointment.id, input.id))
        .limit(1);

      return result[0] || null;
    }),

  // Atualizar status do agendamento (admin)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
      })
    )
    .mutation(
      async ({ input }) =>
        await db
          .update(appointment)
          .set({ status: input.status })
          .where(eq(appointment.id, input.id))
    ),

  // Cancelar agendamento (cliente)
  cancel: publicProcedure
    .input(
      z.object({
        id: z.number(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // Verificar se o agendamento pertence ao email informado
      const existingAppointment = await db
        .select({
          id: appointment.id,
          email: appointment.email,
          status: appointment.status,
        })
        .from(appointment)
        .where(eq(appointment.id, input.id))
        .limit(1);

      if (!existingAppointment.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agendamento não encontrado",
        });
      }

      const appt = existingAppointment[0];
      if (!appt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agendamento não encontrado",
        });
      }

      if (appt.email !== input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email não confere com o agendamento",
        });
      }

      if (appt.status === "cancelled") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agendamento já foi cancelado",
        });
      }

      if (appt.status === "completed") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Não é possível cancelar agendamento já concluído",
        });
      }

      return await db
        .update(appointment)
        .set({ status: "cancelled" })
        .where(eq(appointment.id, input.id));
    }),

  // Obter horários disponíveis para uma data específica
  getAvailableSlots: publicProcedure
    .input(
      z.object({
        date: z.string().min(1, "Data é obrigatória"),
        serviceId: z
          .number()
          .int()
          .min(1, "ID do serviço deve ser maior que zero"),
      })
    )
    .query(async ({ input }) => {
      const selectedDate = new Date(input.date);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(BUSINESS_HOUR_START, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(BUSINESS_HOUR_END, 0, 0, 0);

      // Obter serviço para saber a duração
      const serviceData = await db
        .select({ duration: service.duration })
        .from(service)
        .where(and(eq(service.id, input.serviceId), eq(service.active, true)))
        .limit(1);

      if (!serviceData.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Serviço não encontrado",
        });
      }

      const serviceDuration =
        serviceData[0]?.duration ?? DEFAULT_SERVICE_DURATION;

      // Obter agendamentos existentes no dia
      const existingAppointments = await db
        .select({ scheduledAt: appointment.scheduledAt })
        .from(appointment)
        .where(
          and(
            gte(appointment.scheduledAt, startOfDay),
            lte(appointment.scheduledAt, endOfDay),
            or(
              eq(appointment.status, "pending"),
              eq(appointment.status, "confirmed")
            )
          )
        );

      // Obter horários bloqueados no dia
      const blockedSlots = await db
        .select({
          startAt: blockedSlot.startAt,
          endAt: blockedSlot.endAt,
        })
        .from(blockedSlot)
        .where(
          and(
            lte(blockedSlot.startAt, endOfDay),
            gte(blockedSlot.endAt, startOfDay)
          )
        );

      // Gerar slots de 1 hora das 8h às 18h
      const availableSlots: Array<{
        start: string;
        end: string;
        duration: number;
      }> = [];
      const currentTime = new Date(startOfDay);

      while (currentTime < endOfDay) {
        const slotEnd = new Date(
          currentTime.getTime() + serviceDuration * MS_PER_MINUTE
        );

        // Verificar se o slot não conflita com agendamentos existentes
        const hasConflict = existingAppointments.some((apt) => {
          const aptTime = new Date(apt.scheduledAt);
          return aptTime >= currentTime && aptTime < slotEnd;
        });

        // Verificar se o slot não está bloqueado
        const isBlocked = blockedSlots.some((blocked) => {
          const blockedStart = new Date(blocked.startAt);
          const blockedEnd = new Date(blocked.endAt);
          return currentTime < blockedEnd && slotEnd > blockedStart;
        });

        if (!(hasConflict || isBlocked)) {
          availableSlots.push({
            start: currentTime.toISOString(),
            end: slotEnd.toISOString(),
            duration: serviceDuration,
          });
        }

        // Avançar para o próximo slot (intervalos de 1 hora)
        currentTime.setHours(currentTime.getHours() + 1);
      }

      return availableSlots;
    }),
});
