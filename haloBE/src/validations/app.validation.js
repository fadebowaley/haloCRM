const Joi = require('joi');
const { objectId } = require('./custom.validation');

const allowedApps = [
  'HaloAi',
  'HaloCalendar',
  'HaloGoogleSheet',
  'HaloAdvisor',
  'HaloGrowth',
  'HaloCompliance',
  'HaloInsight',
  'HaloProperties',
];

const createApp = {
  body: Joi.object().keys({
    tenantId: Joi.string().required(),
    userId: Joi.string().required(),
    appName: Joi.string()
      .valid(...allowedApps)
      .required(),
    isActive: Joi.boolean().default(true),
    icon: Joi.string().uri().optional(),
    config: Joi.object().optional(),
  }),
};

const bulkCreateApps = {
  body: Joi.array().items(
    Joi.object().keys({
      tenantId: Joi.string().required(),
      userId: Joi.string().required(),
      appName: Joi.string()
        .valid(...allowedApps)
        .required(),
      isActive: Joi.boolean().default(true),
      icon: Joi.string().uri().optional(),
      config: Joi.object().optional(),
    })
  ),
};

const queryApps = {
  query: Joi.object().keys({
    tenantId: Joi.string(),
    userId: Joi.string(),
    appName: Joi.string().valid(...allowedApps),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAppById = {
  params: Joi.object().keys({
    appId: Joi.string().custom(objectId).required(),
  }),
};

const assignApp = {
  params: Joi.object().keys({
    appId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    userId: Joi.string().required(),
    tenantId: Joi.string().required(),
  }),
};

const getAppsForTenantOrUser = {
  params: Joi.object().keys({
    tenantId: Joi.string().custom(objectId).required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

const toggleAppStatus = {
  params: Joi.object().keys({
    appId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    isActive: Joi.boolean().required(),
  }),
};

const updateApp = {
  params: Joi.object().keys({
    appId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      appName: Joi.string().valid(...allowedApps),
      isActive: Joi.boolean(),
      icon: Joi.string().uri(),
      config: Joi.object(),
    })
    .min(1),
};

const deleteApp = {
  params: Joi.object().keys({
    appId: Joi.string().custom(objectId).required(),
  }),
};

const deleteAppsByTenant = {
  params: Joi.object().keys({
    tenantId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createApp,
  bulkCreateApps,
  queryApps,
  getAppById,
  assignApp,
  getAppsForTenantOrUser,
  toggleAppStatus,
  updateApp,
  deleteApp,
  deleteAppsByTenant,
};
