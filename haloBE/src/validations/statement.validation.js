const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new statement
const createStatement = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    node: Joi.string().custom(objectId).required(),
    collectionRef: Joi.string().custom(objectId).required(),
    amount: Joi.number().required().min(0),
    description: Joi.string().trim(),
    type: Joi.string().valid('credit', 'debit').required(),
    balanceAfter: Joi.number().required(),
    reference: Joi.string().required().trim(),
    status: Joi.string().valid('pending', 'confirmed', 'failed').default('pending'),
    metadata: Joi.object().default({}),
  }),
};

// Validation schema for querying all statements
const getStatements = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    node: Joi.string().custom(objectId),
    collectionRef: Joi.string().custom(objectId),
    status: Joi.string().valid('pending', 'confirmed', 'failed'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a specific statement by ID
const getStatement = {
  params: Joi.object().keys({
    statementId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a statement
const updateStatement = {
  params: Joi.object().keys({
    statementId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number().min(0),
      description: Joi.string().trim(),
      type: Joi.string().valid('credit', 'debit'),
      balanceAfter: Joi.number(),
      status: Joi.string().valid('pending', 'confirmed', 'failed'),
      metadata: Joi.object(),
    })
    .min(1), // At least one field must be provided for update
};

// Validation schema for deleting a statement by ID
const deleteStatement = {
  params: Joi.object().keys({
    statementId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for fetching total payments for a specific node
const getTotalPaymentsForNode = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum().required(),
  }),
};

// Validation schema for fetching total payments for a specific collection
const getTotalPaymentsForCollection = {
  params: Joi.object().keys({
    collectionId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum().required(),
  }),
};

module.exports = {
  createStatement,
  getStatements,
  getStatement,
  updateStatement,
  deleteStatement,
  getTotalPaymentsForNode,
  getTotalPaymentsForCollection,
};
