import jwt from 'jsonwebtoken';

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  console.log(statusCode);
  res.status(statusCode).json({ success: false, message: err.message });
};

export const requireToken = (req, res, next) => {
  const auth = req.headers?.authorization;

  // validate if token exist
  if (!auth) {
    res.status(401);
    return next(new Error('Unauthorized'));
  }

  // verify if token secret is the same to our secret in .env
  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    // if valid
    if (err) {
      res.status(403);
      return next(new Error('Forbidden'));
    }

    // if valid
    req.currentUser = decoded;
    next();
  });
};
