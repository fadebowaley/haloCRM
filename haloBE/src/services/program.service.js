const httpStatus = require('http-status');
const { Program } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a program
 * @param {Object} programBody
 * @returns {Promise<Program>}
 */
const createProgram = async (programBody) => {
  return Program.create(programBody);
};

/**
 * Bulk import programs
 * @param {Array} programArray
 * @returns {Promise<Array<Program>>}
 */
const bulkImportPrograms = async (programArray) => {
  return Program.insertMany(programArray);
};

/**
 * Query for programs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Pagination options
 * @returns {Promise<QueryResult>}
 */
const queryPrograms = async (filter, options) => {
  const programs = await Program.paginate(filter, options);
  return programs;
};

/**
 * Get program by ID
 * @param {ObjectId} id
 * @returns {Promise<Program>}
 */
const getProgramById = async (id) => {
  return Program.findById(id);
};

/**
 * Update program by ID
 * @param {ObjectId} programId
 * @param {Object} updateBody
 * @returns {Promise<Program>}
 */
const updateProgramById = async (programId, updateBody) => {
  const program = await getProgramById(programId);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  Object.assign(program, updateBody);
  await program.save();
  return program;
};

/**
 * Delete program by ID
 * @param {ObjectId} programId
 * @returns {Promise<Program>}
 */
const deleteProgramById = async (programId) => {
  const program = await getProgramById(programId);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  await program.remove();
  return program;
};

/**
 * Delete all programs
 * @returns {Promise<{ deletedCount: number }>}
 */
const deleteAllPrograms = async () => {
  return Program.deleteMany({});
};

/**
 * Assign data points or events to a program
 * @param {ObjectId} programId
 * @param {Object} payload
 * @returns {Promise<Program>}
 */
const assignToProgram = async (programId, payload) => {
  const program = await getProgramById(programId);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  program.events = [...new Set([...program.events, ...(payload.events || [])])];
  program.dataPoints = [...new Set([...program.dataPoints, ...(payload.dataPoints || [])])];
  await program.save();
  return program;
};

module.exports = {
  createProgram,
  bulkImportPrograms,
  queryPrograms,
  getProgramById,
  updateProgramById,
  deleteProgramById,
  deleteAllPrograms,
  assignToProgram,
};
