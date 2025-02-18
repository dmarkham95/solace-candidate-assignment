import { Request, Response, NextFunction } from 'express';
import { advocateService } from '../services/advocate.service';
import { ApiError } from '../utils/api-error';
import { AdvocateFilters } from '../types/advocate-filters.type';
import { advocateQuerySchema } from '../schemas/advocate.schema';
import { PaginationParams } from '../types/pagination-params.type';

export class AdvocateController {
  async createAdvocate(req: Request, res: Response, next: NextFunction) {
    try {
      const advocate = await advocateService.createAdvocate(req.body);
      res.status(201).json({
        status: 'success',
        data: { advocate },
      });
    } catch (error) {
      next(error as Error);
    }
  }

  async getAdvocates(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedQuery = advocateQuerySchema.parse(req.query);

      const filters: AdvocateFilters = {
        firstName: validatedQuery.firstName,
        lastName: validatedQuery.lastName,
        city: validatedQuery.city,
        state: validatedQuery.state,
        degree: validatedQuery.degree,
        minYearsOfExperience: validatedQuery.minYearsOfExperience,
        maxYearsOfExperience: validatedQuery.maxYearsOfExperience,
        sortBy: validatedQuery.sortBy,
        sortDirection: validatedQuery.sortDirection,
      };

      const pagination: PaginationParams = {
        page: validatedQuery.page,
        pageSize: validatedQuery.pageSize,
      };

      const result = await advocateService.getAdvocates(filters, pagination);
      res.status(200).json(result);
    } catch (error) {
      next(error as Error);
    }
  }

  async getAdvocateById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw ApiError.BadRequest('Id is required');
      }
      const advocate = await advocateService.getAdvocateById(Number(req.params.id));
      if (!advocate) {
        throw ApiError.NotFound('Advocate not found');
      }
      res.status(200).json(advocate);
    } catch (error) {
      next(error as Error);
    }
  }

  async updateAdvocate(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw ApiError.BadRequest('Id is required');
      }
      const advocate = await advocateService.updateAdvocate(Number(req.params.id), req.body);
      if (!advocate) {
        throw ApiError.NotFound('Advocate not found');
      }
      res.status(200).json(advocate);
    } catch (error) {
      next(error as Error);
    }
  }

  async deleteAdvocate(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw ApiError.BadRequest('Id is required');
      }
      const advocate = await advocateService.deleteAdvocate(Number(req.params.id));
      if (!advocate) {
        throw ApiError.NotFound('Advocate not found');
      }
      res.status(204).send();
    } catch (error) {
      next(error as Error);
    }
  }
}

export const advocateController = new AdvocateController();
