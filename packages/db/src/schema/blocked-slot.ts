import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const blockedSlot = pgTable(
  "blocked_slot",
  {
    id: serial("id").primaryKey(),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
    reason: text("reason").notNull(),
    isRecurring: boolean("is_recurring").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    startIdx: index("blocked_slot_start_idx").on(table.startAt),
    endIdx: index("blocked_slot_end_idx").on(table.endAt),
    rangeIdx: index("blocked_slot_range_idx").on(table.startAt, table.endAt),
  })
);
