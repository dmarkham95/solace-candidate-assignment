import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { advocates } from '../db/schema/advocates';

export type Advocate = InferSelectModel<typeof advocates>;
export type NewAdvocate = InferInsertModel<typeof advocates>;
