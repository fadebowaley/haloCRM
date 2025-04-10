const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCapture = {
  body: Joi.object().keys({
    tenantId: Joi.string().required(),
    userId: Joi.string().required(),
    datapoint: Joi.string().custom(objectId).required(),
    datapointConfig: Joi.string().custom(objectId),
    node: Joi.string().custom(objectId),
    data: Joi.object().required(),
    capturedAt: Joi.date().default(Date.now),
    source: Joi.string().valid('web', 'mobile', 'api', 'sync').default('web'),
    status: Joi.string().valid('active', 'archived', 'pending').default('active'),
  }),
};

const bulkInsertCaptures = {
  body: Joi.array().items(
    Joi.object().keys({
      tenantId: Joi.string().required(),
      userId: Joi.string().required(),
      datapoint: Joi.string().custom(objectId).required(),
      datapointConfig: Joi.string().custom(objectId),
      node: Joi.string().custom(objectId),
      data: Joi.object().required(),
      capturedAt: Joi.date().default(Date.now),
      source: Joi.string().valid('web', 'mobile', 'api', 'sync').default('web'),
      status: Joi.string().valid('active', 'archived', 'pending').default('active'),
    })
  ),
};

const queryCaptures = {
  query: Joi.object().keys({
    tenantId: Joi.string(),
    userId: Joi.string(),
    datapoint: Joi.string().custom(objectId),
    status: Joi.string().valid('active', 'archived', 'pending'),
    capturedAt: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCaptureById = {
  params: Joi.object().keys({
    captureId: Joi.string().custom(objectId).required(),
  }),
};

const getCapturesByDatapoint = {
  params: Joi.object().keys({
    datapointId: Joi.string().custom(objectId).required(),
  }),
};

const updateCaptureById = {
  params: Joi.object().keys({
    captureId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      tenantId: Joi.string(),
      userId: Joi.string(),
      datapoint: Joi.string().custom(objectId),
      datapointConfig: Joi.string().custom(objectId),
      node: Joi.string().custom(objectId),
      data: Joi.object(),
      capturedAt: Joi.date(),
      source: Joi.string().valid('web', 'mobile', 'api', 'sync'),
      status: Joi.string().valid('active', 'archived', 'pending'),
    })
    .min(1),
};

const deleteCaptureById = {
  params: Joi.object().keys({
    captureId: Joi.string().custom(objectId).required(),
  }),
};

const deleteAllCapturesByTenant = {
  params: Joi.object().keys({
    tenantId: Joi.string().custom(objectId).required(),
  }),
};

const exportCapturesByDatapoint = {
  params: Joi.object().keys({
    datapointId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createCapture,
  bulkInsertCaptures,
  queryCaptures,
  getCaptureById,
  getCapturesByDatapoint,
  updateCaptureById,
  deleteCaptureById,
  deleteAllCapturesByTenant,
  exportCapturesByDatapoint,
};
