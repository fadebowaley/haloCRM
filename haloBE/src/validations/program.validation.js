const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new program
const createProgram = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    title: Joi.string().required().trim(),
    description: Joi.string().trim(),
    frequency: Joi.string().valid('daily', 'weekly', 'monthly', 'custom').required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    daysOfWeek: Joi.array().items(
      Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    ),
    collections: Joi.array().items(Joi.custom(objectId)),
    datapoints: Joi.array().items(Joi.custom(objectId)),
    events: Joi.array().items(Joi.custom(objectId)),
    isActive: Joi.boolean().default(true),
  }),
};

// Validation schema for bulk importing programs
const bulkImportPrograms = {
  body: Joi.array().items(
    Joi.object().keys({
      tenantId: Joi.string().required().alphanum(),
      userId: Joi.string().required().alphanum(),
      title: Joi.string().required().trim(),
      description: Joi.string().trim(),
      frequency: Joi.string().valid('daily', 'weekly', 'monthly', 'custom').required(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
      daysOfWeek: Joi.array().items(
        Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      ),
      collections: Joi.array().items(Joi.custom(objectId)),
      datapoints: Joi.array().items(Joi.custom(objectId)),
      events: Joi.array().items(Joi.custom(objectId)),
      isActive: Joi.boolean().default(true),
    })
  ),
};

// Validation schema for querying programs
const queryPrograms = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    userId: Joi.string().alphanum(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for fetching a program by ID
const getProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a program
const updateProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      frequency: Joi.string().valid('daily', 'weekly', 'monthly', 'custom'),
      startDate: Joi.date(),
      endDate: Joi.date(),
      daysOfWeek: Joi.array().items(
        Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      ),
      collections: Joi.array().items(Joi.custom(objectId)),
      datapoints: Joi.array().items(Joi.custom(objectId)),
      events: Joi.array().items(Joi.custom(objectId)),
      isActive: Joi.boolean(),
    })
    .min(1), // At least one field must be provided for update
};

// Validation schema for deleting a program
const deleteProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting all programs
const deleteAllPrograms = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
  }),
};

// Validation schema for assigning a user to a program
const assignToProgram = {
  params: Joi.object().keys({
    programId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProgram,
  bulkImportPrograms,
  queryPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
  deleteAllPrograms,
  assignToProgram,
};
