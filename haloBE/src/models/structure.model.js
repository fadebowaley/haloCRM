const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate,tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const structureSchema = mongoose.Schema({
  tenantId: {
    type: String,
    index: true,
  },

  name: {
    type: String,
    required: true,
  },
  // Reference to the type/level of this structure (e.g., national, region, province, etc.)
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  // Parent structure reference. If null, this is the root structure for the tenant.
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Structures',
    default: null,
  },
  // Materialized path representing the full hierarchy for quick subtree retrieval.
  path: {
    type: String,
    default: '',
  },
  // Optional additional fields
  description: { type: String },
  address: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// add plugin that converts mongoose to json
structureSchema.plugin(toJSON);
structureSchema.plugin(paginate);
structureSchema.plugin(tenantPlugin);

/**
 * @typedef Structures
 */

// If there's a parent, the path is the parent's path appended with this document's id.
structureSchema.pre('save', async function (next) {
  try {
    if (this.parent) {
      const parentDoc = await this.constructor.findById(this.parent);
      this.path = parentDoc.path ? `${parentDoc.path}/${this._id}` : `${this.parent}/${this._id}`;
    } else {
      // No parent: this structure is the root for its tenant.
      this.path = `${this._id}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Structures = mongoose.model('Structures', structureSchema);
module.exports = Structures;
