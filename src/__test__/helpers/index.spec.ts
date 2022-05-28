import { mockProcessExit } from 'jest-mock-process';
import request, { SuperTest } from 'supertest';

import { ReturnStartApp, startApp } from '#/index';

import { registerAuth, loginAuth } from './routes/auth';
import { clearAllUsers, paginateUser } from './routes/user';

describe('Test server features', () => {
  let token: string;
  let app: SuperTest<request.Test>;
  let close: ReturnStartApp['closeServer'];
  jest.setTimeout(20000);

  beforeAll(async () => {
    const { server, closeServer } = await startApp();
    close = closeServer;
    app = request(server);
    await clearAllUsers();
  });

  afterAll(async () => {
    mockProcessExit();
    await close();

    await new Promise(resolve =>
      setTimeout(() => {
        app = undefined;
        resolve(true);
      }, 800),
    );
  });

  describe('Teste ROOT', () => {
    it('deveria acessar root', async () => {
      const result = await app.get('/').send();
      expect(result.status).toBe(200);
    });
  });

  describe('Teste AUTH', () => {
    it('deveria registrar novo usuário', () => registerAuth(app));
    it('deveria logar usuário', () => loginAuth(app));
  });

  describe('Teste USER', () => {
    it('deveria paginar usuários', () => paginateUser(app, token));
  });
});
