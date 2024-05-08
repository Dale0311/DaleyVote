import User from '../models/Users.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

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
      imageUrl: '',
    });
    const { password, ...props } = data._doc;

    // generate jwt token and set it to res.cookie
    const id = props._id.toString();
    generateToken(id, res);
    res.status(201).json(props);
  } catch (error) {
    next(new Error('Something went wrong in the server'));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  await new Promise(() => setTimeout(() => {}, 2000));
  if (!email || !password) {
    res.status(400);
    return next(new Error('Email and password are required'));
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    res.status(404);
    return next(new Error("Email doesn't exist"));
  }

  // validate password
  bcrypt.compare(password, userExist.password, (err, success) => {
    if (!success) {
      res.status(401);
      return next(new Error('Email or password is incorrect'));
    }

    const { password: pass, ...data } = userExist._doc;
    const id = data._id.toString();

    // generate jwt token and set it to res.cookie
    generateToken(id, res);
    console.log(data);
    console.log('-----------------------------');
    console.log(success);
    res.json(data);
  });
};
