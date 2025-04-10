const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    tenantId: {
      type: String,
      index: true,
    },

    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: [] }],
    isOwner: { type: Boolean, default: false },
    isSuper: { type: Boolean, default: false },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Invalid email',
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true,
      validate: {
        validator: (value) => /\d/.test(value) && /[a-zA-Z]/.test(value),
        message: 'Password must contain at least one letter and one number',
      },
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins that convert mongoose to JSON and paginate
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(tenantPlugin);

/** create user body staic ethod */

/**
 * Generate a unique 10-digit userId
 * @returns {string}
 */
userSchema.statics.generateUserId = function () {
  return Math.random().toString().slice(2, 12); // Generates a random 10-digit string
};

/**
 * Generate a tenantId based on ownership
 * If user is an owner, generate a new tenantId.
 * If user is not an owner, get the tenantId of the creator.
 * @param {boolean} isOwner - Whether the user is an owner
 * @param {ObjectId} createdBy - The ID of the user who created this user
 * @returns {Promise<string>}
 */
userSchema.statics.generateTenantId = async function (isOwner, createdBy) {
  if (isOwner) {
    return Math.random().toString().slice(2, 12); // Generate a new tenant ID
  }
  if (!createdBy) {
    throw new Error('Non-owners must have a creator (createdBy field)');
  }

  // Retrieve creator's tenantId
  const creator = await this.findById(createdBy);
  if (!creator) {
    throw new Error('Creator not found');
  }
  return creator.tenantId;
};

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Create a user
 * @param {Object} userBody - The user data
 * @returns {Promise<User>}
 */

/**
 * Create a new user
 * - Generates a unique userId for the user
 * - Generates a tenantId based on whether the user is an owner or not
 * - Saves the user to the database
 * @param {Object} userBody - The user data
 * @returns {Promise<User>}
 */
userSchema.statics.create = async function (userBody) {
  // Generate a unique userId
  userBody.userId = this.generateUserId();

  // Generate a tenantId based on ownership
  userBody.tenantId = await this.generateTenantId(userBody.isOwner, userBody.createdBy);

  // Create a new user instance with the provided data
  const user = new this(userBody);

  // Save the user to the database
  await user.save();

  // Return the created user
  return user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);
module.exports = User;
