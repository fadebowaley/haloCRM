const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Role, Permission } = require('../models');
const ApiError = require('../utils/ApiError');
const roleTemplates = require('../utils/role');



/**
 * Create a new role
 * @param {Object} JSON
 * @returns {Promise<Role>}
 */


const getRoleTemplatesByIndustry = async () => {
  try {
    return roleTemplates;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || 'Error creating roles');
  }
};



/**
 * Create a new role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */

const createRole = async (roleBody, user) => {
  if (!user?.isOwner && !user?.hasPermissionToCreateRoles) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to create roles');
  }
  // Ensure role name is unique per tenant
  const existing = await Role.findOne({ name: roleBody.name, tenantId: user.tenantId });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already exists for this tenant');
  }
  console.log('looking up data', user )
  return Role.createRole(roleBody, user);
};

/**
 * Bulk create roles
 * @param {Array<Object>} rolesArray
 * @param {Object} user
 * @returns {Promise<Array<Role>>}
 ***{
  "rolesArray": [
    {
      "name": "Admin",
      "description": "Administrator with full permissions"
    },
    {
      "name": "Editor",
      "description": "Can edit content"
    },
    {
      "name": "Viewer",
      "description": "Can view content"
    }
  ]
}

 */

const bulkCreateRoles = async (rolesArray, user) => {
  try {
    return await Role.bulkCreateRoles(rolesArray, user);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || 'Error creating roles');
  }
};

/**
 * Query roles with filters and pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */

const queryRoles = async (filter, options) => {
  const roles = await Role.paginate(filter, options);
  return roles;
};

/**
 * Get a role by its ID
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */

const getRoleById = async (id) => {
  return Role.findById(id);
};

/**
 * Update a role by its ID
 * @param {ObjectId} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */

const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  if (updateBody.name && updateBody.name !== role.name) {
    const existing = await Role.findOne({ name: updateBody.name });
    if (existing) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Role name already exists');
    }
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

/**
 * Delete a role by its ID
 * @param {ObjectId} roleId
 * @returns {Promise<Role>}
 */

const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.remove();
  return role;
};

/**
 * Delete all roles for a specific tenant
 * @param {string} tenantId
 * @returns {Promise<void>}
 */

// Service: deleteAllRoles
const deleteAllRoles = async (tenantId) => {
  if (!tenantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tenant ID is required');
  }
  try {
    // Perform the deletion
    const result = await Role.deleteMany({ tenantId });
    // If no roles were deleted, throw a not found error
    if (result.deletedCount === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No roles found for this tenant');
    }
    // Return the result with the number of deleted roles
    return {
      message: `${result.deletedCount} roles successfully deleted.`,
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting roles', error);
  }
};

/**
 * Assign permissions to a role
 * @param {ObjectId} roleId
 * @param {Array<string>} permissions
 * @returns {Promise<Role>}
 */

const assignPermissions = async (roleId, inputPermissions) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  // Normalize input to array
  const incoming = Array.isArray(inputPermissions) ? inputPermissions : [inputPermissions];

  // Ensure all are valid ObjectIds
  const validObjectIds = incoming.filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (validObjectIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No valid permission IDs provided');
  }
  // Get valid permission IDs from DB
  const validPermissions = await Permission.find({ _id: { $in: validObjectIds } }, '_id');
  const validIds = validPermissions.map((p) => p._id.toString());
  // Merge with existing, remove duplicates
  const current = role.permissions.map((p) => p.toString());
  const merged = Array.from(new Set([...current, ...validIds]));
  // Only update if there are new additions
  if (merged.length !== current.length) {
    role.permissions = merged;
    await role.save();
  }

  return role;
};


module.exports = {
  createRole,
  queryRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  assignPermissions,
  bulkCreateRoles,
  deleteAllRoles,
  getRoleTemplatesByIndustry,
};
