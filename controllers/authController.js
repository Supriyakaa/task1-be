const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const db = require('../config/db');

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, hashedPassword, role);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error signing up' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {

    const userId = req.user.id; 

    const result = await db.query('SELECT id, username, role FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to retrieve user information' });
  }
};