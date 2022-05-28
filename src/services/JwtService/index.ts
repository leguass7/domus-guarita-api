import type { NextFunction, Request, Response } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';

import { LogClass } from '#/services/LoggerService/log-class.decorator';
import { HttpException } from '#/services/ServerHttp';
import type { PayloadTokenDto } from '#/useCases/auth/auth.dto';

import { requestHeaderToken } from './utils';

export interface JwtServiceOptions {
  secret: string;
}

export interface JwtGenerateOptions {
  secret?: string;
  expiresIn?: SignOptions['expiresIn'];
}

@LogClass
export class JwtService {
  constructor(private readonly secret?: string) {}

  async generateToken(payload: PayloadTokenDto, jwtOptions: JwtGenerateOptions = {}) {
    const { secret, expiresIn } = jwtOptions;

    const jwtSecret = secret || this?.secret || null;
    if (!jwtSecret) throw new Error('invalid JWT secret');

    const options: SignOptions = {};
    if (expiresIn) options.expiresIn;

    if (expiresIn) options.expiresIn = expiresIn;
    const token = sign(payload, jwtSecret, options);

    return token;
  }

  createMiddleware(secret?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = requestHeaderToken(req);

      if (!token) {
        if (next) return next(new HttpException(403, 'restrict_access'));
        else throw new HttpException(403, 'restrict_access');
      }

      const jwtSecret = secret || this?.secret || null;
      if (!jwtSecret) throw new Error('invalid JWT secret');

      let auth: PayloadTokenDto = null;

      try {
        auth = verify(token, jwtSecret) as PayloadTokenDto;
      } catch {
        return next(new HttpException(401, 'invalid_token'));
      }

      if (!auth && next) return next(new HttpException(401, 'invalid_token'));
      req.auth = auth;
      return next ? next() : auth;
    };
  }
}
