const httpStatus = require('http-status');
const { Structure } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new structure
 * @param {Object} structureBody
 * @returns {Promise<Structure>}
 */
const createStructure = async (structureBody) => {
  return Structure.create(structureBody);
};

/**
 * Get structure by id
 * @param {ObjectId} id
 * @returns {Promise<Structure>}
 */
const getStructureById = async (id) => {
  const structure = await Structure.findById(id);
  if (!structure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Structure not found');
  }
  return structure;
};

/**
 * Get structure by name
 * @param {string} name
 * @returns {Promise<Structure>}
 */
const getStructureByName = async (name) => {
  const structure = await Structure.findOne({ name });
  if (!structure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Structure not found');
  }
  return structure;
};

/**
 * Update structure by id
 * @param {ObjectId} structureId
 * @param {Object} updateBody
 * @returns {Promise<Structure>}
 */
const updateStructureById = async (structureId, updateBody) => {
  const structure = await getStructureById(structureId);
  Object.assign(structure, updateBody);
  await structure.save();
  return structure;
};

/**
 * Delete structure by id
 * @param {ObjectId} structureId
 * @returns {Promise<Structure>}
 */
const deleteStructureById = async (structureId) => {
  const structure = await getStructureById(structureId);
  await structure.remove();
  return structure;
};

/**
 * Query for structures
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStructures = async (filter, options) => {
  return Structure.paginate(filter, options);
};

/**
 * Get structures by type
 * @param {string} type - Structure type
 * @returns {Promise<Array<Structure>>}
 */
const getStructuresByType = async (type) => {
  return Structure.find({ type });
};

/**
 * Get parent structure
 * @param {ObjectId} structureId
 * @returns {Promise<Structure>}
 */
const getParentStructure = async (structureId) => {
  const structure = await getStructureById(structureId);
  if (!structure.parentId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent structure not found');
  }
  return getStructureById(structure.parentId);
};

/**
 * Get child structures
 * @param {ObjectId} structureId
 * @returns {Promise<Array<Structure>>}
 */
const getChildStructures = async (structureId) => {
  return Structure.find({ parentId: structureId });
};

/**
 * Move structure to new parent
 * @param {ObjectId} structureId
 * @param {ObjectId} newParentId
 * @returns {Promise<Structure>}
 */
const moveStructureToParent = async (structureId, newParentId) => {
  const structure = await getStructureById(structureId);
  const newParent = await getStructureById(newParentId);

  structure.parentId = newParentId;
  structure.path = `${newParent.path}/${structure.name}`;

  await structure.save();
  return structure;
};

/**
 * Get structure path
 * @param {ObjectId} structureId
 * @returns {Promise<string>}
 */
const getStructurePath = async (structureId) => {
  const structure = await getStructureById(structureId);
  return structure.path;
};

/**
 * Get structure hierarchy
 * @param {ObjectId} structureId
 * @returns {Promise<Array<Structure>>}
 */
const getStructureHierarchy = async (structureId) => {
  const structure = await getStructureById(structureId);
  const hierarchy = [structure];

  let currentStructure = structure;
  while (currentStructure.parentId) {
    currentStructure = await getStructureById(currentStructure.parentId);
    hierarchy.unshift(currentStructure);
  }

  return hierarchy;
};

/**
 * Activate structure
 * @param {ObjectId} structureId
 * @returns {Promise<Structure>}
 */
const activateStructure = async (structureId) => {
  const structure = await getStructureById(structureId);
  structure.isActive = true;
  await structure.save();
  return structure;
};

/**
 * Deactivate structure
 * @param {ObjectId} structureId
 * @returns {Promise<Structure>}
 */
const deactivateStructure = async (structureId) => {
  const structure = await getStructureById(structureId);
  structure.isActive = false;
  await structure.save();
  return structure;
};

module.exports = {
  createStructure,
  getStructureById,
  getStructureByName,
  updateStructureById,
  deleteStructureById,
  queryStructures,
  getStructuresByType,
  getParentStructure,
  getChildStructures,
  moveStructureToParent,
  getStructurePath,
  getStructureHierarchy,
  activateStructure,
  deactivateStructure,
};
