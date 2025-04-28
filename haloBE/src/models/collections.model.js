const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const collectionSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true }, // User-input amount
    deletedAt: { type: Date, default: null },
    assignedParameters: [
      {
        parameter: { type: mongoose.Schema.Types.ObjectId, ref: 'Parameter' },
        computedValue: { type: Number }, // Store computed value after applying logic
      },
    ],
    finalValue: { type: Number }, // Stores the final computed offering value
    isCompulsory: { type: Boolean, required: true }, // Indicates if the offering is compulsory or optional
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
collectionSchema.plugin(toJSON);
collectionSchema.plugin(paginate);

/**
 * @typedef Collection
 */
const Collection = mongoose.model('Collections', collectionSchema);

module.exports = Collection;
