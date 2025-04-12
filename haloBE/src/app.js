/*
This is the main application file that sets up our Express server with various middleware and configurations.
Let me break it down with examples:

1. Security Features:
- helmet: Adds security headers (like preventing XSS attacks)
  Example: Automatically adds headers like X-XSS-Protection

- xss-clean: Sanitizes user input to prevent cross-site scripting
  Example: Converts <script>alert('hack')</script> to harmless text

- mongoSanitize: Prevents MongoDB injection
  Example: Converts {$gt: ''} to {gt: ''} in query parameters

2. Request Processing:
- express.json(): Handles JSON request bodies
  Example: Parses {"name": "John"} into a JavaScript object

- express.urlencoded(): Handles form submissions
  Example: Parses form data like name=John&age=30

3. Performance & Compatibility:
- compression: Compresses responses to reduce size
  Example: Reduces a 100KB response to maybe 20KB

- cors: Allows cross-origin requests
  Example: Lets a frontend at example.com call this API at api.example.com

4. Authentication:
- passport: Handles JWT authentication
  Example: Validates tokens in Authorization: Bearer <token> headers

5. Rate Limiting:
- authLimiter: Prevents brute force attacks
  Example: Limits to 20 failed login attempts per 1 hour

6. Error Handling:
- Converts unknown routes to 404 errors
  Example: /api/unknown returns "Not found" error

- Standardizes error responses
  Example: All errors return {statusCode, message, stack}
*/

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Allow requests only from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow sending cookies and credentials
};

/***
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
*/

// enable cors
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
