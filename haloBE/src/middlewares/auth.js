const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;


  // ✅ Bypass permission check if isOwner or isSuper is true
  if (user.isOwner || user.isSuper) {
    return resolve(); // Skip role and permission checks
  }

  // Load user's roles and populated permissions
  const userRoles = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
  const userPermissions = userRoles.flatMap((role) => role.permissions.map((p) => p.name)); // e.g., ['view:users', 'create:posts']

  // Check if user has ALL requiredRights (e.g., ['create:posts'])
  const hasRequiredRights = requiredRights.every((right) => userPermissions.includes(right));

  if (!hasRequiredRights) {
    return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };


module.exports = auth;
