const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { structureService } = require('../services');

// Create a new structure
const createStructure = catchAsync(async (req, res) => {
  const structure = await structureService.createStructure(req.body);
  res.status(httpStatus.CREATED).send(structure);
});

// Get structure by ID
const getStructure = catchAsync(async (req, res) => {
  const structure = await structureService.getStructureById(req.params.structureId);
  if (!structure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Structure not found');
  }
  res.send(structure);
});

// Get structure by name
const getStructureByName = catchAsync(async (req, res) => {
  const structure = await structureService.getStructureByName(req.params.name);
  if (!structure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Structure not found');
  }
  res.send(structure);
});

// Update structure
const updateStructure = catchAsync(async (req, res) => {
  const updated = await structureService.updateStructureById(req.params.structureId, req.body);
  res.send(updated);
});

// Delete structure
const deleteStructure = catchAsync(async (req, res) => {
  await structureService.deleteStructureById(req.params.structureId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Query structures
const getStructures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await structureService.queryStructures(filter, options);
  res.send(result);
});

// Get structures by type
const getStructuresByType = catchAsync(async (req, res) => {
  const structures = await structureService.getStructuresByType(req.params.type);
  res.send(structures);
});

// Get parent structure
const getParentStructure = catchAsync(async (req, res) => {
  const parent = await structureService.getParentStructure(req.params.structureId);
  res.send(parent);
});

// Get child structures
const getChildStructures = catchAsync(async (req, res) => {
  const children = await structureService.getChildStructures(req.params.structureId);
  res.send(children);
});

// Move structure to a new parent
const moveStructureToParent = catchAsync(async (req, res) => {
  const result = await structureService.moveStructureToParent(req.params.structureId, req.body.parentId);
  res.send(result);
});

// Get full structure path
const getStructurePath = catchAsync(async (req, res) => {
  const path = await structureService.getStructurePath(req.params.structureId);
  res.send(path);
});

// Get hierarchy
const getStructureHierarchy = catchAsync(async (req, res) => {
  const hierarchy = await structureService.getStructureHierarchy(req.params.structureId);
  res.send(hierarchy);
});

// Activate a structure
const activateStructure = catchAsync(async (req, res) => {
  const result = await structureService.activateStructure(req.params.structureId);
  res.send(result);
});

// Deactivate a structure
const deactivateStructure = catchAsync(async (req, res) => {
  const result = await structureService.deactivateStructure(req.params.structureId);
  res.send(result);
});

module.exports = {
  createStructure,
  getStructure,
  getStructureByName,
  updateStructure,
  deleteStructure,
  getStructures,
  getStructuresByType,
  getParentStructure,
  getChildStructures,
  moveStructureToParent,
  getStructurePath,
  getStructureHierarchy,
  activateStructure,
  deactivateStructure,
};
