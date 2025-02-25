import { relations, sql } from 'drizzle-orm';
import { pgTable, integer, text, jsonb, timestamp, bigint, bigserial } from 'drizzle-orm/pg-core';
import { advocateSpecialties } from './advocateSpecialties';

const advocates = pgTable('advocates', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  degree: text('degree').notNull(),
  yearsOfExperience: integer('years_of_experience').notNull(),
  phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const advocatesRelations = relations(advocates, ({ many }) => ({
  specialties: many(advocateSpecialties),
}));

export { advocates };
