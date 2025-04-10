
const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Define the allowed actions
const ACTIONS = ['view', 'create', 'update', 'delete', 'manage', 'assign', 'approve', 'export'];

// Validation for creating a single permission
const createPermission = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    method: Joi.string().required(),
    resource: Joi.string().required(),
    description: Joi.string().required(),
    path: Joi.string().required(),
    action: Joi.string()
      .valid(...ACTIONS)
      .required(), // Use the ACTIONS array here
  }),
};

// Validation for querying multiple permissions
const queryPermissions = {
  query: Joi.object().keys({
    name: Joi.string(),
    resource: Joi.string(),
    action: Joi.string().valid(...ACTIONS), // Use the ACTIONS array here
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1),
    page: Joi.number().integer().min(1),
  }),
};

// Validation for getting a specific permission by name
const getPermission = {
  params: Joi.object().keys({
    permissionName: Joi.string().required(),
  }),
};

// Validation for updating a permission by name
const updatePermission = {
  params: Joi.object().keys({
    permissionName: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      resource: Joi.string(),
      action: Joi.string().valid(...ACTIONS), // Use the ACTIONS array here
    })
    .min(1),
};

// Validation for deleting a permission by name
const deletePermission = {
  params: Joi.object().keys({
    permissionName: Joi.string().required(),
  }),
};

// Validation for bulk creation of permissions
const bulkCreatePermissions = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        resource: Joi.string().required(),
        action: Joi.string()
          .valid(...ACTIONS)
          .required(), // Use the ACTIONS array here
      })
    )
    .min(1),
};

module.exports = {
  createPermission,
  queryPermissions,
  getPermission,
  updatePermission,
  deletePermission,
  bulkCreatePermissions,
};
