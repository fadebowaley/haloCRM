const httpStatus = require('http-status');
const { Report } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a report
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (reportBody) => {
  return Report.create(reportBody);
};

/**
 * Bulk create reports
 * @param {Array} reportArray
 * @returns {Promise<Array<Report>>}
 */
const bulkImportReports = async (reportArray) => {
  return Report.insertMany(reportArray);
};

/**
 * Query for reports
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryReports = async (filter, options) => {
  const reports = await Report.paginate(filter, options);
  return reports;
};

/**
 * Get report by ID
 * @param {ObjectId} id
 * @returns {Promise<Report>}
 */
const getReportById = async (id) => {
  return Report.findById(id);
};

/**
 * Update report by ID
 * @param {ObjectId} reportId
 * @param {Object} updateBody
 * @returns {Promise<Report>}
 */
const updateReportById = async (reportId, updateBody) => {
  const report = await getReportById(reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  Object.assign(report, updateBody);
  await report.save();
  return report;
};

/**
 * Delete report by ID
 * @param {ObjectId} reportId
 * @returns {Promise<Report>}
 */
const deleteReportById = async (reportId) => {
  const report = await getReportById(reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  await report.remove();
  return report;
};

/**
 * Delete all reports (use with caution)
 * @returns {Promise<{ deletedCount: number }>}
 */
const deleteAllReports = async () => {
  return Report.deleteMany({});
};

module.exports = {
  createReport,
  bulkImportReports,
  queryReports,
  getReportById,
  updateReportById,
  deleteReportById,
  deleteAllReports,
};
