import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { advocates } from '../db/schema/advocates';
import { advocateSpecialties } from 'src/db/schema/advocateSpecialties';

export type Advocate = InferSelectModel<typeof advocates>;
export type NewAdvocate = InferInsertModel<typeof advocates>;
export type AdvocateSpecialty = InferSelectModel<typeof advocateSpecialties>;
export type AdvocateWithRelations = Advocate & {
  specialties: Array<{
    specialty: {
      id: number;
      name: string;
    };
  }>;
};
