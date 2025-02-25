import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { specialties } from '../db/schema/specialties';

export type Specialty = InferSelectModel<typeof specialties>;
export type NewSpecialty = InferInsertModel<typeof specialties>;
