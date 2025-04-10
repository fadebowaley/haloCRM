const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { statementService } = require('../services');

// Create a single statement
const createStatement = catchAsync(async (req, res) => {
  const statement = await statementService.createStatement(req.body);
  res.status(httpStatus.CREATED).send(statement);
});

// Bulk import statements
const bulkImportStatements = catchAsync(async (req, res) => {
  const statements = await statementService.bulkImportStatements(req.body.statementsArray);
  res.status(httpStatus.CREATED).json({
    message: `${statements.length} statements successfully imported.`,
    data: statements,
  });
});

// Get a list of statements
const getStatements = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'nodeId', 'collectionId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await statementService.queryStatements(filter, options);
  res.send(result);
});

// Get a single statement by ID
const getStatement = catchAsync(async (req, res) => {
  const statement = await statementService.getStatementById(req.params.statementId);
  if (!statement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statement not found');
  }
  res.send(statement);
});

// Update a statement
const updateStatement = catchAsync(async (req, res) => {
  const updated = await statementService.updateStatementById(req.params.statementId, req.body);
  res.send(updated);
});

// Delete a statement
const deleteStatement = catchAsync(async (req, res) => {
  await statementService.deleteStatementById(req.params.statementId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Get total payments for a specific node
const getTotalPaymentsForNode = catchAsync(async (req, res) => {
  const total = await statementService.getTotalPaymentsForNode(req.params.nodeId);
  res.send({ total });
});

// Get total payments for a specific collection
const getTotalPaymentsForCollection = catchAsync(async (req, res) => {
  const total = await statementService.getTotalPaymentsForCollection(req.params.collectionId);
  res.send({ total });
});

module.exports = {
  createStatement,
  bulkImportStatements,
  getStatements,
  getStatement,
  updateStatement,
  deleteStatement,
  getTotalPaymentsForNode,
  getTotalPaymentsForCollection,
};
