const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new report
const createReport = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    title: Joi.string().required().trim(),
    description: Joi.string().trim(),
    datapoints: Joi.array().items(Joi.custom(objectId)),
    collections: Joi.array().items(Joi.custom(objectId)),
    filters: Joi.object().default({}),
    output: Joi.any().default(null),
    generatedAt: Joi.date().allow(null).default(null),
    status: Joi.string().valid('draft', 'generated', 'archived').default('draft'),
  }),
};

// Validation schema for bulk importing reports
const bulkImportReports = {
  body: Joi.array().items(
    Joi.object().keys({
      tenantId: Joi.string().required().alphanum(),
      userId: Joi.string().required().alphanum(),
      title: Joi.string().required().trim(),
      description: Joi.string().trim(),
      datapoints: Joi.array().items(Joi.custom(objectId)),
      collections: Joi.array().items(Joi.custom(objectId)),
      filters: Joi.object().default({}),
      output: Joi.any().default(null),
      generatedAt: Joi.date().allow(null).default(null),
      status: Joi.string().valid('draft', 'generated', 'archived').default('draft'),
    })
  ),
};

// Validation schema for querying reports
const queryReports = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    userId: Joi.string().alphanum(),
    status: Joi.string().valid('draft', 'generated', 'archived'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for fetching a report by ID
const getReport = {
  params: Joi.object().keys({
    reportId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a report
const updateReport = {
  params: Joi.object().keys({
    reportId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      datapoints: Joi.array().items(Joi.custom(objectId)),
      collections: Joi.array().items(Joi.custom(objectId)),
      filters: Joi.object(),
      output: Joi.any(),
      generatedAt: Joi.date(),
      status: Joi.string().valid('draft', 'generated', 'archived'),
    })
    .min(1), // At least one field must be provided for update
};

// Validation schema for deleting a report
const deleteReport = {
  params: Joi.object().keys({
    reportId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting all reports
const deleteAllReports = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
  }),
};

module.exports = {
  createReport,
  bulkImportReports,
  queryReports,
  getReport,
  updateReport,
  deleteReport,
  deleteAllReports,
};
