const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

/**
 * Register a new user
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {string} req.body.name - User's name
 * @returns {Object} {user, tokens}
 * @example
 * POST /auth/register
 * {
 *   "email": "user@example.com",
 *   "password": "password123",
 *   "name": "John Doe"
 * }
 */

// const register = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.status(httpStatus.CREATED).send({ user, tokens });
// });

const register = catchAsync(async (req, res) => {
  // Create user with otpVerified = false
  const user = await userService.createUser({ ...req.body, otpVerified: false });

  // Generate and send OTP
  await authService.sendUserOtp(user);

  // Do not send tokens yet — user must verify OTP first
  res.status(httpStatus.CREATED).send({
    message: 'Registration successful. Please check your email for the OTP.',
    user: {
      email: user.email,
      name: user.name,
      otpVerified: user.otpVerified,
    },
  });
});




/**
 * Login with email and password
 * @param {Object} req.body
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @returns {Object} {user, tokens}
 * @example
 * POST /auth/login
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

/**
 * Logout user by invalidating refresh token
 * @param {Object} req.body
 * @param {string} req.body.refreshToken - Refresh token to invalidate
 * @example
 * POST /auth/logout
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Refresh auth tokens
 * @param {Object} req.body
 * @param {string} req.body.refreshToken - Refresh token
 * @returns {Object} {access, refresh} New token pair
 * @example
 * POST /auth/refresh-tokens
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

/**
 * Send reset password email
 * @param {Object} req.body
 * @param {string} req.body.email - Email address to send reset link
 * @example
 * POST /auth/forgot-password
 * {
 *   "email": "user@example.com"
 * }
 */
const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Reset password
 * @param {string} req.query.token - Reset password token
 * @param {Object} req.body
 * @param {string} req.body.password - New password
 * @example
 * POST /auth/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * {
 *   "password": "newpassword123"
 * }
 */
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Send verification email
 * @param {Object} req.user - Authenticated user object
 * @example
 * POST /auth/send-verification-email
 * Authorization: Bearer <access_token>
 */
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Verify email
 * @param {string} req.query.token - Email verification token
 * @example
 * POST /auth/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});


/**
 * Verify OTP controller
 */

const verifyOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const { success, user } = await authService.verifyOtp(email, otp);
  if (success) {
    return res.status(httpStatus.OK).send({
      message: 'OTP verified successfully',
    });
  }
  console.log('OTP verification failed');
  return res.status(httpStatus.BAD_REQUEST).send({
    message: 'OTP verification failed',
  });
});



/**
 * Resend OTP controller
 */
const resendOtp = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.otpVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already verified');
  }
  const result  = await authService.sendUserOtp(user);
  console.log(result)
  res.status(httpStatus.OK).send({ message: 'OTP resent successfully' });
});


module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyOtp,
  resendOtp,
};
