const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   POST api/contact
// @desc    Submit a contact inquiry form
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, Email, and Message are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone || '', message]
    );

    res.status(201).json({
      message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
      inquiry: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving contact message' });
  }
});

module.exports = router;
