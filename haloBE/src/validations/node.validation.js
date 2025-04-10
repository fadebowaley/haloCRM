const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new node
const createNode = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    level: Joi.string().custom(objectId).required(),
    parent: Joi.string().custom(objectId),
    isMain: Joi.boolean().default(true),
    isOwner: Joi.boolean().default(false),
    name: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    state: Joi.string().required().trim(),
    country: Joi.string().required().trim(),
    postalCode: Joi.string(),
    dateOfEstablishment: Joi.date(),
    users: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

// Validation schema for querying nodes
const queryNodes = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a node by ID
const getNodeById = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a node by ID
const updateNodeById = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      level: Joi.string().custom(objectId),
      parent: Joi.string().custom(objectId),
      isMain: Joi.boolean(),
      isOwner: Joi.boolean(),
      name: Joi.string().trim(),
      address: Joi.string().trim(),
      city: Joi.string().trim(),
      state: Joi.string().trim(),
      country: Joi.string().trim(),
      postalCode: Joi.string(),
      dateOfEstablishment: Joi.date(),
      users: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

// Validation schema for deleting a node by ID
const deleteNodeById = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting nodes by type (e.g., main, owner)
const getNodesByType = {
  query: Joi.object().keys({
    type: Joi.string().valid('main', 'owner').required(),
  }),
};

// Validation schema for fetching the parent node
const getParentNode = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for fetching the child nodes
const getChildNodes = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for moving a node to a parent node
const moveNodeToParent = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    parentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting the node path (parent hierarchy)
const getNodePath = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for activating a node
const activateNode = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deactivating a node
const deactivateNode = {
  params: Joi.object().keys({
    nodeId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createNode,
  queryNodes,
  getNodeById,
  updateNodeById,
  deleteNodeById,
  getNodesByType,
  getParentNode,
  getChildNodes,
  moveNodeToParent,
  getNodePath,
  activateNode,
  deactivateNode,
};
