import request, { SuperTest } from 'supertest';

import { User } from '#/useCases/users/user.entity';

const user: User = {
  id: 1,
  actived: true,
  email: 'leandro.sbrissa@hotmail.com',
  password: '123456',
  name: 'Leandro Sbrissa',
};

export async function registerAuth(app: SuperTest<request.Test>) {
  const result = await app.post('/auth/register').send(user);
  expect(result.status).toBe(201);
  // expect(true).toBe(true);
}

export async function loginAuth(app: SuperTest<request.Test>) {
  const result = await app.post('/auth').send({ email: user.email, password: user.password });
  expect(result.status).toBe(200);
  expect(result.body).toHaveProperty('token');
  // expect(true).toBe(true);
  return result.body.token;
}
