import type { NextFunction, Request, Response } from 'express';
import { ApiPath } from 'swagger-express-ts';

import { Catch } from '#/services/ServerHttp/exceptions/catch-controller.decorator';

import type { UserService } from './user.service';

@ApiPath({ name: 'teste', path: '/users', description: 'teste' })
@Catch()
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  async paginate(req: Request, res: Response, _next: NextFunction) {
    return res.status(200).send({ users: null }).end();
  }

  async findOne(req: Request, res: Response, _next: NextFunction) {
    return res.status(200).send({ users: null }).end();
  }
}
