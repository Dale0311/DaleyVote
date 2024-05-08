import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  // console.log(userId);
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: '3d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // this is executed from r to l
    sameSite: 'None',
    secure: true,
  });
};
