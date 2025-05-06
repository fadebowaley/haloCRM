const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const structureSchema = mongoose.Schema(
  {
    tenantId: { type: String, index: true },
    name: { type: String, required: true },
    code: { type: String, trim: true, unique: false }, // optional short code
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'administrative',
        'geographical',
        'organizational',
        'functional',
        'project',
        'business-unit',
        'customer',
        'territory',
        'facility',
        'service',
        'warehouse',
        'branch',
        'division',
        'region',
        'department',
        'zone',
        'hub',
        'store',
        'community',
        'headquarters',
        'branch-office',
        'sub-unit',
        'affiliate',
        'outpost',
        'data-center',
        'subdivision',
      ],
      default: 'administrative',
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Structures',
      default: null,
    },
    path: {
      type: String,
      default: '',
    },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Static Methods for CRUD operations
structureSchema.statics = {
  // Create: Add a new structure
  async createStructure(data) {
    try {
      const structure = new this(data);
      return await structure.save();
    } catch (error) {
      throw new Error(`Error creating structure: ${error.message}`);
    }
  },

  // Read: Find structure by ID
  async findStructureById(id) {
    try {
      return await this.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding structure by ID: ${error.message}`);
    }
  },

  // Read: Find structures by filters (supports partial matches)
  async findStructuresByFilter(filter) {
    try {
      return await this.find(filter).exec();
    } catch (error) {
      throw new Error(`Error finding structures by filter: ${error.message}`);
    }
  },

  // Update: Update a structure by ID
  async updateStructure(id, updateData) {
    try {
      const structure = await this.findByIdAndUpdate(id, updateData, { new: true }).exec();
      if (!structure) throw new Error('Structure not found');
      return structure;
    } catch (error) {
      throw new Error(`Error updating structure: ${error.message}`);
    }
  },

  // Delete: Delete a structure by ID
  async deleteStructure(id) {
    try {
      const structure = await this.findByIdAndDelete(id).exec();
      if (!structure) throw new Error('Structure not found');
      return structure;
    } catch (error) {
      throw new Error(`Error deleting structure: ${error.message}`);
    }
  },
};
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
