import { Request } from 'express';

export function requestHeaderToken(req: Request) {
  const { headers, body, query } = req;
  const token = headers?.authorization || headers['x-access-token'] || body?.token || query?.token;

  if (!token) return null;
  if (token.startsWith('Bearer ')) return token.slice(7, token.length);

  return token;
}
