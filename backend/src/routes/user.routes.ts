import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validate } from '../middleware/validator.middleware';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/user.schema';

const router = Router();

router
  .route('/')
  .get(userController.getUsers)
  .post(validate(createUserSchema), userController.createUser);

router
  .route('/:id')
  .get(validate(getUserSchema), userController.getUserById)
  .patch(validate(updateUserSchema), userController.updateUser)
  .delete(validate(getUserSchema), userController.deleteUser);

export default router;