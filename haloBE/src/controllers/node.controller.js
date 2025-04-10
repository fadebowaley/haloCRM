const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nodeService } = require('../services');

// Create a new node
const createNode = catchAsync(async (req, res) => {
  const node = await nodeService.createNode(req.body);
  res.status(httpStatus.CREATED).send(node);
});

// Get node by ID
const getNodeById = catchAsync(async (req, res) => {
  const node = await nodeService.getNodeById(req.params.nodeId);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  res.send(node);
});

// Get node by name
const getNodeByName = catchAsync(async (req, res) => {
  const node = await nodeService.getNodeByName(req.params.nodeName);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  res.send(node);
});

// Update node by ID
const updateNodeById = catchAsync(async (req, res) => {
  const updatedNode = await nodeService.updateNodeById(req.params.nodeId, req.body);
  res.send(updatedNode);
});

// Delete node by ID
const deleteNodeById = catchAsync(async (req, res) => {
  await nodeService.deleteNodeById(req.params.nodeId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Query nodes with filters and pagination
const queryNodes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'parent']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nodeService.queryNodes(filter, options);
  res.send(result);
});

// Get nodes by type
const getNodesByType = catchAsync(async (req, res) => {
  const nodes = await nodeService.getNodesByType(req.params.nodeType);
  res.send(nodes);
});

// Get parent node
const getParentNode = catchAsync(async (req, res) => {
  const parentNode = await nodeService.getParentNode(req.params.nodeId);
  res.send(parentNode);
});

// Get child nodes
const getChildNodes = catchAsync(async (req, res) => {
  const childNodes = await nodeService.getChildNodes(req.params.nodeId);
  res.send(childNodes);
});

// Move node to a new parent
const moveNodeToParent = catchAsync(async (req, res) => {
  const updatedNode = await nodeService.moveNodeToParent(req.params.nodeId, req.body.parentId);
  res.send(updatedNode);
});

// Get node path
const getNodePath = catchAsync(async (req, res) => {
  const path = await nodeService.getNodePath(req.params.nodeId);
  res.send(path);
});

// Activate a node
const activateNode = catchAsync(async (req, res) => {
  const updatedNode = await nodeService.activateNode(req.params.nodeId);
  res.send(updatedNode);
});

// Deactivate a node
const deactivateNode = catchAsync(async (req, res) => {
  const updatedNode = await nodeService.deactivateNode(req.params.nodeId);
  res.send(updatedNode);
});

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
