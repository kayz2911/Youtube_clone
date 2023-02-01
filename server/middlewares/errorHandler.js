const { errorResponse } = require("../configs/route.config");

function errorHandler(err, req, res, next) {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || errorResponse.DEFAULT_500_ERROR;
  return res.status(status).json({
    success: false,
    status,
    message,
  });
}

module.exports = errorHandler;
