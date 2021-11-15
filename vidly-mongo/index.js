const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected....'))
  .catch((e) => console.log('Error ', e))


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));