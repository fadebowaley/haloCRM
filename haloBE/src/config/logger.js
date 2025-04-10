/*
This file sets up logging for our application using Winston logger. Here's what it does:

1. Error Handling:
   - Captures error stack traces and formats them nicely
   Example: If there's an error in user.save(), instead of just "Failed to save",
   it shows the full stack trace with line numbers

2. Log Levels:
   - In development: Shows detailed 'debug' level logs
   - In production: Shows only important 'info' level logs
   Example:
   - Development: "debug: Validating user input"
   - Production: "info: User successfully created"

3. Formatting:
   - Development: Colorized output (errors in red, warnings in yellow)
   - Production: Plain text for better log aggregation
   Example:
   - Development: [32minfo[39m: Server started on port 3000
   - Production: info: Server started on port 3000

4. Output:
   - Prints all logs to console
   - Error logs specifically go to stderr
   Example:
   logger.info('Server started');  // Goes to stdout
   logger.error('Database connection failed');  // Goes to stderr

Usage examples:
logger.info('Connected to MongoDB');
logger.error('Failed to authenticate user');
logger.debug('Processing request payload');
*/

const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
