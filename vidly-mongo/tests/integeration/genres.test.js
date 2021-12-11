const request = require('supertest');
const {Genre} =  require('../../models/genre');
const {User} =  require('../../models/user');
let server;

describe('/api/genres', () => {
  beforeEach(() => server = require('../../index')); // should load the server before each test and stop it after each test to avoid exception as it is running in the index.js
  afterEach(async () => {
    server.close()
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);

      const response = await request(server).get('/api/genres')
      expect(response.status).toBe(200);
      // expect(response.body.length).toBe(2);
      expect(response.body.some(g => g.name === 'genre2')).toBeTruthy()
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async() => {
      const genre = new Genre({name: 'my genre'});
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return a 404 if invalid id is passed', async() => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({name});
    }

    beforeEach(() => {
      token = User().generateAuthToken();
      name = 'genre'
    });

    it('should return a 401 if client is not logged in', async() => {
      token = '';
      const response = await exec();
      expect(response.status).toBe(401);
    });

    it('should return a 400 if genre is less than 5 charcters', async() => {
      name = 'ge'
      const response = await exec()

      expect(response.status).toBe(400);
    });

    it('should return a 400 if genre is more than 50 charcters', async() => {
      name = new Array(55).join('a');
      const response = await exec();

      expect(response.status).toBe(400);
    });

    it('should save the genre if it is valid', async() => {
      const response = await exec();
      const genre = Genre.find({name});

      expect(response.status).toBe(200);
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async() => {
      const response = await exec();

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', name);
    });
  });
});