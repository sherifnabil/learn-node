module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex)
    }
  }
}

// this worked for me too
// function asyncMiddleware(handler) {
//   try {
//     return handler;
//   } catch (ex) {
//     next(ex)
//   }
// }
