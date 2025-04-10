const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { adminService } = require('../services');

// Create a new admin
const createAdmin = catchAsync(async (req, res) => {
  const admin = await adminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).send(admin);
});

// Assign a role to an admin
const assignRole = catchAsync(async (req, res) => {
  const { adminId, role } = req.body;
  const updatedAdmin = await adminService.assignRole(adminId, role);
  res.send(updatedAdmin);
});

// Get a specific admin by ID
const getAdminById = catchAsync(async (req, res) => {
  const admin = await adminService.getAdminById(req.params.adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  res.send(admin);
});

// Query admins with filtering and pagination
const queryAdmins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'role', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await adminService.queryAdmins(filter, options);
  res.send(result);
});

// Get all admins under a tenant
const getAdminsByTenant = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const admins = await adminService.getAdminsByTenant(tenantId);
  res.send(admins);
});

// Update an admin by ID
const updateAdminById = catchAsync(async (req, res) => {
  const updated = await adminService.updateAdminById(req.params.adminId, req.body);
  res.send(updated);
});

// Delete an admin by ID
const deleteAdminById = catchAsync(async (req, res) => {
  await adminService.deleteAdminById(req.params.adminId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all admins under a tenant
const deleteAdminsByTenant = catchAsync(async (req, res) => {
  const tenantId = req.user.tenantId;
  const result = await adminService.deleteAdminsByTenant(tenantId);
  res.status(httpStatus.OK).json({
    message: result.message,
    deletedCount: result.deletedCount,
  });
});

module.exports = {
  createAdmin,
  assignRole,
  getAdminById,
  queryAdmins,
  getAdminsByTenant,
  updateAdminById,
  deleteAdminById,
  deleteAdminsByTenant,
};
