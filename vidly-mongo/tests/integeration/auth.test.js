const request = require('supertest');
const {User} =  require('../../models/user');
const {Genre} =  require('../../models/genre');

let server;

describe('auth middleware', () => {
  beforeEach(() => server = require('../../index'));
  afterEach(async() => {
    await Genre.deleteMany({});
    await server.close();
  });

  let token;

  const exec = () => {
    return request(server)
    .post('/api/genres')
    .set('x-auth-token', token)
    .send({ name: 'gen' });
  }

  beforeEach(() =>{
    token = User().generateAuthToken()
  });

  it('should return a 401 if no token is provided', async () => {
    token = '';
    const response = await exec();
    expect(response.status).toBe(401)
  });

  it('should return a 400 if no token is invalid', async () => {
    token = 'a';
    const response = await exec();
    expect(response.status).toBe(400)
  });

  it('should return a 200 if token is valid', async () => {
    const response = await exec();
    expect(response.status).toBe(200)
  });
});