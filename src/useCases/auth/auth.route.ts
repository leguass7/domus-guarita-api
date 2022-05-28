import { Router } from 'express';

import { userService } from '#useCases/users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtService } from './jwt.service';

const authMiddleware = jwtService.createMiddleware();

const authService = new AuthService(userService, jwtService);
const controller = new AuthController(authService);

const AuthRoute = Router();

AuthRoute.post('/register', (...args) => controller.register(...args));
AuthRoute.post('/', (...args) => controller.authorize(...args));

export { AuthRoute, authMiddleware, jwtService };
