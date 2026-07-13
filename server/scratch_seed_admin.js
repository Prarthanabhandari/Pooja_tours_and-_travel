const db = require('./db');

async function seedAdmin() {
  try {
    // Check if admin exists
    const res = await db.query('SELECT * FROM users WHERE email = $1', ['admin@example.com']);
    if (res.rows.length === 0) {
      await db.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5)",
        ['Pooja Admin', 'admin@example.com', 'adminpassword', '9999999999', 'admin']
      );
      console.log('✅ Admin user successfully seeded in PostgreSQL database.');
    } else {
      console.log('ℹ️ Admin user already exists in PostgreSQL database.');
    }
  } catch (err) {
    console.error('❌ Failed to seed admin user in PostgreSQL:', err);
  } finally {
    if (db.pool) {
      await db.pool.end();
    }
    process.exit(0);
  }
}

seedAdmin();
