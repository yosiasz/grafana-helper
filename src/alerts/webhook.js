const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});