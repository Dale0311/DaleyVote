import User from '../models/Users.model.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
  const { name, email, password, imageUrl } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400);
    return next(new Error('Fields: name, email and password are required'));
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    res.status(409);
    return next(new Error('Email already exist'));
  }

  const hashPwd = await bcrypt.hash(password, 12);

  try {
    const data = await User.create({
      name,
      email,
      password: hashPwd,
      imageUrl: imageUrl || '',
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    next(new Error('something went wrong in saving your credentials mate'));
  }
};
