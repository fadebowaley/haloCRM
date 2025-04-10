const httpStatus = require('http-status');
const { Collection } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a collection
 * @param {Object} collectionBody
 * @returns {Promise<Collection>}
 */
const createCollection = async (collectionBody) => {
  return Collection.create(collectionBody);
};

/**
 * Query for collections
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCollections = async (filter, options) => {
  return Collection.paginate(filter, options);
};

/**
 * Get collection by id
 * @param {ObjectId} id
 * @returns {Promise<Collection>}
 */
const getCollectionById = async (id) => {
  return Collection.findById(id);
};

/**
 * Get collection by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Collection>}
 */
const updateCollectionById = async (collectionId, updateBody) => {
  const collection = await getCollectionById(collectionId);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }
  Object.assign(collection, updateBody);
  await collection.save();
  return collection;
};

/**
 * Delete collection by id
 * @param {ObjectId} collectionId
 * @returns {Promise<Collection>}
 */
const deleteCollectionById = async (collectionId) => {
  const collection = await getCollectionById(collectionId);
  if (!collection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collection not found');
  }
  await collection.remove();
  return collection;
};

/**
 * Get collections by tenant id
 * @param {string} tenantId
 * @returns {Promise<Collection[]>}
 */
const getCollectionsByTenantId = async (tenantId) => {
  return Collection.find({ tenantId });
};

module.exports = {
  createCollection,
  queryCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
  getCollectionsByTenantId,
};
