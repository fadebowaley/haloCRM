const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new event
const createEvent = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    title: Joi.string().required().trim(),
    description: Joi.string().trim().max(200),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    status: Joi.string().valid('pending', 'completed', 'cancelled').default('pending'),
    program: Joi.string().custom(objectId),
    collections: Joi.array().items(Joi.string().custom(objectId)),
    datapoints: Joi.array().items(Joi.string().custom(objectId)),
    reminders: Joi.array().items(Joi.string().valid('1 hour before', '1 day before')),
    notifyBySMS: Joi.boolean().default(false),
    notifyByEmail: Joi.boolean().default(false),
  }),
};

// Validation schema for querying events
const queryEvents = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    status: Joi.string().valid('pending', 'completed', 'cancelled'),
    program: Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting event by ID
const getEventById = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating event by ID
const updateEventById = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().trim().max(200),
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().valid('pending', 'completed', 'cancelled'),
      program: Joi.string().custom(objectId),
      collections: Joi.array().items(Joi.string().custom(objectId)),
      datapoints: Joi.array().items(Joi.string().custom(objectId)),
      reminders: Joi.array().items(Joi.string().valid('1 hour before', '1 day before')),
      notifyBySMS: Joi.boolean(),
      notifyByEmail: Joi.boolean(),
    })
    .min(1),
};

// Validation schema for deleting event by ID
const deleteEventById = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting all events for a tenant
const deleteAllEvents = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
  }),
};

// Validation schema for getting events by program
const getEventsByProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting events by a date range
const getEventsByDateRange = {
  query: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
};

// Validation schema for bulk importing events
const bulkImportEvents = {
  body: Joi.object().keys({
    events: Joi.array().items(
      Joi.object().keys({
        tenantId: Joi.string().required().alphanum(),
        userId: Joi.string().required().alphanum(),
        title: Joi.string().required().trim(),
        description: Joi.string().trim().max(200),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        status: Joi.string().valid('pending', 'completed', 'cancelled').default('pending'),
        program: Joi.string().custom(objectId),
        collections: Joi.array().items(Joi.string().custom(objectId)),
        datapoints: Joi.array().items(Joi.string().custom(objectId)),
        reminders: Joi.array().items(Joi.string().valid('1 hour before', '1 day before')),
        notifyBySMS: Joi.boolean().default(false),
        notifyByEmail: Joi.boolean().default(false),
      })
    ),
  }),
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  deleteAllEvents,
  getEventsByProgram,
  getEventsByDateRange,
  bulkImportEvents,
};
