const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new event config
const createEventConfig = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    event: Joi.string().custom(objectId).required(),
    notificationConfig: Joi.object().keys({
      sms: Joi.object().keys({
        enabled: Joi.boolean().default(false),
        timeBefore: Joi.number().min(1),
      }),
      email: Joi.object().keys({
        enabled: Joi.boolean().default(false),
        timeBefore: Joi.number().min(1),
      }),
    }),
    recurrenceOverride: Joi.object().keys({
      frequency: Joi.string().valid('none', 'daily', 'weekly', 'monthly', 'yearly').default('none'),
      interval: Joi.number().min(1).default(1),
      endAfterOccurrences: Joi.number().min(1),
    }),
    autoComplete: Joi.object().keys({
      enabled: Joi.boolean().default(false),
      afterMinutes: Joi.number().min(1),
    }),
    linkedActions: Joi.array().items(Joi.string()),
  }),
};

// Validation schema for querying event configs
const queryEventConfigs = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting event config by ID
const getEventConfigById = {
  params: Joi.object().keys({
    eventConfigId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting event config by event ID
const getConfigByEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating event config by ID
const updateEventConfigById = {
  params: Joi.object().keys({
    eventConfigId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      notificationConfig: Joi.object().keys({
        sms: Joi.object().keys({
          enabled: Joi.boolean(),
          timeBefore: Joi.number().min(1),
        }),
        email: Joi.object().keys({
          enabled: Joi.boolean(),
          timeBefore: Joi.number().min(1),
        }),
      }),
      recurrenceOverride: Joi.object().keys({
        frequency: Joi.string().valid('none', 'daily', 'weekly', 'monthly', 'yearly'),
        interval: Joi.number().min(1),
        endAfterOccurrences: Joi.number().min(1),
      }),
      autoComplete: Joi.object().keys({
        enabled: Joi.boolean(),
        afterMinutes: Joi.number().min(1),
      }),
      linkedActions: Joi.array().items(Joi.string()),
    })
    .min(1),
};

// Validation schema for deleting event config by ID
const deleteEventConfigById = {
  params: Joi.object().keys({
    eventConfigId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting all event configs
const deleteAllConfigs = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
  }),
};

module.exports = {
  createEventConfig,
  queryEventConfigs,
  getEventConfigById,
  getConfigByEvent,
  updateEventConfigById,
  deleteEventConfigById,
  deleteAllConfigs,
};
