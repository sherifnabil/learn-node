const request = require('supertest');
let server;

describe('/api/genres', () => {
  beforeEach(() => server = require('../../index')); // should load the server before each test and stop it after each test to avoid exception as it is running in the index.js
  afterEach(() => server.close());

  describe('GET /', () => {
    it('should return all genres', async () => {
      const response = await request(server).get('/api/genres')
      expect(response.status).toBe(200);
    });
  });

  // describe('POST /', () => {
  //   it('', () => {

  //   });
  // });
});