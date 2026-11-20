import e from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const route = e.Router();


route.post('/users/register', async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email })

    if (checkUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = await User.create(req.body);

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    }

    res.status(200).json({ user: payload });
    console.log(newUser)
  } catch (err) {
    console.error('failed to create user', err);
    res.status(400).json({ error: 'cannot create user', details: err.message });
  }
});

route.post('/users/login', async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser) {
      return res.status(400).json({ error: 'incorrect email or password' });
    }

    const secret = process.env.JWT_SECRET
    const expiration = '2h';

    const correctPw = await findUser.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "incorrect email or password" });
    }

    const payload = {
      _id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    }

    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });

    res.status(200).json({ token, findUser });
  } catch (err) {
    console.error('failed to login', err);
    res.status(400).json({ error: 'cannot login', details: err.message });
  }
})

export default route;