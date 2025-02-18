import 'dotenv/config';
import { seedAdvocates } from './advocates';
import { seedAllSpecialtyData } from './specialties';
import logger from '../../config/logger';

export const seedDatabase = async (count = 50) => {
  try {
    // First, seed advocates
    const advocates = await seedAdvocates(count);
    const advocateIds = advocates.map((advocate) => advocate.id);

    // Then seed specialties and relations
    await seedAllSpecialtyData(advocateIds);

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}
