function logErrors (err, req, res, next) {
  console.log('logErrors log');
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  console.log('errorHandler log');
  res.status(503).json({
    message: err.message,
    stack: err.stack
  })
}



module.exports = { logErrors, errorHandler }
