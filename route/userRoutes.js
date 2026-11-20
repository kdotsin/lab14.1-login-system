import e from "express";
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
})

export default route;