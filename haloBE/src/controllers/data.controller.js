const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dataService } = require('../services');

// Create a new data entry
const createData = catchAsync(async (req, res) => {
  const data = await dataService.createData(req.body);
  res.status(httpStatus.CREATED).send(data);
});

// Get data by ID
const getDataById = catchAsync(async (req, res) => {
  const data = await dataService.getDataById(req.params.dataId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(data);
});

// Get data by name
const getDataByName = catchAsync(async (req, res) => {
  const data = await dataService.getDataByName(req.params.name);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(data);
});

// Update data by ID
const updateDataById = catchAsync(async (req, res) => {
  const updatedData = await dataService.updateDataById(req.params.dataId, req.body);
  res.send(updatedData);
});

// Delete data by ID
const deleteDataById = catchAsync(async (req, res) => {
  await dataService.deleteDataById(req.params.dataId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Query data with filters and pagination
const queryData = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type', 'isPublic']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dataService.queryData(filter, options);
  res.send(result);
});

// Import data
const importData = catchAsync(async (req, res) => {
  const imported = await dataService.importData(req.body);
  res.status(httpStatus.CREATED).send(imported);
});

// Export data
const exportData = catchAsync(async (req, res) => {
  const exported = await dataService.exportData(req.query);
  res.send(exported);
});

// Make data public
const makeDataPublic = catchAsync(async (req, res) => {
  const updated = await dataService.makeDataPublic(req.params.dataId);
  res.send(updated);
});

// Make data private
const makeDataPrivate = catchAsync(async (req, res) => {
  const updated = await dataService.makeDataPrivate(req.params.dataId);
  res.send(updated);
});

module.exports = {
  createData,
  getDataById,
  getDataByName,
  updateDataById,
  deleteDataById,
  queryData,
  importData,
  exportData,
  makeDataPublic,
  makeDataPrivate,
};
