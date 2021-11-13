const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const courses  = require('./routes/courses')
const home = require('./routes/home');
const express = require('express');
const app = express();

//custom Middlewares
const log = require('./middleware/logger')
const auth = require('./middleware/auth')

app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(log);
app.use(auth);
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home);
console.log('App Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if(app.get('env') === 'development') {
  app.use(morgan('tiny'))
  debug('Morgan Enabled...');
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listenning... ${port}`));