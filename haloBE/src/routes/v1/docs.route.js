/**
 * This file sets up Swagger documentation for the API endpoints.
 *
 * How it works:
 * 1. Imports required packages:
 *    - express: For routing
 *    - swagger-jsdoc: Converts JSDoc comments to Swagger/OpenAPI spec
 *    - swagger-ui-express: Creates UI for viewing API docs
 *
 * 2. Configures Swagger:
 *    - Uses swaggerDefinition from ../../docs/swaggerDef for base config
 *    - Scans files matching 'src/docs/*.yml' and 'src/routes/v1/*.js' for API docs
 *
 * 3. Sets up routes:
 *    - Serves Swagger UI at the root path ('/')
 *    - Enables API explorer in the UI
 */

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('../../docs/swaggerConfig');

const router = express.Router();

const specs = swaggerJsdoc(swaggerConfig);

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
