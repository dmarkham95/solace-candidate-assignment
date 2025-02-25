import { ApiError } from '../utils/api-error';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { z } from 'zod';

export const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw ApiError.BadRequest('Validation failed', error.errors);
      }
      throw error;
    }
  };
