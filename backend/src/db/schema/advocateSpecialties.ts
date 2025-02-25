import { pgTable, serial, varchar, timestamp, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { advocates } from './advocates';
import { specialties } from './specialties';

export const advocateSpecialties = pgTable(
  'advocate_specialties',
  {
    advocateId: integer('advocate_id')
      .notNull()
      .references(() => advocates.id, { onDelete: 'cascade' }),
    specialtyId: integer('specialty_id')
      .notNull()
      .references(() => specialties.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.advocateId, table.specialtyId] })]
);

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));
