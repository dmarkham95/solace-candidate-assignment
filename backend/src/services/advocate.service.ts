import { and, count, eq, gte, like, lte, sql, SQL, sum } from 'drizzle-orm';
import { db } from '../db';
import logger from '../config/logger';
import { Advocate, NewAdvocate } from '../models/advocate.model';
import { advocates } from '../db/schema/advocates';
import { AdvocateFilters } from '../types/advocate-filters.type';
import { PaginationParams } from '../types/pagination-params.type';
import { PaginatedResponse } from '../types/paginated-response.type';
import { specialties } from '../db/schema/specialties';

export class AdvocateService {
  async createAdvocate(data: NewAdvocate) {
    try {
      const [advocate] = await db.insert(advocates).values(data).returning();
      return advocate;
    } catch (error) {
      logger.error('Error creating advocate:', error);
      throw error;
    }
  }

  async getAdvocates(
    filters: AdvocateFilters = {},
    pagination: PaginationParams = { page: 1, pageSize: 10 }
  ): Promise<PaginatedResponse<Advocate>> {
    try {
      const page = Math.max(1, pagination.page);
      const pageSize = Math.max(1, Math.min(100, pagination.pageSize)); // Limit max page size
      const offset = (page - 1) * pageSize;

      const conditions = [];

      if (filters.firstName) {
        conditions.push(like(advocates.firstName, `%${filters.firstName}%`));
      }

      if (filters.lastName) {
        conditions.push(like(advocates.lastName, `%${filters.lastName}%`));
      }

      if (filters.city) {
        conditions.push(like(advocates.city, `%${filters.city}%`));
      }

      if (filters.state) {
        conditions.push(eq(advocates.state, filters.state));
      }

      if (filters.degree) {
        conditions.push(like(advocates.degree, `%${filters.degree}%`));
      }

      if (filters.minYearsOfExperience !== undefined) {
        conditions.push(gte(advocates.yearsOfExperience, filters.minYearsOfExperience));
      }

      if (filters.maxYearsOfExperience !== undefined) {
        conditions.push(lte(advocates.yearsOfExperience, filters.maxYearsOfExperience));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      let orderBy: SQL<unknown> | undefined;
      if (filters.sortBy && filters.sortBy in advocates) {
        const column = advocates[filters.sortBy as keyof typeof advocates];
        if (column) {
          const direction = filters.sortDirection === 'desc' ? 'desc' : 'asc';
          if (direction === 'desc') {
            orderBy = sql`${column} DESC`;
          } else {
            orderBy = sql`${column} ASC`;
          }
        } else {
          // Default sort by id ascending
          orderBy = sql`${advocates.id} ASC`;
        }
      } else {
        // Default sort by id ascending
        orderBy = sql`${advocates.id} ASC`;
      }
      const countResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(advocates)
        .where(whereClause);

      const totalCount = countResult[0]?.count || 0;

      const results = await db.query.advocates.findMany({
        where: whereClause,
        limit: pageSize,
        offset,
        orderBy,
        with: {
          specialties: {
            columns: {},
            with: {
              specialty: true,
            },
          },
        },
      });

      return {
        data: results,
        total: totalCount,
      };
    } catch (error) {
      logger.error('Error fetching advocates:', error);
      throw error;
    }
  }

  async getAdvocateById(id: number) {
    try {
      const advocate = await db.query.advocates.findFirst({
        where: eq(advocates.id, id),
        with: {
          specialties: {
            columns: {},
            with: {
              specialty: true,
            },
          },
        },
      });
      return advocate;
    } catch (error) {
      logger.error(`Error fetching advocate ${id}:`, error);
      throw error;
    }
  }

  async updateAdvocate(id: number, data: Partial<NewAdvocate>) {
    try {
      const [updatedAdvocate] = await db
        .update(advocates)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(advocates.id, id))
        .returning();
      return updatedAdvocate;
    } catch (error) {
      logger.error(`Error updating advocate ${id}:`, error);
      throw error;
    }
  }

  async deleteAdvocate(id: number) {
    try {
      const [deletedAdvocate] = await db.delete(advocates).where(eq(advocates.id, id)).returning();
      return deletedAdvocate;
    } catch (error) {
      logger.error(`Error deleting advocate ${id}:`, error);
      throw error;
    }
  }

  async getAdvocatesStatistic() {
    try {
      const totalYearsOfExperience = await db
        .select({ value: sum(advocates.yearsOfExperience) })
        .from(advocates);
      const totalAdvocates = await db.select({ value: count(advocates.id) }).from(advocates);
      const totalSpecialties = await db.select({ value: count(specialties.id) }).from(specialties);

      return {
        totalYearsOfExperience: totalYearsOfExperience[0].value,
        totalAdvocates: totalAdvocates[0].value,
        totalSpecialties: totalSpecialties[0].value,
      };
    } catch (error) {
      logger.error(`Error fetching advocate statistic:`, error);
      throw error;
    }
  }
}

export const advocateService = new AdvocateService();
