import type { NextFunction, Request, Response } from 'express';

export class UserController {
  constructor() {
    //
  }
  async findOne(req: Request, res: Response, _next: NextFunction) {
    return res.status(200).send({ users: null }).end();
  }
}
