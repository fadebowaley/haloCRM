const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { programService } = require('../services');

// Create a new program
const createProgram = catchAsync(async (req, res) => {
  const program = await programService.createProgram(req.body);
  res.status(httpStatus.CREATED).send(program);
});

// Bulk import programs
const bulkImportPrograms = catchAsync(async (req, res) => {
  const programs = await programService.bulkImportPrograms(req.body.programsArray);
  res.status(httpStatus.CREATED).json({
    message: `${programs.length} programs successfully created.`,
    data: programs,
  });
});

// Query programs with filters and pagination
const queryPrograms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await programService.queryPrograms(filter, options);
  res.send(result);
});

// Get a program by ID
const getProgram = catchAsync(async (req, res) => {
  const program = await programService.getProgramById(req.params.programId);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  res.send(program);
});

// Update a program by ID
const updateProgram = catchAsync(async (req, res) => {
  const updated = await programService.updateProgramById(req.params.programId, req.body);
  res.send(updated);
});

// Delete a program by ID
const deleteProgram = catchAsync(async (req, res) => {
  await programService.deleteProgramById(req.params.programId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all programs for a specific tenant or condition
const deleteAllPrograms = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const result = await programService.deleteAllPrograms(tenantId);
  res.status(httpStatus.OK).json({
    message: `All programs for tenant ${tenantId} deleted.`,
    deletedCount: result.deletedCount,
  });
});

// Assign a program to a node, user, or other entity
const assignToProgram = catchAsync(async (req, res) => {
  const updatedProgram = await programService.assignToProgram(req.params.programId, req.body);
  res.send(updatedProgram);
});

module.exports = {
  createProgram,
  bulkImportPrograms,
  queryPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
  deleteAllPrograms,
  assignToProgram,
};
