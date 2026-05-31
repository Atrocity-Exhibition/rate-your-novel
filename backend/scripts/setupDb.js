const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('Creating database...');
    await client.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME || 'rate_your_novel'}`);
    await client.query(`CREATE DATABASE ${process.env.DB_NAME || 'rate_your_novel'}`);
    console.log('✓ Database created');
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    client.release();
  }

  // Connect to the new database
  const newPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'rate_your_novel',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  });

  const newClient = await newPool.connect();
  try {
    console.log('Running migrations...');
    const migrationPath = path.join(__dirname, '../src/migrations/001_init.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');
    await newClient.query(sql);
    console.log('✓ Migrations completed');
  } catch (err) {
    console.error('Error running migrations:', err);
  } finally {
    newClient.release();
    newPool.end();
  }

  pool.end();
}

setupDatabase();
