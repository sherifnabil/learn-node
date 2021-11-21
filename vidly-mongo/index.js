const express = require('express');
const app = express();

require('./startup/logging')(); // put first just incase in loading other modules would log that error and terminate the process
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); // should be done with winston