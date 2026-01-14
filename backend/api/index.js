const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Allow all origins in development, or restrict as needed
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Vercel routes /api/* to api/index.js, and Express receives the full path including /api
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint for debugging
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend API is running',
    availableRoutes: [
      'GET /api/hello',
      'GET /api/health'
    ]
  });
});

// Export the Express app for Vercel
module.exports = app;

