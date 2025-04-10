const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { settingsService } = require('../services');

// Create a new setting
const createSetting = catchAsync(async (req, res) => {
  const setting = await settingsService.createSetting(req.body);
  res.status(httpStatus.CREATED).send(setting);
});

// Get settings with filters and pagination
const getSettings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['node', 'type', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await settingsService.querySettings(filter, options);
  res.send(result);
});

// Get a setting by ID
const getSetting = catchAsync(async (req, res) => {
  const setting = await settingsService.getSettingById(req.params.settingId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Setting not found');
  }
  res.send(setting);
});

// Update a setting
const updateSetting = catchAsync(async (req, res) => {
  const updated = await settingsService.updateSettingById(req.params.settingId, req.body);
  res.send(updated);
});

// Delete a setting
const deleteSetting = catchAsync(async (req, res) => {
  await settingsService.deleteSettingById(req.params.settingId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all settings for a node
const deleteAllSettingsForNode = catchAsync(async (req, res) => {
  const nodeId = req.params.nodeId;
  const result = await settingsService.deleteAllSettingsForNode(nodeId);
  res.status(httpStatus.OK).json({
    message: `All settings for node ${nodeId} deleted.`,
    deletedCount: result.deletedCount,
  });
});

// Assign datapoints and reports to a setting
const assignDatapointsAndReports = catchAsync(async (req, res) => {
  const settingId = req.params.settingId;
  const { datapoints, reports } = req.body;
  const result = await settingsService.assignDatapointsAndReports(settingId, datapoints, reports);
  res.send(result);
});

module.exports = {
  createSetting,
  getSettings,
  getSetting,
  updateSetting,
  deleteSetting,
  deleteAllSettingsForNode,
  assignDatapointsAndReports,
};
