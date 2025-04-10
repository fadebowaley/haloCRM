const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const ChurchProfileSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // Reference to the church
    church: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Church', // Assuming ChurchStructure is the model for churches
      required: true, // Assuming this reference is mandatory
    },
    // Additional Information
    dateOfEstablishment: { type: Date },
    propertyStatus: {
      type: String,
      enum: ['Owned', 'Rented', 'Leased', 'Other'],
      default: 'Owned',
    },
    estimatedValue: { type: mongoose.Schema.Types.Decimal128 }, // Precise monetary value
    buildingType: { type: String }, // e.g., "Auditorium", "Hall", "Tent", etc.
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Under Construction'],
      default: 'Active',
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = conn.model('Church', ChurchProfileSchema);
