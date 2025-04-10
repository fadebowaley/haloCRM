const httpStatus = require('http-status');
const { Capture } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a single capture entry
 * @param {Object} captureBody
 * @returns {Promise<Capture>}
 */
const createCapture = async (captureBody) => {
  return Capture.create(captureBody);
};

/**
 * Bulk insert of captured data
 * @param {Array} captureArray
 * @returns {Promise<Array<Capture>>}
 */
const bulkInsertCaptures = async (captureArray) => {
  return Capture.insertMany(captureArray);
};

/**
 * Get capture by ID
 * @param {ObjectId} id
 * @returns {Promise<Capture>}
 */
const getCaptureById = async (id) => {
  return Capture.findById(id);
};

/**
 * Query captures with filter and options
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryCaptures = async (filter, options) => {
  return Capture.paginate(filter, options);
};

/**
 * Query all data for a datapoint
 * @param {ObjectId} datapointId
 * @returns {Promise<Array<Capture>>}
 */
const getCapturesByDatapoint = async (datapointId) => {
  return Capture.find({ datapointId });
};

/**
 * Update capture by ID
 * @param {ObjectId} captureId
 * @param {Object} updateBody
 * @returns {Promise<Capture>}
 */
const updateCaptureById = async (captureId, updateBody) => {
  const capture = await getCaptureById(captureId);
  if (!capture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Capture not found');
  }
  Object.assign(capture, updateBody);
  await capture.save();
  return capture;
};

/**
 * Delete capture by ID
 * @param {ObjectId} captureId
 * @returns {Promise<Capture>}
 */
const deleteCaptureById = async (captureId) => {
  const capture = await getCaptureById(captureId);
  if (!capture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Capture not found');
  }
  await capture.remove();
  return capture;
};

/**
 * Delete all captures by tenantId
 * @param {ObjectId} tenantId
 * @returns {Promise<{ deletedCount: number }>}
 */
const deleteAllCapturesByTenant = async (tenantId) => {
  return Capture.deleteMany({ tenantId });
};

/**
 * Export captures for a datapoint
 * @param {ObjectId} datapointId
 * @returns {Promise<Array<Object>>}
 */
const exportCapturesByDatapoint = async (datapointId) => {
  const captures = await getCapturesByDatapoint(datapointId);
  return captures.map((capture) => ({
    data: capture.data,
    capturedAt: capture.createdAt,
    capturedBy: capture.userId,
  }));
};

module.exports = {
  createCapture,
  bulkInsertCaptures,
  getCaptureById,
  queryCaptures,
  getCapturesByDatapoint,
  updateCaptureById,
  deleteCaptureById,
  deleteAllCapturesByTenant,
  exportCapturesByDatapoint,
};
