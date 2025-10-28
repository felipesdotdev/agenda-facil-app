import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { service } from "./service";

export const appointment = pgTable(
  "appointment",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    notes: text("notes"),
    serviceId: integer("service_id")
      .notNull()
      .references(() => service.id, { onDelete: "restrict" }),
    scheduledAt: timestamp("scheduled_at").notNull(),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    scheduledAtIdx: index("appointment_scheduled_at_idx").on(table.scheduledAt),
    statusIdx: index("appointment_status_idx").on(table.status),
    serviceIdx: index("appointment_service_idx").on(table.serviceId),
    emailIdx: index("appointment_email_idx").on(table.email),
    dateStatusIdx: index("appointment_date_status_idx").on(
      table.scheduledAt,
      table.status
    ),
  })
);
