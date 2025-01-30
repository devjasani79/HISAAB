const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = errorHandler;