const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { captureService } = require('../services');

// Create a new capture
const createCapture = catchAsync(async (req, res) => {
  const capture = await captureService.createCapture(req.body);
  res.status(httpStatus.CREATED).send(capture);
});

// Bulk insert captures
const bulkInsertCaptures = catchAsync(async (req, res) => {
  const captures = await captureService.bulkInsertCaptures(req.body.capturesArray);
  res.status(httpStatus.CREATED).json({
    message: `${captures.length} captures successfully inserted.`,
    data: captures,
  });
});

// Get a capture by ID
const getCaptureById = catchAsync(async (req, res) => {
  const capture = await captureService.getCaptureById(req.params.captureId);
  if (!capture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Capture not found');
  }
  res.send(capture);
});

// Query captures
const queryCaptures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['datapointId', 'createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await captureService.queryCaptures(filter, options);
  res.send(result);
});

// Get captures by datapoint
const getCapturesByDatapoint = catchAsync(async (req, res) => {
  const captures = await captureService.getCapturesByDatapoint(req.params.datapointId);
  res.send(captures);
});

// Update a capture by ID
const updateCaptureById = catchAsync(async (req, res) => {
  const updated = await captureService.updateCaptureById(req.params.captureId, req.body);
  res.send(updated);
});

// Delete a capture by ID
const deleteCaptureById = catchAsync(async (req, res) => {
  await captureService.deleteCaptureById(req.params.captureId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all captures for a tenant
const deleteAllCapturesByTenant = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const result = await captureService.deleteAllCapturesByTenant(tenantId);
  res.status(httpStatus.OK).json({
    message: result.message,
    deletedCount: result.deletedCount,
  });
});

// Export captures by datapoint
const exportCapturesByDatapoint = catchAsync(async (req, res) => {
  const exportData = await captureService.exportCapturesByDatapoint(req.params.datapointId);
  res.send(exportData);
});

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
