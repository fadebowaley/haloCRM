const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDef');

/**
 * Swagger configuration
 */
const swaggerConfig = {
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
};

module.exports = swaggerConfig;
