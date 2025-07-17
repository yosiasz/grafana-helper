const express = require('express')
const PNG = require("pngjs").PNG;

const cors = require('cors');
const bodyParser = require('body-parser')
const parse = require('csv').parse
const fetch = require('node-fetch');
const app = express();
const port = 5000;

require('dotenv').config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // path to swaggerSpec
const routes = require("./routes/routes");

// Use the extracted routes
app.use("/", routes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors());

app.options("*", cors());

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
