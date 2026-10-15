const express = require('express');
const PNG = require('pngjs').PNG;
const cors = require('cors');
const bodyParser = require('body-parser');
const parse = require('csv').parse;
const fetch = require('node-fetch');

const app = express();
const port = 5000;

require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const routes = require('./routes/routes');

// ============================================================
// CORS ALLOWLIST
// ============================================================

const allowedOrigins = [
  'http://localhost:3230',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',

  // Production frontend servers
  // 'https://myapp.example.com',
  // 'https://www.myapp.example.com',
];

const corsOptions = {
  origin: function (origin, callback) {

    // Allow requests with no Origin header
    // curl, Postman, server-to-server, etc.
    if (!origin) {
      return callback(null, true);
    }

    // Explicit allowlist
    if (allowedOrigins.includes(origin)) {
      console.log(`CORS allowed: ${origin}`);
      return callback(null, true);
    }

    // Reject everything else
    console.warn(`CORS blocked origin: ${origin}`);

    return callback(
      new Error(`Origin ${origin} is not allowed by CORS`)
    );
  },

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
};

// ============================================================
// MIDDLEWARE
// ============================================================

// IMPORTANT:
// CORS MUST be registered BEFORE your routes.
app.use(cors(corsOptions));

// Body parsing
app.use(bodyParser.json());

// Or equivalently:
// app.use(express.json());

// Static files
app.use(express.static('public'));

// ============================================================
// ROUTES
// ============================================================

// Your API routes
app.use('/', routes);

// Swagger docs
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ============================================================
// START SERVER
// ============================================================

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Allowed CORS origins:');
  allowedOrigins.forEach(origin => {
    console.log(`  - ${origin}`);
  });
});