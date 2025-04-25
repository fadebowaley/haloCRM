const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */


const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.createUser(userBody);
};


const ownerCreate = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Email is already registered');
  }
  return User.createUser(userBody);
};


// const bulkCreate = async (usersBody) => {
//   const createdUsers = []; // To hold successfully created users
//   const errors = []; // To hold errors (e.g., duplicate emails)

//   for (let userData of usersBody) {
//     // Check if email already exists
//     const existingUser = await User.findOne({ email: userData.email });
//     if (existingUser) {
//       // Skip this user and add to errors report
//       errors.push({
//         email: userData.email,
//         error: 'User Email is already registered',
//       });
//       continue; // Skip this user and move to the next
//     }

//     try {
//       // Create the user using the User model's static method
//       const createdUser = await User.createBulk([userData]);
//       createdUsers.push(createdUser[0]); // Push the created user into the success report
//     } catch (error) {
//       // Handle other errors that may occur during creation (e.g., validation errors)
//       errors.push({
//         email: userData.email,
//         error: error.message || 'Unknown error occurred',
//       });
//     }
//   }
//   // Return the result with created users and errors
//   return {
//     createdUsers,
//     errors,
//   };
// };

const bulkCreate = async (usersBody, createdBy, tenantId) => {
  return await User.createBulk(usersBody, createdBy, tenantId);
};


const bulkSoftDeleteByTenantId = async (tenantId) => {
  // Initialize an array to store success and error results
  const successReport = [];
  const errorReport = [];

  // Fetch users by tenantId, excluding those already soft-deleted
  const usersToDelete = await User.find({ tenantId, deletedAt: { $exists: false } });

  // Iterate through each user and attempt the soft delete
  for (const user of usersToDelete) {
    try {
      // Perform soft delete by setting the `deletedAt` field
      const result = await User.updateOne({ _id: user._id }, { $set: { deletedAt: new Date() } });

      if (result.modifiedCount > 0) {
        // If the user was successfully soft deleted, add to the success report
        successReport.push({ userId: user.userId, email: user.email });
      } else {
        // If no user was deleted, add to the error report
        errorReport.push({ userId: user.userId, email: user.email, error: 'Failed to delete' });
      }
    } catch (error) {
      // Catch any errors and add them to the error report
      errorReport.push({ userId: user.userId, email: user.email, error: error.message });
    }
  }

  return { successReport, errorReport };
};

const restoreUsersByTenantId = async (tenantId) => {
  try {
    // Find soft-deleted users with the provided tenantId
    const usersToRestore = await User.find({tenantId: tenantId, deletedAt: { $ne: null } });
    const restoredUsers = [];
    const failedUsers = [];

    for (let user of usersToRestore) {
      try {
        // Restore the user
        user.deletedAt = null; // Nullify the deletedAt field to restore the user
        await user.save();
        restoredUsers.push(user);
      } catch (error) {
        // Capture the error if restoring a user fails
        failedUsers.push({ userId: user.userId, error: error.message });
      }
    }

    return { restoredUsers, failedUsers };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error during restore: ${error.message}`);
  }
};

const restoreUserByUserId = async (userId) => {
  try {
    // Find the soft-deleted user by userId
    const user = await User.findOne({ _id: userId, deletedAt: { $ne: null } });

    if (!user) {
      // If user is not found or is not soft-deleted, throw an error
      return { error: 'User not found or already restored' };
    }

    // Restore the user by nullifying the deletedAt field
    user.deletedAt = null;

    // Save the user back to the database
    await user.save();

    return { restoredUser: user };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error during restore: ${error.message}`);
  }
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */


const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */


const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};


const softDeleteUserById = async (userId) => {
  try {
    // Fetch the user by userId, ensuring they haven't already been soft-deleted
    const user = await User.findById(userId);

    if (!user) {
      // If the user doesn't exist, throw an error
      return { error: 'User not found' };
    }

    // Check if the user is already soft-deleted
    if (user.deletedAt) {
      return { error: 'User is already soft-deleted' };
    }

    // Perform the soft delete by setting the deletedAt field to the current date
    user.deletedAt = new Date();

    // Save the updated user
    await user.save();

    return { deletedUser: user };
  } catch (error) {
    // Handle errors that might occur
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error during soft delete: ${error.message}`);
  }
};


module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  ownerCreate,
  bulkCreate,
  bulkSoftDeleteByTenantId,
  restoreUserByUserId,
  restoreUsersByTenantId,
  softDeleteUserById,
};
