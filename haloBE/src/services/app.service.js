const httpStatus = require('http-status');
const { App } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new app
 * @param {Object} appBody
 * @returns {Promise<App>}
 */
const createApp = async (appBody) => {
  return App.create(appBody);
};

/**
 * Bulk create apps for tenant/user
 * @param {Array} appArray
 * @returns {Promise<Array<App>>}
 */
const bulkCreateApps = async (appArray) => {
  return App.insertMany(appArray);
};

/**
 * Assign an app to a user or tenant
 * @param {ObjectId} appId
 * @param {Object} assignmentData
 * @returns {Promise<App>}
 */
const assignApp = async (appId, assignmentData) => {
  const app = await getAppById(appId);
  if (!app) {
    throw new ApiError(httpStatus.NOT_FOUND, 'App not found');
  }
  Object.assign(app, assignmentData);
  return app.save();
};

/**
 * Get app by ID
 * @param {ObjectId} id
 * @returns {Promise<App>}
 */
const getAppById = async (id) => {
  return App.findById(id);
};

/**
 * Query apps by filter and options
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryApps = async (filter, options) => {
  return App.paginate(filter, options);
};

/**
 * Get all apps for a user or tenant
 * @param {ObjectId} tenantId
 * @param {ObjectId} userId
 * @returns {Promise<Array<App>>}
 */
const getAppsForTenantOrUser = async (tenantId, userId) => {
  const query = {
    ...(tenantId && { tenantId }),
    ...(userId && { userId }),
  };
  return App.find(query);
};

/**
 * Enable or disable an app
 * @param {ObjectId} appId
 * @param {Boolean} isActive
 * @returns {Promise<App>}
 */
const toggleAppStatus = async (appId, isActive) => {
  const app = await getAppById(appId);
  if (!app) {
    throw new ApiError(httpStatus.NOT_FOUND, 'App not found');
  }
  app.isActive = isActive;
  return app.save();
};

/**
 * Update app by ID
 * @param {ObjectId} appId
 * @param {Object} updateBody
 * @returns {Promise<App>}
 */
const updateAppById = async (appId, updateBody) => {
  const app = await getAppById(appId);
  if (!app) {
    throw new ApiError(httpStatus.NOT_FOUND, 'App not found');
  }
  Object.assign(app, updateBody);
  await app.save();
  return app;
};

/**
 * Delete app by ID
 * @param {ObjectId} appId
 * @returns {Promise<App>}
 */
const deleteAppById = async (appId) => {
  const app = await getAppById(appId);
  if (!app) {
    throw new ApiError(httpStatus.NOT_FOUND, 'App not found');
  }
  await app.remove();
  return app;
};

/**
 * Delete all apps for a tenant
 * @param {ObjectId} tenantId
 * @returns {Promise}
 */
const deleteAppsByTenant = async (tenantId) => {
  return App.deleteMany({ tenantId });
};

module.exports = {
  createApp,
  bulkCreateApps,
  getAppById,
  queryApps,
  assignApp,
  getAppsForTenantOrUser,
  toggleAppStatus,
  updateAppById,
  deleteAppById,
  deleteAppsByTenant,
};
