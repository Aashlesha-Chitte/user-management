import { usersService } from '../../services/index.js';

class UsersController {
  static getInstance() {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController();
    }
    return UsersController.instance;
  }

  createUser = async (req, res, next) => {
    return usersService.createUser(req, res, next);
  };

  getUsers = async (req, res, next) => {
    return usersService.getUsers(req, res, next);
  };
    
  getUserById = async (req, res, next) => {
    return usersService.getUserById(req, res, next);
  };

  updateUser = async (req, res, next) => {
    return usersService.updateUser(req, res, next);
  };

  deleteUser = async (req, res, next) => {
    return usersService.deleteUser(req, res, next);
  };

  assignRole = async (req, res, next) => {
    return usersService.assignRole(req, res, next);
  };
  filterUsers = async (req, res, next) => {
    return usersService.filterUsers(req, res, next);
  };
  
}

export default UsersController.getInstance();
