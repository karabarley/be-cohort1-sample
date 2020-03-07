const { logger } = require('../utils/logger');

// We can tell this is a error middleware because this has 4 arguements 
// the first being an error
const errorHandler = (
  err,
  req,
  res,
  next
) => {
  logger.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
};

module.exports = {
  errorHandler
}
