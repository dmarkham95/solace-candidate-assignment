import { relations } from 'drizzle-orm';
import { pgTable, bigserial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { advocateSpecialties } from './advocateSpecialties';

export const specialties = pgTable('specialties', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocates: many(advocateSpecialties),
}));
