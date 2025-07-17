const fs = require('fs');
const http2 = require('http2');
const express = require('express');
const apiRoutes = require('./routes/routes');

const app = express();
const PORT = 1914;

// Middleware: Add error listeners to req/res
app.use((req, res, next) => {
  req.on('error', err => {
    console.error('Request error:', err);
  });
  res.on('error', err => {
    console.error('Response error:', err);
  });
  next();
});

// Middleware to parse JSON safely
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// SSL certs
const options = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.crt')
};

// Create the HTTP/2 secure server
const server = http2.createSecureServer(options, app);

// Handle top-level server errors
server.on('error', (err) => {
  console.error('HTTP/2 server error:', err);
});

server.listen(PORT, () => {
  console.log(`HTTP/2 Express server running at https://localhost:${PORT}`);
});
