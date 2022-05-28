import { Router } from 'express';

import { UserController } from './user.controller';

const controller = new UserController();

const UserRoute = Router();

UserRoute.get('/:userId', (...args) => controller.findOne(...args));

export { UserRoute };
