const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCollection = {
  body: Joi.object().keys({
    tenantId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    amount: Joi.number().required(),
    assignedParameters: Joi.array().items(
      Joi.object({
        parameter: Joi.string().custom(objectId),
        computedValue: Joi.number(),
      })
    ),
    finalValue: Joi.number(),
    isCompulsory: Joi.boolean().required(),
  }),
};

const queryCollections = {
  query: Joi.object().keys({
    tenantId: Joi.string(),
    name: Joi.string(),
    amount: Joi.number(),
    isCompulsory: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCollectionById = {
  params: Joi.object().keys({
    collectionId: Joi.string().custom(objectId).required(),
  }),
};

const updateCollectionById = {
  params: Joi.object().keys({
    collectionId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      amount: Joi.number(),
      assignedParameters: Joi.array().items(
        Joi.object({
          parameter: Joi.string().custom(objectId),
          computedValue: Joi.number(),
        })
      ),
      finalValue: Joi.number(),
      isCompulsory: Joi.boolean(),
    })
    .min(1),
};

const deleteCollectionById = {
  params: Joi.object().keys({
    collectionId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createCollection,
  queryCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
};
