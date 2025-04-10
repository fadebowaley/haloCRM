// Parameter Schema: Defines different types of parameters
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const CollectionTagSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },
    name: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: [
        'fixed',
        'percentage',
        'conditional',
        'hierarchy',
        'custom',
        'Loan',
        'subscription',
        'one-time',
        'installment',
        'discount',
        'rebate',
        'gift',
        'cashback',
        'special',
        'repayment',
      ],
      required: true,
    },
    value: { type: Number, required: false }, // Value for fixed, percentage, or custom types
    condition: { type: String, required: false }, // For conditional logic (e.g., "If amount < 10000, then 2000")
    hierarchy_level: { type: String, required: false }, // For hierarchy-based parameters
    custom_logic: { type: String, required: false }, // Placeholder for advanced custom rules
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
CollectionTagSchema.plugin(toJSON);
CollectionTagSchema.plugin(paginate);

/**
 * @typedef CollectionTag
 */
const CollectionTag = mongoose.model('CollectionTags', CollectionTagSchema);
module.exports = CollectionTag;