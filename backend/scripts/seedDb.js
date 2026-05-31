const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'rate_your_novel',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('Seeding database with sample data...');

    // Sample novels
    await client.query(`
      INSERT INTO novels (title, author, description, status, total_chapters, genre)
      VALUES
        ('The Legendary Hero', 'John Smith', 'A tale of a young hero who discovers his destiny', 'ongoing', 150, ARRAY['Fantasy', 'Adventure']),
        ('System Breach', 'Jane Doe', 'A hacker discovers a mysterious system', 'ongoing', 200, ARRAY['Science Fiction', 'Mystery']),
        ('Eternal Realms', 'Bob Johnson', 'Multiple worlds collide in epic fashion', 'completed', 500, ARRAY['Fantasy', 'Action']),
        ('Cultivation Master', 'Alice Chen', 'A disciple of an ancient cultivation sect', 'ongoing', 300, ARRAY['Fantasy', 'Martial Arts']),
        ('Time Traveler''s Paradox', 'Charlie Brown', 'A man discovers the ability to travel through time', 'hiatus', 75, ARRAY['Science Fiction', 'Adventure'])
    `);
    console.log('✓ Sample novels inserted');

    console.log('✓ Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    pool.end();
  }
}

seedDatabase();
