const Joi = require('joi');

const createStructure = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().allow('', null),
    parentId: Joi.string().allow(null),
    metadata: Joi.object().allow(null),
    isActive: Joi.boolean().default(true),
    position: Joi.number().integer().min(0),
    createdBy: Joi.string().required(), // will be overridden in controller
  }),
};

const updateStructure = {
  params: Joi.object().keys({
    structureId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      type: Joi.string(),
      description: Joi.string().allow('', null),
      parentId: Joi.string().allow(null),
      metadata: Joi.object().allow(null),
      isActive: Joi.boolean(),
      position: Joi.number().integer().min(0),
    })
    .min(1),
};

const getStructure = {
  params: Joi.object().keys({
    structureId: Joi.string().required(),
  }),
};

const deleteStructure = {
  params: Joi.object().keys({
    structureId: Joi.string().required(),
  }),
};

const listStructures = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    parentId: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const moveStructure = {
  params: Joi.object().keys({
    structureId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    newParentId: Joi.string().allow(null).required(),
    position: Joi.number().integer().min(0),
  }),
};

const getStructureTree = {
  query: Joi.object().keys({
    rootId: Joi.string(),
    depth: Joi.number().integer().min(1).max(10),
    includeInactive: Joi.boolean().default(false),
  }),
};

const duplicateStructure = {
  params: Joi.object().keys({
    structureId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    includeChildren: Joi.boolean().default(true),
  }),
};

module.exports = {
  createStructure,
  updateStructure,
  getStructure,
  deleteStructure,
  listStructures,
  moveStructure,
  getStructureTree,
  duplicateStructure,
};
