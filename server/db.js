const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Configuration details
const dbConfig = {
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'pooja_travels'}`,
  ssl: isProduction ? { rejectUnauthorized: false } : false
};

let pool = null;
let useMockDb = false;

// Path for local file-based mock database fallback
const mockDbPath = path.join(__dirname, 'mock_db.json');

// Initialize Mock DB file if it doesn't exist
const initializeMockDb = () => {
  if (!fs.existsSync(mockDbPath)) {
    const initialData = {
      users: [
        { id: 1, name: "Test User", email: "test@example.com", password: "password123", phone: "9876543210", role: "user" }
      ],
      cabs: [
        { id: 1, type: "Hatchback", name: "Maruti Suzuki WagonR", price_per_km: 11.00, seating_capacity: 4, image_url: "hatchback.png" },
        { id: 2, type: "SUV", name: "Maruti Suzuki Brezza", price_per_km: 14.00, seating_capacity: 4, image_url: "brezza.png" },
        { id: 3, type: "Bus", name: "Pooja Luxury Traveler (17-seater)", price_per_km: 22.00, seating_capacity: 17, image_url: "traveller.png" }
      ],
      buses: [
        { id: 1, name: "Pooja Travels Luxury Coach 1", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 750.00, departure_time: "06:00:00", arrival_time: "10:00:00", route_from: "Pune, Maharashtra, India", route_to: "Mumbai, Maharashtra, India" },
        { id: 2, name: "Pooja Travels Luxury Coach 2", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 600.00, departure_time: "07:30:00", arrival_time: "11:30:00", route_from: "Pune, Maharashtra, India", route_to: "Mahabaleshwar, Maharashtra, India" },
        { id: 3, name: "Pooja Travels Luxury Coach 3", type: "17-Seater AC Luxury", total_seats: 17, price_per_seat: 700.00, departure_time: "08:00:00", arrival_time: "13:30:00", route_from: "Pune, Maharashtra, India", route_to: "Shirdi, Maharashtra, India" }
      ],
      bookings: [],
      contact_messages: []
    };
    fs.writeFileSync(mockDbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
};

const getMockData = () => {
  initializeMockDb();
  return JSON.parse(fs.readFileSync(mockDbPath, 'utf-8'));
};

const saveMockData = (data) => {
  fs.writeFileSync(mockDbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// Test PG database connection
try {
  pool = new Pool(dbConfig);
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.warn('⚠️  PostgreSQL connection failed. Falling back to File-based Mock Database (mock_db.json).');
      console.warn('   Ensure PostgreSQL is running and DB_USER/DB_PASSWORD env vars are set correctly if you wish to use PostgreSQL.');
      useMockDb = true;
    } else {
      console.log('✅  PostgreSQL connected successfully:', res.rows[0].now);
    }
  });
} catch (e) {
  console.warn('⚠️  PostgreSQL initialization failed. Falling back to File-based Mock DB.');
  useMockDb = true;
}

// Custom Query Wrapper
const query = async (text, params) => {
  if (useMockDb) {
    return handleMockQuery(text, params);
  }
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Database query error:', err.message);
    throw err;
  }
};

// Mock Query Resolver for typical CRUD queries
const handleMockQuery = (text, params = []) => {
  console.log(`[MOCK DB QUERY]: ${text.substring(0, 100)}... Params:`, params);
  const data = getMockData();
  const normalizedText = text.replace(/\s+/g, ' ').trim().toLowerCase();

  // 1. Get all Cabs
  if (normalizedText.includes('select * from cabs') || normalizedText.includes('select*from cabs')) {
    return { rows: data.cabs };
  }

  // 2. Get Buses matching routes
  if (normalizedText.includes('select * from buses') && normalizedText.includes('route_from') && normalizedText.includes('route_to')) {
    const fromVal = params[0]?.toLowerCase().trim();
    const toVal = params[1]?.toLowerCase().trim();
    const filteredBuses = data.buses.filter(b => 
      b.route_from.toLowerCase().includes(fromVal) && b.route_to.toLowerCase().includes(toVal)
    );
    return { rows: filteredBuses };
  }

  // 3. User Register & Login check
  if (normalizedText.includes('select * from users') && normalizedText.includes('email = $1')) {
    const emailVal = params[0]?.toLowerCase().trim();
    const user = data.users.find(u => u.email.toLowerCase() === emailVal);
    return { rows: user ? [user] : [] };
  }

  if (normalizedText.includes('insert into users')) {
    // INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *
    const newUser = {
      id: data.users.length + 1,
      name: params[0],
      email: params[1],
      password: params[2],
      phone: params[3],
      role: 'user',
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    saveMockData(data);
    return { rows: [newUser] };
  }

  // 4. Booking operations
  if (normalizedText.includes('insert into bookings')) {
    // params: user_id, booking_type, cab_id, bus_id, route_from, route_to, travel_date, departure_time, amount, status, seats_selected, passenger_details
    // INSERT INTO bookings (user_id, booking_type, cab_id, bus_id, route_from, route_to, travel_date, departure_time, amount, seats_selected, passenger_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
    const newBooking = {
      id: data.bookings.length + 1,
      user_id: params[0] || null,
      booking_type: params[1],
      cab_id: params[2] || null,
      bus_id: params[3] || null,
      route_from: params[4],
      route_to: params[5],
      travel_date: params[6],
      departure_time: params[7],
      amount: parseFloat(params[8]),
      status: 'confirmed',
      seats_selected: params[9] || null,
      passenger_details: typeof params[10] === 'string' ? JSON.parse(params[10]) : params[10],
      created_at: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    saveMockData(data);
    return { rows: [newBooking] };
  }

  if (normalizedText.includes('select * from bookings') || normalizedText.includes('select b.*')) {
    // Return all bookings with optional join data for preview
    // To keep simple, return booking rows and attach vehicle/bus names
    const enrichedBookings = data.bookings.map(b => {
      let vehicle_name = '';
      if (b.booking_type === 'bus') {
        const bus = data.buses.find(busItem => busItem.id === b.bus_id);
        vehicle_name = bus ? `${bus.name} (${bus.type})` : 'Pooja Travels Bus';
      } else {
        const cab = data.cabs.find(cabItem => cabItem.id === b.cab_id);
        vehicle_name = cab ? `${cab.name} (${cab.type})` : 'Pooja Travels Cab';
      }
      return { ...b, vehicle_name };
    });
    
    if (normalizedText.includes('user_id = $1')) {
      const userId = params[0];
      const userBookings = enrichedBookings.filter(b => b.user_id === userId || !b.user_id); // Return guest bookings as well for preview simplicity
      return { rows: userBookings };
    }
    return { rows: enrichedBookings };
  }

  if (normalizedText.includes('update bookings set status = $1 where id = $2') || normalizedText.includes('status = \'cancelled\'')) {
    // Cancellation
    // UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *
    const bookingId = params[1] || params[0];
    const index = data.bookings.findIndex(b => b.id === parseInt(bookingId));
    if (index !== -1) {
      data.bookings[index].status = 'cancelled';
      saveMockData(data);
      return { rows: [data.bookings[index]] };
    }
    return { rows: [] };
  }

  // 5. Contact message
  if (normalizedText.includes('insert into contact_messages')) {
    const newMessage = {
      id: data.contact_messages.length + 1,
      name: params[0],
      email: params[1],
      phone: params[2],
      message: params[3],
      created_at: new Date().toISOString()
    };
    data.contact_messages.push(newMessage);
    saveMockData(data);
    return { rows: [newMessage] };
  }

  return { rows: [] };
};

module.exports = {
  query,
  pool,
  getUseMockDb: () => useMockDb
};
