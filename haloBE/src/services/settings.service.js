const httpStatus = require('http-status');
const { Setting, Node, DataPoint, Report } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new setting
 * @param {Object} settingBody
 * @returns {Promise<Setting>}
 */
const createSetting = async (settingBody) => {
  const node = await Node.findById(settingBody.nodeId);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }

  return Setting.create(settingBody);
};

/**
 * Query for settings
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const querySettings = async (filter, options) => {
  return Setting.paginate(filter, options);
};

/**
 * Get setting by ID
 * @param {ObjectId} id
 * @returns {Promise<Setting>}
 */
const getSettingById = async (id) => {
  const setting = await Setting.findById(id);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Setting not found');
  }
  return setting;
};

/**
 * Update setting by ID
 * @param {ObjectId} settingId
 * @param {Object} updateBody
 * @returns {Promise<Setting>}
 */
const updateSettingById = async (settingId, updateBody) => {
  const setting = await getSettingById(settingId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Setting not found');
  }

  Object.assign(setting, updateBody);
  await setting.save();
  return setting;
};

/**
 * Delete setting by ID
 * @param {ObjectId} settingId
 * @returns {Promise<Setting>}
 */
const deleteSettingById = async (settingId) => {
  const setting = await getSettingById(settingId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Setting not found');
  }
  await setting.remove();
  return setting;
};

/**
 * Delete all settings for a node
 * @param {ObjectId} nodeId
 * @returns {Promise<void>}
 */
const deleteAllSettingsForNode = async (nodeId) => {
  await Setting.deleteMany({ nodeId });
};

/**
 * Assign data points and reports to a node setting
 * @param {ObjectId} settingId
 * @param {Object} assignData
 * @returns {Promise<Setting>}
 */
const assignDatapointsAndReports = async (settingId, assignData) => {
  const setting = await getSettingById(settingId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Setting not found');
  }

  const { datapoints = [], reports = [] } = assignData;

  setting.datapoints = datapoints;
  setting.reports = reports;
  await setting.save();

  return setting;
};

module.exports = {
  createSetting,
  querySettings,
  getSettingById,
  updateSettingById,
  deleteSettingById,
  deleteAllSettingsForNode,
  assignDatapointsAndReports,
};
