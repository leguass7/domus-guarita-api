import type { NextFunction, Request, Response } from 'express';

import { Catch } from '#/services/ServerHttp/exceptions/catch-controller.decorator';

import type { UserService } from './user.service';

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
