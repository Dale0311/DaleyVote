import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
  // console.log(userId);
  const token = jwt.sign(data, process.env.ACCESS_TOKEN, {
    expiresIn: '3d',
  });
  return token;
  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   maxAge: 3 * 24 * 60 * 60 * 1000, // this is executed from r to l
  //   sameSite: 'None',
  //   secure: true,
  // });
};
