const Joi = require('joi');

const createData = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    content: Joi.alternatives().try(Joi.string(), Joi.object(), Joi.array()).required(),
    metadata: Joi.object().allow(null),
    isPublic: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string()),
    createdBy: Joi.string().required(), // will be overridden in controller
  }),
};

const updateData = {
  params: Joi.object().keys({
    dataId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      type: Joi.string(),
      content: Joi.alternatives().try(Joi.string(), Joi.object(), Joi.array()),
      metadata: Joi.object().allow(null),
      isPublic: Joi.boolean(),
      tags: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const getData = {
  params: Joi.object().keys({
    dataId: Joi.string().required(),
  }),
};

const deleteData = {
  params: Joi.object().keys({
    dataId: Joi.string().required(),
  }),
};

const listData = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    isPublic: Joi.boolean(),
    tags: Joi.string(), // Comma-separated tags
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const importData = {
  body: Joi.object().keys({
    format: Joi.string().valid('json', 'csv', 'xml').required(),
    data: Joi.string().required(),
    options: Joi.object().allow(null),
  }),
};

const exportData = {
  query: Joi.object().keys({
    format: Joi.string().valid('json', 'csv', 'xml').required(),
    ids: Joi.string(), // Comma-separated IDs
    filter: Joi.string(), // JSON string of filter criteria
  }),
};

module.exports = {
  createData,
  updateData,
  getData,
  deleteData,
  listData,
  importData,
  exportData,
};
