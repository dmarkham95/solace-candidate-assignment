import { Router } from 'express';
import { advocateController } from '../controllers/advocate.controller';
import { validate } from '../middleware/validator.middleware';
import { createAdvocateSchema, updateAdvocateSchema } from '../schemas/advocate.schema';

const router = Router();

router
  .route('/')
  .get(advocateController.getAdvocates)
  .post(validate(createAdvocateSchema), advocateController.createAdvocate);

router
  .route('/:id')
  .get(advocateController.getAdvocateById)
  .patch(validate(updateAdvocateSchema), advocateController.updateAdvocate)
  .delete(advocateController.deleteAdvocate);

export default router;
