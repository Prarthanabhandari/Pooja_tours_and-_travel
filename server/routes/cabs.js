const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET api/cabs
// @desc    Get all cab fleet details
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cabs ORDER BY price_per_km ASC', []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching cabs' });
  }
});

// @route   POST api/cabs/estimate
// @desc    Calculate cab booking fare estimates
router.post('/estimate', async (req, res) => {
  const { from, to, type } = req.body;

  if (!from || !to || !type) {
    return res.status(400).json({ message: 'From, To, and Cab Type are required' });
  }

  try {
    // Get cab details
    const cabResult = await db.query('SELECT * FROM cabs WHERE type = $1', [type]);
    if (cabResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cab type not found' });
    }

    const cab = cabResult.rows[0];

    // Simulate distance calculation.
    // In a real app, use Google Maps Distance Matrix API.
    // For demo/reference, assign approximate distances for common pairs:
    let distance = 150; // default (e.g. Pune to Mumbai is ~150km)
    
    const routeKey = `${from.toLowerCase()}_${to.toLowerCase()}`;
    if (routeKey.includes('pune') && routeKey.includes('mumbai')) {
      distance = 150;
    } else if (routeKey.includes('pune') && routeKey.includes('shirdi')) {
      distance = 185;
    } else if (routeKey.includes('pune') && routeKey.includes('mahabaleshwar')) {
      distance = 120;
    } else if (routeKey.includes('pune') && routeKey.includes('nashik')) {
      distance = 210;
    } else if (routeKey.includes('pune') && routeKey.includes('alibaug')) {
      distance = 145;
    } else if (routeKey.includes('pune') && routeKey.includes('bhimashankar')) {
      distance = 110;
    }

    // Driver allowance (e.g., ₹250 as seen in reference variables: default_allowance = '250.00')
    const driverAllowance = 250;
    const fare = (distance * cab.price_per_km) + driverAllowance;

    res.json({
      from,
      to,
      cab_type: cab.type,
      cab_name: cab.name,
      distance_km: distance,
      price_per_km: cab.price_per_km,
      driver_allowance: driverAllowance,
      estimated_fare: fare
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error calculating cab estimate' });
  }
});

module.exports = router;
