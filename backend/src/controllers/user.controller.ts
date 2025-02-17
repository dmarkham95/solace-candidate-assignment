import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { AppError } from '../middleware/error.middleware';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({
        status: 'success',
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(Number(req.params.id));
      if (!user) {
        const error = new Error('User not found') as AppError;
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUser(Number(req.params.id), req.body);
      if (!user) {
        const error = new Error('User not found') as AppError;
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.deleteUser(Number(req.params.id));
      if (!user) {
        const error = new Error('User not found') as AppError;
        error.statusCode = 404;
        throw error;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();