const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const nodeSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },

    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },

    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Nodes' },
    isMain: { type: Boolean, default: true },
    isOwner: { type: Boolean, default: false },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    dateOfEstablishment: { type: Date },
    deletedAt: { type: Date, default: null },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);



// add plugin that converts mongoose to json
nodeSchema.plugin(toJSON);
nodeSchema.plugin(paginate);
nodeSchema.plugin(tenantPlugin);

/**
 * @typedef Node
 */


// Pre-save hook to enforce parent-child relationship
nodeSchema.pre('save', async function (next) {
  // If level is greater than 0, a parent is required
  if (this.level > 0) {
    if (!this.parent) {
      return next(new Error(`A parent node (level ${this.level - 1}) is required for a node at level ${this.level}.`));
    }
    try {
      const parentNode = await this.constructor.findById(this.parent);
      if (!parentNode) {
        return next(new Error('Parent church does not exist.'));
      }
      if (parentNode.level !== this.level - 1) {
        return next(new Error(`The parent church must be at level ${this.level - 1}, but the provided parent is at level ${parentNode.level}.`));
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});
const Nodes = mongoose.model('Nodes', nodeSchema);
module.exports = Nodes;
