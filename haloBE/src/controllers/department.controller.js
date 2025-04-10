const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

// Create a new department
const createDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

// Get department by ID
const getDepartmentById = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  res.send(department);
});

// Query departments with filters and pagination
const queryDepartments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await departmentService.queryDepartments(filter, options);
  res.send(result);
});

// Update department by ID
const updateDepartmentById = catchAsync(async (req, res) => {
  const updatedDepartment = await departmentService.updateDepartmentById(req.params.departmentId, req.body);
  res.send(updatedDepartment);
});

// Delete department by ID
const deleteDepartmentById = catchAsync(async (req, res) => {
  await departmentService.deleteDepartmentById(req.params.departmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Assign node to department
const assignNodeToDepartment = catchAsync(async (req, res) => {
  const updatedDepartment = await departmentService.assignNodeToDepartment(req.params.departmentId, req.body.nodeId);
  res.send(updatedDepartment);
});

// Delete all departments by tenant
const deleteAllDepartmentsByTenant = catchAsync(async (req, res) => {
  const result = await departmentService.deleteAllDepartmentsByTenant(req.user.tenantId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Import departments from CSV/Excel
const importDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.importDepartments(req.body);
  res.status(httpStatus.CREATED).send(result);
});

// Export departments to CSV/Excel
const exportDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.exportDepartments(req.query);
  res.send(result);
});

module.exports = {
  createDepartment,
  getDepartmentById,
  queryDepartments,
  updateDepartmentById,
  deleteDepartmentById,
  assignNodeToDepartment,
  deleteAllDepartmentsByTenant,
  importDepartments,
  exportDepartments,
};
