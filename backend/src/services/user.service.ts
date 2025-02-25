import { eq } from 'drizzle-orm';
import { db } from '../db';
import logger from '../config/logger';
import { NewUser } from '@/models/user.model';
import { users } from '@/db/schema/users';

export class UserService {
  async createUser(data: NewUser) {
    try {
      const [user] = await db.insert(users).values(data).returning();
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      return await db.select().from(users);
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: bigint) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id));
      return user;
    } catch (error) {
      logger.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async updateUser(id: bigint, data: Partial<NewUser>) {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      logger.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: bigint) {
    try {
      const [deletedUser] = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();
      return deletedUser;
    } catch (error) {
      logger.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export const userService = new UserService();