const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    // Check if user exists (optimized query)
    const userExists = await User.exists({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    // Hash password (optimized with async/await)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user (optimized single operation)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      number,
      password: hashedPassword
    });

    // Generate token (optimized with async sign)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { 
      expiresIn: '1d',
      algorithm: 'HS256' // Specify algorithm for faster processing
    });

    res.status(201).json({
      token,
      user: formatUser(newUser),
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Optimized query to only get necessary fields
    const user = await User.findOne({ email })
      .select('+password') // Include password for verification
      .lean(); // Return plain JS object for faster processing

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords (optimized)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate token (optimized)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256'
    });

    // Remove password before sending response
    delete user.password;

    res.status(200).json({
      token,
      user: formatUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

module.exports = { register, login };