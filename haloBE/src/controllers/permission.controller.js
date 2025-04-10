const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionService } = require('../services');

/**
 * Create a permission
 */
const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body, req.user);
  res.status(httpStatus.CREATED).send(permission);
});

/**
 * Query permissions
 */
const getPermissions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'resource', 'action']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await permissionService.queryPermissions(filter, options);
  res.send(result);
});

/**
 * Get permission by name
 */
const getPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionByName(req.params.permissionName);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  res.send(permission);
});

/**
 * Update permission by name
 */
const updatePermission = catchAsync(async (req, res) => {
  const permission = await permissionService.updatePermissionByName(req.params.permissionName, req.body);
  res.send(permission);
});

/**
 * Delete permission by name
 */
const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermissionByName(req.params.permissionName);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Bulk create permissions
 */
const bulkCreatePermissions = catchAsync(async (req, res) => {
  const permissions = await permissionService.bulkCreatePermissions(req.body);
  res.status(httpStatus.CREATED).send(permissions);
});

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
  bulkCreatePermissions,
};
