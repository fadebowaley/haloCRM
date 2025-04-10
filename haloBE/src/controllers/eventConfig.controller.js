const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventConfigService } = require('../services');

// Create a new event configuration
const createEventConfig = catchAsync(async (req, res) => {
  const eventConfig = await eventConfigService.createEventConfig(req.body);
  res.status(httpStatus.CREATED).send(eventConfig);
});

// Get event configuration by ID
const getEventConfigById = catchAsync(async (req, res) => {
  const eventConfig = await eventConfigService.getEventConfigById(req.params.eventConfigId);
  if (!eventConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'EventConfig not found');
  }
  res.send(eventConfig);
});

// Get configuration by event ID
const getConfigByEvent = catchAsync(async (req, res) => {
  const eventConfig = await eventConfigService.getConfigByEvent(req.params.eventId);
  if (!eventConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Configuration for this event not found');
  }
  res.send(eventConfig);
});

// Query event configurations with filters and pagination
const queryEventConfigs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'eventId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventConfigService.queryEventConfigs(filter, options);
  res.send(result);
});

// Update event configuration by ID
const updateEventConfigById = catchAsync(async (req, res) => {
  const updatedEventConfig = await eventConfigService.updateEventConfigById(req.params.eventConfigId, req.body);
  res.send(updatedEventConfig);
});

// Delete event configuration by ID
const deleteEventConfigById = catchAsync(async (req, res) => {
  await eventConfigService.deleteEventConfigById(req.params.eventConfigId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all event configurations
const deleteAllConfigs = catchAsync(async (req, res) => {
  const result = await eventConfigService.deleteAllConfigs();
  res.status(httpStatus.OK).json({
    message: result.message,
    deletedCount: result.deletedCount,
  });
});

module.exports = {
  createEventConfig,
  getEventConfigById,
  getConfigByEvent,
  queryEventConfigs,
  updateEventConfigById,
  deleteEventConfigById,
  deleteAllConfigs,
};
