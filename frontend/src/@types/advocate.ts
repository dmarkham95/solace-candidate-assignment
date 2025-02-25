export interface Advocate {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  degree: string;
  yearsOfExperience: number;
  phoneNumber: number;
  specialties?:       SpecialtyElement[];
}

export interface SpecialtyElement {
  specialty: SpecialtySpecialty;
}

export interface SpecialtySpecialty {
  id:        number;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

export type AdvocateQueryFilter = {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  degree?: string;
  minYearsOfExperience?: number;
  maxYearsOfExperience?: number;
  page?: number;
  pageSize?: number;
  sortBy?: 'id' | 'firstName' | 'lastName' | 'city' | 'state' | 'degree' | 'yearsOfExperience' | 'phoneNumber' | 'createdAt' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
}