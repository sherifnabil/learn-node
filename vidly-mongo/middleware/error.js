module.exports = function(error, req, res, next) {
  return  res.status(500).send('Something failed.')
}