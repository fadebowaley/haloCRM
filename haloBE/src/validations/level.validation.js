const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new level
const createLevel = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    name: Joi.string().required().trim(),
    description: Joi.string().max(255).default(''),
    rank: Joi.number().required().min(1),
    isSpecial: Joi.boolean().default(false),
  }),
};

// Validation schema for querying levels
const queryLevels = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a level by ID
const getLevelById = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting a level by name
const getLevelByName = {
  query: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
};

// Validation schema for updating a level by ID
const updateLevelById = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      description: Joi.string().max(255),
      rank: Joi.number().min(1),
      isSpecial: Joi.boolean(),
    })
    .min(1),
};

// Validation schema for deleting a level by ID
const deleteLevelById = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for fetching levels by hierarchy
const getLevelsByHierarchy = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
  }),
};

// Validation schema for getting the parent level
const getParentLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for getting the child levels
const getChildLevels = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for moving a level to a parent level
const moveLevelToParent = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    parentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for activating a level
const activateLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deactivating a level
const deactivateLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createLevel,
  queryLevels,
  getLevelById,
  getLevelByName,
  updateLevelById,
  deleteLevelById,
  getLevelsByHierarchy,
  getParentLevel,
  getChildLevels,
  moveLevelToParent,
  activateLevel,
  deactivateLevel,
};
