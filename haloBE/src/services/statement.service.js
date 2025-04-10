const httpStatus = require('http-status');
const { Statement, Node, Collection } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new statement
 * @param {Object} statementBody
 * @param {ObjectId} userId - The ID of the user creating the statement
 * @returns {Promise<Statement>}
 */
const createStatement = async (statementBody, userId) => {
  // Ensure that the node and collection exist and are valid
  const node = await Node.findById(statementBody.nodeId);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }

  const collection = await Collection.findById(statementBody.collectionId);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }

  // Creating the statement
  return Statement.create({
    ...statementBody,
    userId,
  });
};

/**
 * Query for statements
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStatements = async (filter, options) => {
  return Statement.paginate(filter, options);
};

/**
 * Get statement by ID
 * @param {ObjectId} id
 * @returns {Promise<Statement>}
 */
const getStatementById = async (id) => {
  const statement = await Statement.findById(id);
  if (!statement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statement not found');
  }
  return statement;
};

/**
 * Update statement by ID
 * @param {ObjectId} statementId
 * @param {Object} updateBody
 * @returns {Promise<Statement>}
 */
const updateStatementById = async (statementId, updateBody) => {
  const statement = await getStatementById(statementId);
  if (!statement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statement not found');
  }

  Object.assign(statement, updateBody);
  await statement.save();
  return statement;
};

/**
 * Delete statement by ID
 * @param {ObjectId} statementId
 * @returns {Promise<Statement>}
 */
const deleteStatementById = async (statementId) => {
  const statement = await getStatementById(statementId);
  if (!statement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statement not found');
  }
  await statement.remove();
  return statement;
};

/**
 * Bulk import statements
 * @param {Array} statementsData - Array of statement objects to be imported
 * @param {ObjectId} userId - The ID of the user performing the import
 * @returns {Promise<Array>}
 */
const bulkImportStatements = async (statementsData, userId) => {
  const statements = await Statement.insertMany(
    statementsData.map((data) => ({
      ...data,
      userId,
    }))
  );
  return statements;
};

/**
 * Get total payments for a node
 * @param {ObjectId} nodeId
 * @returns {Promise<number>}
 */
const getTotalPaymentsForNode = async (nodeId) => {
  const totalPayments = await Statement.aggregate([
    { $match: { nodeId } },
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
  ]);
  return totalPayments[0]?.totalAmount || 0;
};

/**
 * Get total payments for a collection
 * @param {ObjectId} collectionId
 * @returns {Promise<number>}
 */
const getTotalPaymentsForCollection = async (collectionId) => {
  const totalPayments = await Statement.aggregate([
    { $match: { collectionId } },
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
  ]);
  return totalPayments[0]?.totalAmount || 0;
};

module.exports = {
  createStatement,
  queryStatements,
  getStatementById,
  updateStatementById,
  deleteStatementById,
  bulkImportStatements,
  getTotalPaymentsForNode,
  getTotalPaymentsForCollection,
};
