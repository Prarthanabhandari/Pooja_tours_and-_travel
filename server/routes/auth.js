const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   POST api/auth/register
// @desc    Register a user
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields' });
  }

  try {
    // Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Insert user (In real app, hash password first)
    const result = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone, role',
      [name, email, password, phone || '']
    );

    const user = result.rows[0];
    
    // Send simulated JWT token alongside user details
    res.status(201).json({
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email and password' });
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password (In real app, compare hashed password)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: `mock_jwt_token_${user.id}_${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/auth/users
// @desc    Get all users (Admin)
router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY created_at DESC', []);
    const users = result.rows.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      created_at: u.created_at
    }));
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
});

module.exports = router;
