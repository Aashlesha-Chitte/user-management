import { Router } from 'express';
import RoleController from './roleController.js';
import { authenticate } from '../../libs/authentication.js';
import { authorizeRole } from '../../libs/authorization.js';
const route = Router();

route.route('/').post(
  authenticate,
  authorizeRole('admin'),
  RoleController.createRole,
);

export default route;
