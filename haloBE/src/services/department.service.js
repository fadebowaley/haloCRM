const httpStatus = require('http-status');
const { Department } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a department
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment = async (departmentBody) => {
  return Department.create(departmentBody);
};

/**
 * Get department by ID
 * @param {ObjectId} id
 * @returns {Promise<Department>}
 */
const getDepartmentById = async (id) => {
  return Department.findById(id);
};

/**
 * Query departments by tenant
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryDepartments = async (filter, options) => {
  return Department.paginate(filter, options);
};

/**
 * Update department by ID
 * @param {ObjectId} departmentId
 * @param {Object} updateBody
 * @returns {Promise<Department>}
 */
const updateDepartmentById = async (departmentId, updateBody) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  Object.assign(department, updateBody);
  await department.save();
  return department;
};

/**
 * Delete department by ID
 * @param {ObjectId} departmentId
 * @returns {Promise<Department>}
 */
const deleteDepartmentById = async (departmentId) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  await department.remove();
  return department;
};

/**
 * Assign node to department
 * @param {ObjectId} departmentId
 * @param {ObjectId} nodeId
 * @returns {Promise<Department>}
 */
const assignNodeToDepartment = async (departmentId, nodeId) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  department.node = nodeId;
  await department.save();
  return department;
};

/**
 * Delete all departments by tenant
 * @param {string} tenantId
 * @returns {Promise<Object>}
 */
const deleteAllDepartmentsByTenant = async (tenantId) => {
  const result = await Department.deleteMany({ tenantId });
  return {
    message: 'All departments deleted successfully',
    deletedCount: result.deletedCount,
  };
};

/**
 * Import departments from CSV/Excel
 * @param {Object} importData
 * @returns {Promise<Object>}
 */
const importDepartments = async (importData) => {
  // This is a placeholder implementation
  // In a real application, you would parse the CSV/Excel data and create departments
  const departments = [];
  for (const item of importData) {
    const department = await Department.create(item);
    departments.push(department);
  }
  return {
    message: 'Departments imported successfully',
    importedCount: departments.length,
  };
};

/**
 * Export departments to CSV/Excel
 * @param {Object} filter
 * @returns {Promise<Object>}
 */
const exportDepartments = async (filter) => {
  // This is a placeholder implementation
  // In a real application, you would fetch departments and format them for export
  const departments = await Department.find(filter);
  return {
    message: 'Departments exported successfully',
    departments,
  };
};

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
