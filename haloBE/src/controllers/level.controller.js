const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { levelService } = require('../services');

// Create a new level
const createLevel = catchAsync(async (req, res) => {
  const level = await levelService.createLevel(req.body);
  res.status(httpStatus.CREATED).send(level);
});

// Get level by ID
const getLevelById = catchAsync(async (req, res) => {
  const level = await levelService.getLevelById(req.params.levelId);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  res.send(level);
});

// Get level by name
const getLevelByName = catchAsync(async (req, res) => {
  const level = await levelService.getLevelByName(req.params.levelName);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  res.send(level);
});

// Update level by ID
const updateLevelById = catchAsync(async (req, res) => {
  const updatedLevel = await levelService.updateLevelById(req.params.levelId, req.body);
  res.send(updatedLevel);
});

// Delete level by ID
const deleteLevelById = catchAsync(async (req, res) => {
  await levelService.deleteLevelById(req.params.levelId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Query levels with filters and pagination
const queryLevels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'parent']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await levelService.queryLevels(filter, options);
  res.send(result);
});

// Get levels by hierarchy
const getLevelsByHierarchy = catchAsync(async (req, res) => {
  const hierarchy = await levelService.getLevelsByHierarchy();
  res.send(hierarchy);
});

// Get parent level
const getParentLevel = catchAsync(async (req, res) => {
  const parentLevel = await levelService.getParentLevel(req.params.levelId);
  res.send(parentLevel);
});

// Get child levels
const getChildLevels = catchAsync(async (req, res) => {
  const childLevels = await levelService.getChildLevels(req.params.levelId);
  res.send(childLevels);
});

// Move level to a new parent
const moveLevelToParent = catchAsync(async (req, res) => {
  const updatedLevel = await levelService.moveLevelToParent(req.params.levelId, req.body.parentId);
  res.send(updatedLevel);
});

// Activate a level
const activateLevel = catchAsync(async (req, res) => {
  const updatedLevel = await levelService.activateLevel(req.params.levelId);
  res.send(updatedLevel);
});

// Deactivate a level
const deactivateLevel = catchAsync(async (req, res) => {
  const updatedLevel = await levelService.deactivateLevel(req.params.levelId);
  res.send(updatedLevel);
});

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
