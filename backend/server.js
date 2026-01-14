const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in production, or restrict as needed
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root API endpoint for convenience
app.get('/api', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend API is running',
    availableRoutes: [
      '/api/hello',
      '/api/health'
    ]
  });
});

// Serve test JSON file to verify frontend-backend communication
app.get('/api/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'test-data.json');
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const json = JSON.parse(raw);
    res.json(json);
  } catch (err) {
    console.error('Error reading test data:', err);
    res.status(500).json({ error: 'Failed to load test data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

