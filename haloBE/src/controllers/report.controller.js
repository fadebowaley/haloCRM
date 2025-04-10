const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

// Create a new report
const createReport = catchAsync(async (req, res) => {
  const report = await reportService.createReport(req.body);
  res.status(httpStatus.CREATED).send(report);
});

// Bulk import reports
const bulkImportReports = catchAsync(async (req, res) => {
  const reports = await reportService.bulkImportReports(req.body.reportsArray);
  res.status(httpStatus.CREATED).json({
    message: `${reports.length} reports successfully created.`,
    data: reports,
  });
});

// Query reports with filters and pagination
const queryReports = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reportService.queryReports(filter, options);
  res.send(result);
});

// Get a report by ID
const getReport = catchAsync(async (req, res) => {
  const report = await reportService.getReportById(req.params.reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  res.send(report);
});

// Update a report by ID
const updateReport = catchAsync(async (req, res) => {
  const updated = await reportService.updateReportById(req.params.reportId, req.body);
  res.send(updated);
});

// Delete a report by ID
const deleteReport = catchAsync(async (req, res) => {
  await reportService.deleteReportById(req.params.reportId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all reports for a specific tenant or condition
const deleteAllReports = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const result = await reportService.deleteAllReports(tenantId);
  res.status(httpStatus.OK).json({
    message: `All reports for tenant ${tenantId} deleted.`,
    deletedCount: result.deletedCount,
  });
});

module.exports = {
  createReport,
  bulkImportReports,
  queryReports,
  getReport,
  updateReport,
  deleteReport,
  deleteAllReports,
};
