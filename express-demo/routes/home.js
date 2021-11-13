const express = require('express');
const router =  express.Router();

router.get('/', (req, res) => {
  // res.send('Hello World');
  res.render('index', {title: 'some Title', message: 'Message'})
});

module.exports = router;