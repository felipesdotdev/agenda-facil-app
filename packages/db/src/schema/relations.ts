import { relations } from "drizzle-orm";
import { appointment } from "./appointment";
import { service } from "./service";

export const serviceRelations = relations(service, ({ many }) => ({
  appointments: many(appointment),
}));

export const appointmentRelations = relations(appointment, ({ one }) => ({
  service: one(service, {
    fields: [appointment.serviceId],
    references: [service.id],
  }),
}));
