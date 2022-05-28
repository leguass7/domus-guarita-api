import { Router } from 'express';

import { dataSource } from '#/database';

import { UserController } from './user.controller';
import { UserService } from './user.service';

const userService = new UserService(dataSource);
const controller = new UserController(userService);

const UserRoute = Router();

UserRoute.get('/', (...args) => controller.paginate(...args));
UserRoute.get('/:userId', (...args) => controller.findOne(...args));

export { UserRoute, userService };
