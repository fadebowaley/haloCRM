const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const userProfileSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value),
      message: 'Tenant ID must be alphanumeric',
    },
  },
  title: { type: String, required: true },
  otherName: { type: String, required: false },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: 'Phone number is not valid',
    },
  },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => validator.isDate(value),
      message: 'Date of birth must be a valid date',
    },
  },
  highestQualification: { type: String, required: true },
  professional: { type: String, required: true },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
    required: true,
  },
  stateOfOrigin: { type: String, required: true },
  lgaOfOrigin: { type: String, required: true },
  homeTown: { type: String, required: true },
  spouseName: { type: String, required: false },
  spousePhoneNumber: {
    type: String,
    required: false,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: 'Spouse phone number is not valid',
    },
  },
  spouseDateOfBirth: {
    type: Date,
    required: false,
    validate: {
      validator: (value) => validator.isDate(value),
      message: 'Spouse date of birth must be a valid date',
    },
  },
  nextOfKinName: { type: String, required: true },
  nextOfKinPhoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: 'Next of kin phone number is not valid',
    },
  },
  nextOfKinRelationship: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  stateOfResidence: { type: String, required: true },
  lgaOfResidence: { type: String, required: true },
  employmentCategory: { type: String, required: true },
  occupation: { type: String, required: true },
  employeeId: { type: String, required: false },

  // Relationships
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true }); // Fixed missing curly brace

// add plugin that converts mongoose to json
userProfileSchema.plugin(toJSON);
userProfileSchema.plugin(paginate);
userProfileSchema.plugin(tenantPlugin);


/**
 * @typedef User
 */
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
