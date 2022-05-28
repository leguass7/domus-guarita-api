import { NextFunction, Request, Response } from 'express';

import { HttpException } from '#/services/ServerHttp';
import { Catch } from '#/services/ServerHttp/exceptions/catch-controller.decorator';

// import type { AuthRecoverService } from './auth-recover/auth-recover.service';
// import type { RequestUpdateTokenDto } from './auth.dto';
import type { AuthService } from './auth.service';

@Catch()
export class AuthController {
  constructor(private authService: AuthService) {}

  async authorize(req: Request, res: Response, _next: NextFunction) {
    const { body } = req;
    const response = await this.authService.signIn(body);

    if (!response) throw new HttpException(401, `no_found_error`);
    const { token = '', expiration = null, role, user = null } = response;
    return res.status(200).send({ success: !!token, token, groupId: role, user, expiration }).end();
  }

  async register(req: Request, res: Response, _next: NextFunction) {
    const user = await this.authService.registerUser(req.body);
    return res.status(201).send({ success: true, user }).end();
  }
}
