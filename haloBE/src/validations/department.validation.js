const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new department
const createDepartment = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    node: Joi.string().custom(objectId).required(),
    departmentId: Joi.string().required().alphanum(),
    name: Joi.string().required().trim(),
    description: Joi.string().trim().max(200),
    status: Joi.string().valid('active', 'inactive', 'archived').default('active'),
  }),
};

// Validation schema for getting department by ID
const getDepartmentById = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating department by ID
const updateDepartmentById = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      departmentId: Joi.string().alphanum(),
      name: Joi.string().trim(),
      description: Joi.string().trim().max(200),
      status: Joi.string().valid('active', 'inactive', 'archived'),
    })
    .min(1),
};

// Validation schema for deleting department by ID
const deleteDepartmentById = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for querying departments
const queryDepartments = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    status: Joi.string().valid('active', 'inactive', 'archived'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for importing departments
const importDepartments = {
  body: Joi.array().items(
    Joi.object().keys({
      tenantId: Joi.string().required().alphanum(),
      userId: Joi.string().required().alphanum(),
      node: Joi.string().custom(objectId).required(),
      departmentId: Joi.string().required().alphanum(),
      name: Joi.string().required().trim(),
      description: Joi.string().trim().max(200),
      status: Joi.string().valid('active', 'inactive', 'archived').default('active'),
    })
  ),
};

// Validation schema for exporting departments
const exportDepartments = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    status: Joi.string().valid('active', 'inactive', 'archived'),
    format: Joi.string().valid('csv', 'excel').default('csv'),
  }),
};

module.exports = {
  createDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
  queryDepartments,
  importDepartments,
  exportDepartments,
};
