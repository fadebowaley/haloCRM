
/**
 * A utility function that wraps async route handlers to handle errors automatically
 *
 * This function takes an async route handler and returns a new function that:
 * 1. Executes the handler
 * 2. Automatically catches any errors
 * 3. Passes errors to Express error handling middleware
 *
 * Example usage:
 *
 * // Without catchAsync:
 * app.get('/users', async (req, res, next) => {
 *   try {
 *     const users = await User.find();
 *     res.json(users);
 *   } catch (err) {
 *     next(err);
 *   }
 * });
 *
 * // With catchAsync:
 * app.get('/users', catchAsync(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 *
 * @param {Function} fn - The async route handler function to wrap
 * @returns {Function} - Express middleware function that handles errors
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
