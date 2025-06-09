import { Router } from 'express';
import GenerateToken from './generateToken.js';

const route = Router();

route.route('/').post(
  GenerateToken.generateToken,
);

export default route;
