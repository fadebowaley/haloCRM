const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

// Subdocument schema for a captured datapoint
//const appSchema = mongoose.Schema(

const CapturedDataPointSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // Reference to the DataPoint definition (e.g., "men", "youth", "weather", etc.)
    dataPoint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DataPoint',
      required: true,
    },
    // The actual value captured for this datapoint
    value: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false } // We don't need a separate _id for each subdocument.
);

const ServiceDataSchema = mongoose.Schema(
  {
    // Tenant identifier for filtering in a multitenant app
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    // The configuration/template used for this service event
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceForms',
      required: true,
    },
    // Date when the service took place
    serviceDate: {
      type: Date,
      required: true,
    },
    // Array of captured datapoints for this service event
    dataPoints: [CapturedDataPointSchema],
  },
  { timestamps: true }
);


const ServiceData = mongoose.model('ServiceDatas', ServiceDataSchema);
module.exports = ServiceData;