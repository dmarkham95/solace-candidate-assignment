import { faker } from '@faker-js/faker';
import { db } from '../';
import { specialties } from '../schema/specialties';
import { advocateSpecialties } from '../schema/advocateSpecialties';
import logger from '../../config/logger';
import { NewSpecialty } from '../../models/specialty.model';

const specialtiesMock = [
  'Bipolar',
  'LGBTQ',
  'Medication/Prescribing',
  'Suicide History/Attempts',
  'General Mental Health (anxiety, depression, stress, grief, life transitions)',
  "Men's issues",
  'Relationship Issues (family, friends, couple, etc)',
  'Trauma & PTSD',
  'Personality disorders',
  'Personal growth',
  'Substance use/abuse',
  'Pediatrics',
  "Women's issues (post-partum, infertility, family planning)",
  'Chronic pain',
  'Weight loss & nutrition',
  'Eating disorders',
  'Diabetic Diet and nutrition',
  'Coaching (leadership, career, academic and wellness)',
  'Life coaching',
  'Obsessive-compulsive disorders',
  'Neuropsychological evaluations & testing (ADHD testing)',
  'Attention and Hyperactivity (ADHD)',
  'Sleep issues',
  'Schizophrenia and psychotic disorders',
  'Learning disorders',
  'Domestic abuse',
];

const generateSpecialties = (): NewSpecialty[] => {
  return specialtiesMock.map((name) => ({ name }));
};

const seedSpecialties = async (): Promise<number[]> => {
  try {
    const specialtyData = generateSpecialties();

    const insertedSpecialties = await db
      .insert(specialties)
      .values(specialtyData)
      .onConflictDoNothing()
      .returning();

    logger.info(`Successfully inserted ${insertedSpecialties.length} specialties`);

    return insertedSpecialties.map((specialty) => specialty.id);
  } catch (error) {
    logger.error('Error seeding specialties:', error);
    throw error;
  }
};

const generateAdvocateSpecialtyRelations = (
  advocateIds: number[],
  specialtyIds: number[]
): { advocateId: number; specialtyId: number }[] => {
  const relations: { advocateId: number; specialtyId: number }[] = [];

  advocateIds.forEach((advocateId) => {
    // Randomly decide how many specialties this advocate will have (1-3)
    const numberOfSpecialties = faker.number.int({ min: 1, max: 3 });

    // Get random specialties for this advocate
    const advocateSpecialtyIds = faker.helpers.arrayElements(specialtyIds, numberOfSpecialties);

    // Create relations for each specialty
    advocateSpecialtyIds.forEach((specialtyId) => {
      relations.push({
        advocateId,
        specialtyId,
      });
    });
  });

  return relations;
};

const seedAdvocateSpecialties = async (advocateIds: number[], specialtyIds: number[]) => {
  try {
    const relations = generateAdvocateSpecialtyRelations(advocateIds, specialtyIds);

    const insertedRelations = await db.insert(advocateSpecialties).values(relations).returning();

    logger.info(`Successfully inserted ${insertedRelations.length} advocate-specialty relations`);
    return insertedRelations;
  } catch (error) {
    logger.error('Error seeding advocate specialties:', error);
    throw error;
  }
};

const clearSpecialtiesData = async () => {
  try {
    await db.delete(advocateSpecialties);
    await db.delete(specialties);
    logger.info('Successfully cleared all specialties and relations');
  } catch (error) {
    logger.error('Error clearing specialties data:', error);
    throw error;
  }
};

const seedAllSpecialtyData = async (advocateIds: number[]) => {
  try {
    // First clear existing data (optional)
    // await clearSpecialtiesData();

    // Seed specialties
    const specialtyIds = await seedSpecialties();

    // Seed relations
    await seedAdvocateSpecialties(advocateIds, specialtyIds);

    logger.info('Successfully completed seeding specialty data');
  } catch (error) {
    logger.error('Error in seedAllSpecialtyData:', error);
    throw error;
  }
};

export {
  generateSpecialties,
  seedSpecialties,
  generateAdvocateSpecialtyRelations,
  seedAdvocateSpecialties,
  clearSpecialtiesData,
  seedAllSpecialtyData,
};
