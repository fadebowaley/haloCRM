const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const levelSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    rank: { type: Number, required: true },
    isSpecial: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
levelSchema.plugin(toJSON);
levelSchema.plugin(paginate);
levelSchema.plugin(tenantPlugin);

/**
 * @typedef NodeLevel
 */

levelSchema.index({ rank: 1 }, { unique: true, partialFilterExpression: { isSpecial: { $ne: true } } });

/**
 * Static method to create a new level
 * @param {Object} levelBody
 * @returns {Promise<NodeLevel>}
 */

levelSchema.statics.createLevel = async function (levelBody) {
  if (!levelBody.isSpecial) {
    const existingMain = await this.findOne({ rank: levelBody.rank, isSpecial: false });
    if (existingMain) {
      throw new Error('A main level with this rank already exists. Only special levels can share the same rank.');
    }
  } else {
    const mainExists = await this.findOne({ rank: levelBody.rank, isSpecial: false });
    if (!mainExists) {
      throw new Error('A special level can only be created if a main level with this rank exists.');
    }
  }
  const level = await this.create(levelBody);
  return level;
};

levelSchema.statics.getLevelsByHierarchy = async function (tenantId, hierarchy) {
  return this.find({ tenantId, rank: hierarchy });
};

// Add this static method (optional)
levelSchema.statics.getOrderedLevels = async function () {
  return this.find().sort({ rank: 1 });
};


const Level = mongoose.model('Level', levelSchema);
module.exports = Level;
