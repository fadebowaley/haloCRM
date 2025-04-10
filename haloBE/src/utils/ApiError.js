/**
 * Custom error class for API errors that includes additional properties like HTTP status codes
 *
 * This class extends the built-in Error class to create API-specific errors.
 * It adds helpful properties for API error handling:
 *
 * Example usage:
 *
 * // Creating a 404 Not Found error
 * throw new ApiError(404, 'User not found');
 *
 * // Creating a 400 Bad Request error
 * throw new ApiError(400, 'Invalid email format');
 *
 * // Creating a 500 Server Error (non-operational)
 * throw new ApiError(500, 'Database connection failed', false);
 *
 * Properties:
 * - statusCode: The HTTP status code (e.g. 404, 400, 500)
 * - message: The error message
 * - isOperational: Whether this is an expected operational error (default true)
 * - stack: The error stack trace
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
