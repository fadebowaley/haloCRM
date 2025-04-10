const httpStatus = require('http-status');
const { Node } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new node
 * @param {Object} nodeBody
 * @returns {Promise<Node>}
 */
const createNode = async (nodeBody) => {
  return Node.create(nodeBody);
};

/**
 * Get node by id
 * @param {ObjectId} id
 * @returns {Promise<Node>}
 */
const getNodeById = async (id) => {
  const node = await Node.findById(id);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  return node;
};

/**
 * Get node by name
 * @param {string} name
 * @returns {Promise<Node>}
 */
const getNodeByName = async (name) => {
  const node = await Node.findOne({ name });
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  return node;
};

/**
 * Update node by id
 * @param {ObjectId} nodeId
 * @param {Object} updateBody
 * @returns {Promise<Node>}
 */
const updateNodeById = async (nodeId, updateBody) => {
  const node = await getNodeById(nodeId);
  Object.assign(node, updateBody);
  await node.save();
  return node;
};

/**
 * Delete node by id
 * @param {ObjectId} nodeId
 * @returns {Promise<Node>}
 */
const deleteNodeById = async (nodeId) => {
  const node = await getNodeById(nodeId);
  await node.remove();
  return node;
};

/**
 * Query for nodes
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNodes = async (filter, options) => {
  return Node.paginate(filter, options);
};

/**
 * Get nodes by type
 * @param {string} type - Node type
 * @returns {Promise<Array<Node>>}
 */
const getNodesByType = async (type) => {
  return Node.find({ type });
};

/**
 * Get parent node
 * @param {ObjectId} nodeId
 * @returns {Promise<Node>}
 */
const getParentNode = async (nodeId) => {
  const node = await getNodeById(nodeId);
  if (!node.parentId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent node not found');
  }
  return getNodeById(node.parentId);
};

/**
 * Get child nodes
 * @param {ObjectId} nodeId
 * @returns {Promise<Array<Node>>}
 */
const getChildNodes = async (nodeId) => {
  return Node.find({ parentId: nodeId });
};

/**
 * Move node to new parent
 * @param {ObjectId} nodeId
 * @param {ObjectId} newParentId
 * @returns {Promise<Node>}
 */
const moveNodeToParent = async (nodeId, newParentId) => {
  const node = await getNodeById(nodeId);
  const newParent = await getNodeById(newParentId);

  node.parentId = newParentId;
  node.path = `${newParent.path}/${node.name}`;

  await node.save();
  return node;
};

/**
 * Get node path
 * @param {ObjectId} nodeId
 * @returns {Promise<string>}
 */
const getNodePath = async (nodeId) => {
  const node = await getNodeById(nodeId);
  return node.path;
};

/**
 * Activate node
 * @param {ObjectId} nodeId
 * @returns {Promise<Node>}
 */
const activateNode = async (nodeId) => {
  const node = await getNodeById(nodeId);
  node.isActive = true;
  await node.save();
  return node;
};

/**
 * Deactivate node
 * @param {ObjectId} nodeId
 * @returns {Promise<Node>}
 */
const deactivateNode = async (nodeId) => {
  const node = await getNodeById(nodeId);
  node.isActive = false;
  await node.save();
  return node;
};

module.exports = {
  createNode,
  getNodeById,
  getNodeByName,
  updateNodeById,
  deleteNodeById,
  queryNodes,
  getNodesByType,
  getParentNode,
  getChildNodes,
  moveNodeToParent,
  getNodePath,
  activateNode,
  deactivateNode,
};
