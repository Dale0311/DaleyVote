export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  console.log(statusCode);
  res.status(statusCode).json({ success: false, message: err.message });
};
