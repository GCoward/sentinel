import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { roles } from "@/lib/validators";

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role", { enum: roles }).notNull(),
  status: text("status").notNull(),
  lastActive: text("last_active").notNull(),
});

export const analyticsPoints = sqliteTable("analytics_points", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  revenue: integer("revenue").notNull(),
  activeUsers: integer("active_users").notNull(),
  conversionRate: real("conversion_rate").notNull(),
});
