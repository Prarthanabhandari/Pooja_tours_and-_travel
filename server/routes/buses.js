const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/buses/search
// @desc    Search for buses matching routes
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to) {
    return res.status(400).json({ message: 'From and To locations are required' });
  }

  try {
    // Perform lookup
    const result = await db.query(
      'SELECT * FROM buses WHERE route_from = $1 AND route_to = $2',
      [from, to]
    );

    // If query returned rows, return them, else return a list of general buses to make UI look good
    if (result.rows.length > 0) {
      return res.json(result.rows);
    }

    // Fallback: If no direct route matches in postgres, return mock query list
    const fallbackResult = await db.query('SELECT * FROM buses', []);
    const matchingFallbacks = fallbackResult.rows.filter(bus => 
      bus.route_from.toLowerCase().includes(from.toLowerCase()) && 
      bus.route_to.toLowerCase().includes(to.toLowerCase())
    );

    res.json(matchingFallbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error searching buses' });
  }
});

// @route   GET api/buses
// @desc    Get all buses
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM buses', []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching buses' });
  }
});

module.exports = router;
