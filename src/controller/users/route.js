import { Router } from 'express';
import UsersController from './usersController.js';
import { authenticate } from '../../libs/authentication.js';
import { authorizeRole } from '../../libs/authorization.js';

const route = Router();

route.route('/').post(
  UsersController.createUser,
);

// route.route('/').get(
//   UsersController.getUsers,
// );

route.route('/:id').get(
  UsersController.getUserById,
);

route.route('/:id').put(
  UsersController.updateUser,
);

route.route('/:id').delete(
  authenticate,
  authorizeRole('admin'),
  UsersController.deleteUser,
);

route.route('/assign-role/:id').put(
  authenticate,
  authorizeRole('admin'),
  UsersController.assignRole,
);

route.route('/').get(
  authenticate,
  authorizeRole('admin'),
  UsersController.filterUsers
)
export default route;
