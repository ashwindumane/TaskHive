const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to format user data
const formatUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  number: user.number,
});

const register = async (req, res) => {
  const { firstName, lastName, email, password, number } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({  firstName,
      lastName,
      email,

      number,
      password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: formatUser(newUser),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Incoming login request:", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email not Found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: formatUser(user),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};





module.exports = { register, login};
