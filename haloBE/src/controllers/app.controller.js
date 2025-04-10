const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { appService } = require('../services');

// Create a new app
const createApp = catchAsync(async (req, res) => {
  const app = await appService.createApp(req.body, req.user);
  res.status(httpStatus.CREATED).send(app);
});

// Bulk create apps
const bulkCreateApps = catchAsync(async (req, res) => {
  const apps = await appService.bulkCreateApps(req.body.appsArray, req.user);
  res.status(httpStatus.CREATED).json({
    message: `${apps.length} apps successfully created.`,
    data: apps,
  });
});

// Get an app by ID
const getAppById = catchAsync(async (req, res) => {
  const app = await appService.getAppById(req.params.appId);
  if (!app) {
    throw new ApiError(httpStatus.NOT_FOUND, 'App not found');
  }
  res.send(app);
});

// Query apps
const queryApps = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await appService.queryApps(filter, options);
  res.send(result);
});

// Assign app to user or node
const assignApp = catchAsync(async (req, res) => {
  const result = await appService.assignApp(req.body.appId, req.body.entityId, req.body.entityType);
  res.send(result);
});

// Get apps for tenant or user
const getAppsForTenantOrUser = catchAsync(async (req, res) => {
  const result = await appService.getAppsForTenantOrUser(req.user);
  res.send(result);
});

// Toggle app status (active/inactive)
const toggleAppStatus = catchAsync(async (req, res) => {
  const result = await appService.toggleAppStatus(req.params.appId, req.body.status);
  res.send(result);
});

// Update app by ID
const updateAppById = catchAsync(async (req, res) => {
  const updated = await appService.updateAppById(req.params.appId, req.body);
  res.send(updated);
});

// Delete app by ID
const deleteAppById = catchAsync(async (req, res) => {
  await appService.deleteAppById(req.params.appId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all apps for a tenant
const deleteAppsByTenant = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const result = await appService.deleteAppsByTenant(tenantId);
  res.status(httpStatus.OK).json({
    message: result.message,
    deletedCount: result.deletedCount,
  });
});

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
