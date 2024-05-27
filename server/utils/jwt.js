import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN, {
    expiresIn: "3d",
  });
  return token;
};
