const moment = require('moment');
const request = require('supertest');
const mongoose = require('mongoose');
const {Movie} = require('../../models/movie');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental');

describe('/api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token = '';
  let movie;
  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId , movieId});
  }

  beforeEach(async () => {
    server = require('../../index');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: {name: '12345'},
      numberInStock: 10,
    });
    await movie.save();


    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },

      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });

    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await Movie.deleteMany({});
    await server.close();
  });

  it('should return 401 if user not logged in', async () => {
    token = '';
    const response = await exec()

    expect(response.status).toBe(401);
  });

  it('should return 400 if customerId not provided', async () => {
    customerId = ''
    const response = await exec();

    expect(response.status).toBe(400);
  });

  it('should return 400 if movieId not provided', async () => {
    movieId = ''
    const response = await exec();
    expect(response.status).toBe(400);
  });

  it('should return 404 if no rental found for customer/movie', async () => {
    await Rental.deleteMany({});

    const response = await exec();
    expect(response.status).toBe(404);
  });

  it('should return 400 if return is already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const response = await exec();
    expect(response.status).toBe(400);
  });

  it('should return 200 if we have a valid request', async () => {
    const response = await exec();
    expect(response.status).toBe(200);
  });

  it('should set the returnDate if input is valid', async () => {
    const response = await exec();
    const rentalInDB = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDB.dateReturned;

    expect(diff).toBeLessThan(10 * 1000);
  });

  it('should set the rentalFee if input is valid', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    const response = await exec();
    const rentalInDB = await Rental.findById(rental._id);

    expect(rentalInDB.rentalFee).toBe(14);
  });

  it('should increase the movie stock if input is valid', async () => {
    await rental.save();

    const response = await exec();
    const movieInDB = await Movie.findById(movieId);

    expect(movieInDB.numberInStock).toBe(movie.numberInStock + 1);
  });

  it('should return the rental if input is valid', async () => {
    const res = await exec();
    const rentalInDB = await Rental.findById(rental._id);

    // expect(res.body).toHaveProperty('dateOut');
    // expect(res.body).toHaveProperty('dateReturned');
    // expect(res.body).toHaveProperty('rentalFee');
    // expect(res.body).toHaveProperty('customer');
    // expect(res.body).toHaveProperty('movie');

    expect(Object.keys(res.body))
    .toEqual(expect  .arrayContaining(([
      'dateOut',
      'dateReturned',
      'rentalFee',
      'customer',
      'movie',
    ])));
  });
});