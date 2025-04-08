import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  name: text("name").notNull(),
  prompt: text("prompt").notNull(),
  generatedDesign: jsonb("generated_design"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDesignSchema = createInsertSchema(designs).pick({
  name: true,
  prompt: true,
  generatedDesign: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDesign = z.infer<typeof insertDesignSchema>;
export type Design = typeof designs.$inferSelect;

export type GeneratedDesignResponse = {
  html: string;
  css: string;
  jsx: string;
  tailwind: string;
  suggestions: string[];
};
