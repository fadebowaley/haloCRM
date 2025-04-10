const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new setting
const createSetting = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    node: Joi.string().custom(objectId).required(),
    datapoint: Joi.string().custom(objectId),
    report: Joi.string().custom(objectId),
    key: Joi.string().required().trim(),
    config: Joi.object().required(),
    description: Joi.string().trim(),
    isActive: Joi.boolean().default(true),
  }),
};

// Validation schema for querying all settings
const getSettings = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    node: Joi.string().custom(objectId),
    isActive: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a specific setting by ID
const getSetting = {
  params: Joi.object().keys({
    settingId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a setting
const updateSetting = {
  params: Joi.object().keys({
    settingId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      key: Joi.string().trim(),
      config: Joi.object(),
      description: Joi.string().trim(),
      isActive: Joi.boolean(),
    })
    .min(1), // At least one field must be provided for update
};

// Validation schema for deleting a specific setting by ID
const deleteSetting = {
  params: Joi.object().keys({
    settingId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting all settings for a specific node
const deleteAllSettingsForNode = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
  }),
};

// Validation schema for assigning datapoints and reports to a setting
const assignDatapointsAndReports = {
  body: Joi.object().keys({
    settingId: Joi.string().custom(objectId).required(),
    datapointIds: Joi.array().items(Joi.string().custom(objectId)),
    reportIds: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

module.exports = {
  createSetting,
  getSettings,
  getSetting,
  updateSetting,
  deleteSetting,
  deleteAllSettingsForNode,
  assignDatapointsAndReports,
};
