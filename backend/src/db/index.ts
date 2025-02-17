import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import logger from '../config/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = drizzle(pool);