const { logger } = require('../utils/logger');

const ERROR_CODES = {
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

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
  errorHandler,
  ERROR_CODES
}
