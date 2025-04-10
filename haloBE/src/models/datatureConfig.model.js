const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const serviceConfigSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    }, // e.g., Regular Service, Weekly Service, Special Service
    description: {
      type: String,
    },
    // Array of references to DataPoint documents defining which datapoints to capture.
    dataPoints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataPoint',
      },
    ],
  },
  { timestamps: true }
);

const ServiceForm = mongoose.model('ServiceForms', serviceConfigSchema);
module.exports = ServiceForm;