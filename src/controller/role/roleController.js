import { roleService } from '../../services/index.js';

class UsersController {
  static getInstance() {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController();
    }
    return UsersController.instance;
  }

  createRole = async (req, res, next) => {
    return roleService.createRole(req, res, next);
  };
}

export default UsersController.getInstance();
