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

module.exports = {
  ownerCreate,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
