const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAdmin = {
  body: Joi.object().keys({
    tenantId: Joi.string().required(),
    userId: Joi.string().required(),
    role: Joi.string().valid('SuperAdmin', 'TenantAdmin', 'OperationalAdmin').default('TenantAdmin'),
    permissions: Joi.array().items(Joi.string()).default([]),
    assignedModules: Joi.array().items(Joi.string()).default([]),
    isActive: Joi.boolean().default(true),
    note: Joi.string().default(''),
  }),
};

const assignRole = {
  params: Joi.object().keys({
    adminId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    role: Joi.string().valid('SuperAdmin', 'TenantAdmin', 'OperationalAdmin').required(),
  }),
};

const queryAdmins = {
  query: Joi.object().keys({
    tenantId: Joi.string(),
    role: Joi.string().valid('SuperAdmin', 'TenantAdmin', 'OperationalAdmin'),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAdminById = {
  params: Joi.object().keys({
    adminId: Joi.string().custom(objectId).required(),
  }),
};

const getAdminsByTenant = {
  params: Joi.object().keys({
    tenantId: Joi.string().custom(objectId).required(),
  }),
};

const updateAdmin = {
  params: Joi.object().keys({
    adminId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      role: Joi.string().valid('SuperAdmin', 'TenantAdmin', 'OperationalAdmin'),
      permissions: Joi.array().items(Joi.string()),
      assignedModules: Joi.array().items(Joi.string()),
      isActive: Joi.boolean(),
      note: Joi.string(),
    })
    .min(1),
};

const deleteAdmin = {
  params: Joi.object().keys({
    adminId: Joi.string().custom(objectId).required(),
  }),
};

const deleteAdminsByTenant = {
  params: Joi.object().keys({
    tenantId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createAdmin,
  assignRole,
  queryAdmins,
  getAdminById,
  getAdminsByTenant,
  updateAdmin,
  deleteAdmin,
  deleteAdminsByTenant,
};
