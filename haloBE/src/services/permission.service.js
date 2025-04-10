const httpStatus = require('http-status');
const { Permission } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a permission
 * @param {Object} permissionBody - Permission data
 * @returns {Promise<Permission>}
 */

const createPermission = async (permissionBody, user) => {
  const { name, method, path } = permissionBody;
  const { isSuper, hasPermissionToCreatePermission } = user || {};

  // Check if the user has permission to create a permission
  if (!isSuper && !hasPermissionToCreatePermission) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to create permissions');
  }

  console.log('look-up',name, method, path);

  // Create the permission (the model will check if it's taken)
  return Permission.createPermission(permissionBody);
};




/**
 * Query permissions with filters and pagination
 * @param {Object} filter - Filter criteria for querying
 * @param {Object} options - Pagination and sort options
 * @returns {Promise<QueryResult>}
 */
const queryPermissions = async (filter, options) => {
  return Permission.paginate(filter, options);
};

/**
 * Get permission by name
 * @param {string} name - Permission name
 * @returns {Promise<Permission>}
 */
const getPermissionByName = async (name) => {
  const permission = await Permission.findByName(name);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  return permission;
};

/**
 * Bulk create permissions
 * @param {Array} permissionsArray - List of permissions to be created
 * @returns {Promise<Permission[]>}
 */
const bulkCreatePermissions = async (permissionsArray) => {
  return Permission.bulkCreatePermissions(permissionsArray);
};

/**
 * Update permission by name
 * @param {string} permissionName - Name of the permission
 * @param {Object} updateBody - Fields to be updated
 * @returns {Promise<Permission>}
 */
const updatePermissionByName = async (permissionName, updateBody) => {
  const permission = await getPermissionByName(permissionName);
  Object.assign(permission, updateBody);
  await permission.save();
  return permission;
};

/**
 * Delete permission by name
 * @param {string} permissionName - Name of the permission
 * @returns {Promise<Permission>}
 */
const deletePermissionByName = async (permissionName) => {
  const permission = await getPermissionByName(permissionName);
  await permission.remove();
  return permission;
};

module.exports = {
  createPermission,
  queryPermissions,
  getPermissionByName,
  bulkCreatePermissions,
  updatePermissionByName,
  deletePermissionByName,
};
