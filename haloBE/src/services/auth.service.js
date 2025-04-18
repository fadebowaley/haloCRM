const moment = require('moment');
const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { sendOtpEmail } = require('./email.service');
const { sendSms, getSmsStatus } = require('./sms.service');
const { User } = require('../models');
const logger = require('../config/logger');

/**
 * Login with username and password
 * Example:
 * const user = await loginUserWithEmailAndPassword('john@example.com', 'password123')
 * // Returns user object if credentials are valid
 * // Throws error if email/password is incorrect
 */

// const loginUserWithEmailAndPassword = async (email, password) => {
//   const user = await userService.getUserByEmail(email);
//   if (!user || !(await user.isPasswordMatch(password))) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
//   }
//   return user;
// };

// const loginUserWithEmailAndPassword = async (email, password) => {
//   const user = await User.findOne({ email });

//   if (!user || !(await user.isPasswordMatch(password))) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
//   }

//   if (!user.otpVerified) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Please verify your account using the OTP sent to your email');
//   }

//   return user;
// };
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!user.otpVerified) {
    const error = new ApiError(httpStatus.UNAUTHORIZED, 'Please verify your account using the OTP sent to your email');
    error.name = 'OtpNotVerified';
    throw error;
  }
  return user;
};

/**
 * Logout by invalidating refresh token
 * Example:
 * await logout('myRefreshToken123')
 * // Finds and removes the refresh token from database
 * // Throws error if token not found
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh authentication tokens using refresh token
 * Example:
 * const tokens = await refreshAuth('myRefreshToken123')
 * // Returns { access: newAccessToken, refresh: newRefreshToken }
 * // Throws error if refresh token is invalid
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset user's password using reset token
 * Example:
 * await resetPassword('resetToken123', 'newPassword123')
 * // Updates user's password and removes all reset tokens
 * // Throws error if reset token is invalid
 */

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    console.log('Verifying reset password token...');
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);

    const userId = resetPasswordTokenDoc.user;
    console.log(`Resetting password for user ID: ${userId}`);

    // Call the static method on the User model
    await User.resetPassword(userId, newPassword);

    console.log('Deleting reset password tokens for the user...');
    await Token.deleteMany({ user: userId, type: tokenTypes.RESET_PASSWORD });

    console.log('Password reset successfully.');
  } catch (error) {
    console.error('Error during password reset:', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify user's email using verification token
 * Example:
 * await verifyEmail('verifyEmailToken123')
 * // Marks user's email as verified and removes verification tokens
 * // Throws error if verification token is invalid
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * Generate a 4-digit OTP
 * @returns {string}
 */

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

/**
 * Send OTP to user via email and update user model
 * @param {Object} user - The user instance
 * @returns {Promise<void>}
 */


const sendUserOtp = async (user) => {
  const otp = generateOtp();
  const update = {
    otp,
    otpExpires: moment().add(10, 'minutes').toDate(),
    otpVerified: false,
  };

  await User.updateOne({ _id: user._id }, update); // No validation issues
  await sendOtpEmail(user.email, otp);
  return { email: user.email, otp };
};


/**
 * Verify user's OTP
 * @param {string} email - The user’s email
 * @param {string} otp - The OTP to verify
 * @returns {Promise<void>}
 */

const verifyOtp = async (email, otp) => {

  const user = await userService.getUserByEmail(email);
  if (!user) {
    return { success: false, user: null };
  }

  const isOtpExpired = moment().isAfter(user.otpExpires);
  const isOtpInvalid = user.otp !== otp;

  if (isOtpInvalid || isOtpExpired) {
    console.log('OTP is either invalid or expired');
    return { success: false, user };
  }

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        otpVerified: true,
        otp: null,
        otpExpires: null,
      },
    }
  );
  return { success: true, user };
};




module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  verifyOtp,
  sendUserOtp,
};
