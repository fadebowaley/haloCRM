const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const DataPointSchema = new mongoose.Schema(
  {
    // Identifier to associate the datapoint with a specific tenant.
    tenantId: {
      type: String,
      required: true,
      index: true,
      validate: {
        validator: (value) => validator.isAlphanumeric(value),
        message: 'Tenant ID must be alphanumeric',
      },
    },
    // The name of the datapoint (e.g., "men", "youth", "weather").
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isAlpha(value, 'en-US', { ignore: ' ' }),
        message: 'Name must contain only letters and spaces',
      },
    },
    // A brief description of what this datapoint represents.
    description: {
      type: String,
      validate: {
        validator: (value) => validator.isLength(value, { max: 200 }),
        message: 'Description cannot exceed 200 characters',
      },
    },
    // The expected data type for this datapoint's value.
    // This can help in validating and formatting the captured data.
    dataType: {
      type: String,
      required: true,
      enum: ['Number', 'String', 'Boolean', 'Date', 'Object'],
      default: 'Number',
    },
    // Indicates whether capturing this datapoint is required.
    isRequired: {
      type: Boolean,
      default: false,
    },
    // A default value that can be used if no value is provided.
    defaultValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
DataPointSchema.plugin(toJSON);
DataPointSchema.plugin(paginate);

/**
 * @typedef DataPoint
 */
const DataPoint = mongoose.model('DataPoint', DataPointSchema);

module.exports = DataPoint;
