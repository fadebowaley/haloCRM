const httpStatus = require('http-status');
const { Admin } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an admin user for a tenant
 * @param {Object} adminBody
 * @returns {Promise<Admin>}
 */
const createAdmin = async (adminBody) => {
  return Admin.create(adminBody);
};

/**
 * Assign or update role for an admin
 * @param {ObjectId} adminId
 * @param {Object} roleData
 * @returns {Promise<Admin>}
 */
const assignRole = async (adminId, roleData) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  Object.assign(admin, roleData);
  return admin.save();
};

/**
 * Get admin by ID
 * @param {ObjectId} id
 * @returns {Promise<Admin>}
 */
const getAdminById = async (id) => {
  return Admin.findById(id);
};

/**
 * Query all admins based on filters
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryAdmins = async (filter, options) => {
  return Admin.paginate(filter, options);
};

/**
 * Get all admins for a tenant
 * @param {ObjectId} tenantId
 * @returns {Promise<Array<Admin>>}
 */
const getAdminsByTenant = async (tenantId) => {
  return Admin.find({ tenantId });
};

/**
 * Update admin by ID
 * @param {ObjectId} adminId
 * @param {Object} updateBody
 * @returns {Promise<Admin>}
 */
const updateAdminById = async (adminId, updateBody) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  Object.assign(admin, updateBody);
  await admin.save();
  return admin;
};

/**
 * Remove admin by ID
 * @param {ObjectId} adminId
 * @returns {Promise<Admin>}
 */
const deleteAdminById = async (adminId) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  await admin.remove();
  return admin;
};

/**
 * Delete all admin roles for a tenant
 * @param {ObjectId} tenantId
 * @returns {Promise}
 */
const deleteAdminsByTenant = async (tenantId) => {
  return Admin.deleteMany({ tenantId });
};

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
