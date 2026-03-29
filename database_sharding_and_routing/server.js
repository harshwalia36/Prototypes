// FILE: server.js
const express = require('express');

const app = express();
app.use(express.json());

const { shard1, shard2 } = require('./dbConnections');
const { getShard } = require('./shardRouter');

// API to fetch user by ID
app.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const shard = getShard(userId);

  try {
    const userID = req.params.id;

    const shard = getShard(userID);

    const result = await shard.query(
      'SELECT * FROM users WHERE userID = $1',
      [userID]
    );

    res.json(result.rows[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API to create a new user
app.post('/users', async (req, res) => {
  const { userID, name, email } = req.body;
  const shard = getShard(userID);

  try {
    await shard.query(
      "INSERT INTO users(userID, name, email) VALUES($1, $2, $3)",
      [userID, name, email]
    );
    console.log("Routing user", userID);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function testConnections() {
  try {
    const res1 = await shard1.query('SELECT current_database()');
    console.log('Shard1 DB:', res1.rows[0]);

    const res2 = await shard2.query('SELECT current_database()');
    console.log('Shard2 DB:', res2.rows[0]);

  } catch (err) {
    console.error('Error:', err);
  }
}



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testConnections().catch(err => console.error('Failed to connect to shards:', err));
});