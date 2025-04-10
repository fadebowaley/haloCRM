const httpStatus = require('http-status');
const { EventConfig } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new event configuration
 * @param {Object} configBody
 * @returns {Promise<EventConfig>}
 */
const createEventConfig = async (configBody) => {
  return EventConfig.create(configBody);
};

/**
 * Get event config by ID
 * @param {ObjectId} configId
 * @returns {Promise<EventConfig>}
 */
const getEventConfigById = async (configId) => {
  return EventConfig.findById(configId);
};

/**
 * Get config by associated event ID
 * @param {ObjectId} eventId
 * @returns {Promise<EventConfig>}
 */
const getConfigByEvent = async (eventId) => {
  return EventConfig.findOne({ event: eventId });
};

/**
 * Query for event configurations
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryEventConfigs = async (filter, options) => {
  return EventConfig.paginate(filter, options);
};

/**
 * Update event config by ID
 * @param {ObjectId} configId
 * @param {Object} updateBody
 * @returns {Promise<EventConfig>}
 */
const updateEventConfigById = async (configId, updateBody) => {
  const config = await getEventConfigById(configId);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event configuration not found');
  }
  Object.assign(config, updateBody);
  await config.save();
  return config;
};

/**
 * Delete event config by ID
 * @param {ObjectId} configId
 * @returns {Promise<EventConfig>}
 */
const deleteEventConfigById = async (configId) => {
  const config = await getEventConfigById(configId);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event configuration not found');
  }
  await config.remove();
  return config;
};

/**
 * Delete all configurations
 * @returns {Promise<{ deletedCount: number }>}
 */
const deleteAllConfigs = async () => {
  return EventConfig.deleteMany({});
};

module.exports = {
  createEventConfig,
  getEventConfigById,
  getConfigByEvent,
  queryEventConfigs,
  updateEventConfigById,
  deleteEventConfigById,
  deleteAllConfigs,
};
