const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ username, email, password: hashedPassword });
  
      // Create a JWT token for the user
      const token = jwt.sign({ userId: newUser._id }, config.JWT_SECRET, { expiresIn: '1h' });
  
      // Respond with success message and token
      res.status(201).json({
        message: 'User registered successfully',
        userId: newUser._id,
        token: token, // Send the token back to the client
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the entered password with the hashed password in DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated Token:', token);
      
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  };
  
