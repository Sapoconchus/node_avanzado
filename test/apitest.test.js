'use strict';

require('dotenv').config();

const app = require('../app');
const supertest = require('supertest');

describe('tetsing user API', () => {
  test('[NO_AUTH] // POST // register method', async()=> {
    const user = await supertest(app)
      .post('/api/user/register')
      .send({
        username: 'usertest',
        password: 'password',
        email: 'test@tester.con'
      })
      .expect(200);
    expect((user) => {
      expect(user.username).toBe('usertest');
    });
  });

  test('[NO_AUTH] // POST // login method', async()=> {
    const login = await supertest(app)
      .post('/api/user/login')
      .send({
        username: 'Administrator',
        password: 'admin',
        email: 'mavidalma@gmail.com'
      })
      .expect(200);
    expect((login) => {
      expect(login.token).toBeDefined();
    });
  });
});