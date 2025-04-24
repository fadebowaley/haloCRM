const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

//Function to create users by owner Profile
const ownerCreate = catchAsync(async (req, res) => {
  req.body.createdBy = req.user._id; // 🔐 enforce ownership context
  const user = await userService.ownerCreate(req.body);
  res.status(httpStatus.CREATED).send(user);
});


// Function to bulk create users
const bulkCreate = catchAsync(async (req, res) => {
  req.body.createdBy = req.user._id; // Enforce ownership context for each user

  // Call the bulkCreate method from the user service
  const { createdUsers, errors } = await userService.bulkCreate(req.body);

  // Return the response
  if (createdUsers.length > 0 || errors.length > 0) {
    return res.status(httpStatus.CREATED).send({
      message: 'Bulk user creation completed',
      createdUsers,
      errors,
    });
  }
  // If no users were created or errors exist
  res.status(httpStatus.BAD_REQUEST).send({ message: 'No users were created or all had errors', errors });
});


// Function to soft delete users by tenantId and isOwner flag
const bulkDelete = catchAsync(async (req, res) => {
  const { tenantId } = req.body; // Expecting tenantId in the request body

  // Validate if tenantId is provided
  if (!tenantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tenant ID is required for deletion');
  }

  // Call the service to perform the bulk soft delete
  const { successReport, errorReport } = await userService.bulkSoftDeleteByTenantId(tenantId);

  // If no users were soft-deleted, return an error
  if (successReport.length === 0 && errorReport.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found to soft delete for the provided tenant ID');
  }

  // Return success response with report
  res.status(httpStatus.OK).send({
    message: 'Bulk delete operation completed',
    successReport,
    errorReport,
  });
});

// Function to restore users by tenantId
const restoreUsers = catchAsync(async (req, res) => {
  const { tenantId } = req.body; // Expecting a single tenantId in the request body

  if (!tenantId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tenant ID is required for restoring');
  }
  // Call the restore function in userService
  const { restoredUsers, failedUsers } = await userService.restoreUsersByTenantId(tenantId);

  // Check if any users were restored
  if (restoredUsers.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No soft-deleted users found with the provided tenant ID');
  }

  // Return success response with detailed report
  res.status(httpStatus.OK).send({
    message: `${restoredUsers.length} users restored successfully`,
    restoredUsers,
    failedUsers,
  });
});

// Function to restore a single user by userId
const restoreUser = catchAsync(async (req, res) => {
  const { userId } = req.params; // Expecting a userId as a URL parameter

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required for restoring');
  }

  // Call the restore function in userService
  const { restoredUser, error } = await userService.restoreUserByUserId(userId);

  // Check if the user was restored
  if (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error);
  }

  // Return success response with the restored user data
  res.status(httpStatus.OK).send({
    message: 'User restored successfully',
    restoredUser,
  });
});

//getting all users or users based on tenantid of owner
const getUsers = catchAsync(async (req, res) => {
  //const filter = pick(req.query, ['name', 'role']);
  const filter = pick(req.query, ['firstname', 'lastname', 'userId', 'email']);
const { q } = req.query;

// If userId is passed (10-digit string), search by that field directly
if (filter.userId) {
  filter.userId = filter.userId;
}
// If 'q' is present, override filters with regex OR search
if (q) {
  const regex = new RegExp(q, 'i'); // case-insensitive
  filter = {
    $or: [{ firstname: regex }, { lastname: regex }, { email: regex }, { userId: regex }],
  };
}
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.user = req.user; // Add the user object to options
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

//Function to get a particular user
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});


const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});


const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


const softDeleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params; // Get the userId from URL parameters
  // Call the soft delete function in the userService
  const { deletedUser, error } = await userService.softDeleteUserById(userId);
  if (error) {
    throw new ApiError(httpStatus.NOT_FOUND, error);
  }
  // Return a success response
  res.status(httpStatus.OK).send({
    message: 'User soft deleted successfully',
    deletedUser,
  });
});


module.exports = {
  ownerCreate,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  bulkCreate,
  bulkDelete,
  restoreUser,
  restoreUsers,
  softDeleteUser
  // bulk create
};
