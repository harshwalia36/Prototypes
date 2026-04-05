// FILE: server.js
const express = require('express');

const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Health check (optional but useful)
app.get('/health', (req, res) => {
  res.send('Server is running 🚀');
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});