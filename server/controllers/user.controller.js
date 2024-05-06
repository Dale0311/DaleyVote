import User from '../models/Users.model.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
  const { username, email, password, imageUrl } = req.body;
  // validation
  if (!username || !email || !password) {
    res.status(400);
    return next(new Error('Fields: username, email and password are required'));
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    res.status(409);
    return next(new Error('Email already exist'));
  }

  const hashPwd = await bcrypt.hash(password, 12);

  try {
    const data = await User.create({
      username,
      email,
      password: hashPwd,
      imageUrl: imageUrl || '',
    });
    console.log(data);
    const { password, ...props } = data._doc;
    res.json(props);
    // {
    // "username": "Dale",
    // "imageUrl": "https://culted.com/wp-content/uploads/2021/08/eminem-feature-scaled.jpg",
    // "email": "Ddddale25@email.com",
    // "_id": "6638dc5e618d8f129036369c",
    // "createdAt": "2024-05-06T13:34:22.733Z",
    // "updatedAt": "2024-05-06T13:34:22.733Z",
    // "__v": 0
    // }
  } catch (error) {
    console.log(error);
    next(new Error('something went wrong in saving your credentials mate'));
  }
};
