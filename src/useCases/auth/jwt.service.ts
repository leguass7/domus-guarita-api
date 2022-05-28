import { env } from '#/config';
import { JwtService } from '#/services/JwtService';

export const jwtService = new JwtService(env?.APP_SECRET);
