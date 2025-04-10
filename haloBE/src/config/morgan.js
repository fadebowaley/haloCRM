/*
This file sets up request logging for our API using Morgan (an HTTP request logger).
Here's what it does in simple terms:

1. Success Logging:
   Logs successful requests (status codes < 400)
   Example output:
   "GET /api/users 200 - 50ms"
   In production it also shows IP: "192.168.1.1 - GET /api/users 200 - 50ms"

2. Error Logging:
   Logs failed requests (status codes >= 400) with error messages
   Example output:
   "POST /api/login 401 - 20ms - message: Invalid credentials"
   In production: "192.168.1.1 - POST /api/login 401 - 20ms - message: Invalid credentials"

3. Format:
   Each log includes:
   - IP address (in production only)
   - HTTP method (GET, POST, etc)
   - URL path
   - Status code
   - Response time
   - Error message (for errors only)

Usage examples in the app:
app.use(morgan.successHandler);  // Log successful requests
app.use(morgan.errorHandler);    // Log failed requests
*/

const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
