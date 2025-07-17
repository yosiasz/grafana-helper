// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // or "2.0"
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Paths to your route files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
