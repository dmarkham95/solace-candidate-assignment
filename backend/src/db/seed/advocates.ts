import { faker } from '@faker-js/faker';
import { db } from '../';
import { NewAdvocate } from '../../models/advocate.model';
import logger from '../../config/logger';
import { advocates } from '../schema/advocates';

const degrees = ['MD', 'PhD', 'MSW'];

const generateMockAdvocate = (): NewAdvocate => {
  const phoneNumberString = faker.string.numeric({ length: { min: 10, max: 10 } }).toString();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    state: faker.location.state(),
    degree: faker.helpers.arrayElement(degrees),
    yearsOfExperience: faker.number.int({ min: 1, max: 40 }),
    phoneNumber: parseInt(phoneNumberString, 10),
  };
};

const generateMockAdvocates = (count: number): NewAdvocate[] => {
  return Array.from({ length: count }, () => generateMockAdvocate());
};

const seedAdvocates = async (count: number) => {
  try {
    const mockAdvocates = generateMockAdvocates(count);

    const insertedAdvocates = await db.insert(advocates).values(mockAdvocates).returning();

    logger.info(`Successfully inserted ${insertedAdvocates.length} mock advocates`);
    return insertedAdvocates;
  } catch (error) {
    logger.error('Error seeding advocates:', error);
    throw error;
  }
};

const clearAdvocates = async () => {
  try {
    await db.delete(advocates);
    logger.info('Successfully cleared all advocates');
  } catch (error) {
    logger.error('Error clearing advocates:', error);
    throw error;
  }
};

export { generateMockAdvocate, generateMockAdvocates, seedAdvocates, clearAdvocates };
