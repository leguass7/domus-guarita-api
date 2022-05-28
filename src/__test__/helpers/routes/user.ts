import request, { SuperTest } from 'supertest';

import { dataSource } from '#/database';
import { User } from '#/useCases/users/user.entity';

const user: User = {
  id: 1,
  actived: true,
  email: 'leandro.sbrissa@hotmail.com',
  password: '123456',
  name: 'Leandro Sbrissa',
};

export async function paginateUser(app: SuperTest<request.Test>, token = '') {
  const result = await app.get('/users').set('Authorization', `Bearer ${token}`).send(user);
  expect(result.status).toBe(200);
  // expect(true).toBe(true);
}

export async function clearAllUsers() {
  const repo = dataSource.getRepository(User);
  await repo.clear();
}
