import { advocates } from '../db/schema/advocates';

export type AdvocateFilters = {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  degree?: string;
  minYearsOfExperience?: number;
  maxYearsOfExperience?: number;
  sortBy?: keyof typeof advocates.$inferSelect;
  sortDirection?: 'asc' | 'desc';
  specialty?: string;
};
