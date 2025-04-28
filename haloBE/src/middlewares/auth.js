const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Role = require('../models/role.model');
const ownerResourceBundle = require('../scripts/permissions/ownerResource.json').ownerResourceBundle;


const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;


  if (user.isSuper) {
    return resolve();
  }

  // Handle Owner role check
  if (user.isOwner) {
    console.log('User is an Owner. Checking resource-based permissions with regex matching...');

    // Precompile regex patterns for resource matching
    const resourceRegexMap = new Map();
    // Regex to match the resource part of the required right (after the first colon and before any other colons)
    const resourceRegex = /^[a-zA-Z]+:([a-zA-Z]+)/;

    requiredRights.forEach((right) => {
      // Extract the resource part from each right using regex
      const match = right.match(resourceRegex);

      if (match) {
        const resource = match[1]; // The part after the colon (e.g., 'user', 'payment')

        console.log(`Action: Resource = ${resource}`);

        // If the resource is valid and hasn't been added to the map, create the regex for it
        if (resource && !resourceRegexMap.has(resource)) {
          const regex = new RegExp(`(^|:|-)${resource}($|:|-)`, 'i');
          resourceRegexMap.set(resource, regex);
        }
      }
    });

    // Check if the user has access to all required resources based on the regex patterns
    const hasAccessToAllResources = requiredRights.every((right) => {
      let matchedResource = null;

      // Match each right to the precompiled regex for the resource
      for (const [resource, regex] of resourceRegexMap) {
        if (regex.test(right)) {
          matchedResource = resource;
          break;
        }
      }

      if (!matchedResource) {
        console.log(`Owner missing permission for action: ${right}`);
        return false;
      }

      // Check if the matched resource is in the owner's allowed resource bundle
      const hasResourceAccess = ownerResourceBundle.includes(matchedResource);

      if (!hasResourceAccess) {
        console.log(`Resource ${matchedResource} is not in Owner's allowed bundle.`);
      }

      return hasResourceAccess;
    });

    if (!hasAccessToAllResources) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Owner does not have access to this resource'));
    }

    return resolve();
  }

  // Handle regular user role check (if needed)
  console.log('User is a regular user. Checking name-based permissions...');

  // Fast lookup for regular users
  const userRoles = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
  const userPermissions = userRoles.flatMap((role) => role.permissions);
  const userPermissionNames = new Set(userPermissions.map((p) => p.name));

  const hasWildcardPermission = userPermissionNames.has('*');

  const hasRequiredRights = requiredRights.every((right) => {
    return userPermissionNames.has(right) || hasWildcardPermission;
  });

  if (!hasRequiredRights) {
    return reject(new ApiError(httpStatus.FORBIDDEN, `Missing required permissions: ${requiredRights.join(', ')}`));
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
