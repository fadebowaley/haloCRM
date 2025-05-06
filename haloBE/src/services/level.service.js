const httpStatus = require('http-status');
const { Level } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new level
 * @param {Object} levelBody
 * @returns {Promise<Level>}
 */
const createLevel = async (levelBody) => {
  return Level.createLevel(levelBody);
};

/**
 * Get level by id
 * @param {ObjectId} id
 * @returns {Promise<Level>}
 */

const getLevelById = async (id) => {
  const level = await Level.findById(id);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  return level;
};

/**
 * Get level by name
 * @param {string} name
 * @returns {Promise<Level>}
 */
const getLevelByName = async (name) => {
  const level = await Level.findOne({ name });
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  return level;
};

/**
 * Update level by id
 * @param {ObjectId} levelId
 * @param {Object} updateBody
 * @returns {Promise<Level>}
 */

const updateLevelById = async (levelId, updateBody) => {
  // Require tenantId in updateBody for this operation
  const { tenantId } = updateBody;
  if (!tenantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'tenantId is required to update a level');
  }

  // Find the level by both tenantId and _id (levelId)
  const level = await Level.findOne({ _id: levelId, tenantId });
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found for the given tenant');
  }

  // If updating rank or isSpecial
  const isSpecial = updateBody.isSpecial !== undefined ? updateBody.isSpecial : level.isSpecial;
  const rank = updateBody.rank !== undefined ? updateBody.rank : level.rank;

  if (!isSpecial) {
    const existing = await Level.findOne({
      _id: { $ne: levelId },
      tenantId,
      rank,
      isSpecial: false,
      deletedAt: null, // optionally ignore soft-deleted ones
    });

    if (existing) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Another non-special level with the same rank already exists for this tenant.');
    }
  }

  Object.assign(level, updateBody);
  await level.save();
  return level;
};

/**
 * Delete level by id
 * @param {ObjectId} levelId
 * @returns {Promise<Level>}
 */
const deleteLevelById = async (levelId) => {
  const level = await getLevelById(levelId);
  await level.remove();
  return level;
};

/**
 * Query for levels
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryLevels = async (filter, options) => {
  return Level.paginate(filter, options);
};

/**
 * Get levels by hierarchy
 * @param {number} hierarchy - Hierarchy level
 * @returns {Promise<Array<Level>>}
 */
const getLevelsByHierarchy = async (tenantId, hierarchy) => {
  return Level.getLevelsByHierarchy(tenantId, hierarchy);
};

/**
 * Get parent level
 * @param {ObjectId} levelId
 * @returns {Promise<Level>}
 */
const getParentLevel = async (levelId) => {
  const level = await getLevelById(levelId);
  if (!level.parentId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent level not found');
  }
  return getLevelById(level.parentId);
};

/**
 * Get child levels
 * @param {ObjectId} levelId
 * @returns {Promise<Array<Level>>}
 */
const getChildLevels = async (levelId) => {
  return Level.find({ parentId: levelId });
};

/**
 * Move level to new parent
 * @param {ObjectId} levelId
 * @param {ObjectId} newParentId
 * @returns {Promise<Level>}
 */
const moveLevelToParent = async (levelId, newParentId) => {
  const level = await getLevelById(levelId);
  const newParent = await getLevelById(newParentId);

  level.parentId = newParentId;
  level.hierarchy = newParent.hierarchy + 1;

  await level.save();
  return level;
};

/**
 * Activate level
 * @param {ObjectId} levelId
 * @returns {Promise<Level>}
 */
const activateLevel = async (levelId) => {
  const level = await getLevelById(levelId);
  level.isActive = true;
  await level.save();
  return level;
};

/**
 * Deactivate level
 * @param {ObjectId} levelId
 * @returns {Promise<Level>}
 */
const deactivateLevel = async (levelId) => {
  const level = await getLevelById(levelId);
  level.isActive = false;
  await level.save();
  return level;
};

module.exports = {
  createLevel,
  getLevelById,
  getLevelByName,
  updateLevelById,
  deleteLevelById,
  queryLevels,
  getLevelsByHierarchy,
  getParentLevel,
  getChildLevels,
  moveLevelToParent,
  activateLevel,
  deactivateLevel,
};
