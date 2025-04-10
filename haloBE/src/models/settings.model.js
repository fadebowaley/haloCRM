const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');


/****
 *References: Node, Datapoint, Report.
Contains a key and config to support any kind of setting (feature toggles, thresholds, visibility, etc.).
Static methods:
upsertSetting(data) → create or update setting.
getSetting(tenantId, node, key) → retrieve a setting for runtime use.
 */

const settingsSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },

    node: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
    },

    datapoint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Datapoint',
    },

    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
    },

    key: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    config: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
settingsSchema.plugin(toJSON);
settingsSchema.plugin(paginate);
settingsSchema.plugin(tenantPlugin);

/**
 * Upsert a setting by key, node, and tenant
 * @param {Object} data
 * @returns {Promise<Setting>}
 */
settingsSchema.statics.upsertSetting = async function (data) {
  const { tenantId, node, key } = data;

  const existing = await this.findOne({ tenantId, node, key });

  if (existing) {
    Object.assign(existing, data);
    await existing.save();
    return existing;
  }

  const setting = new this(data);
  await setting.save();
  return setting;
};

/**
 * Get setting by key and node
 * @param {string} tenantId
 * @param {ObjectId} node
 * @param {string} key
 * @returns {Promise<Setting|null>}
 */
settingsSchema.statics.getSetting = async function (tenantId, node, key) {
  return this.findOne({ tenantId, node, key });
};

/**
 * @typedef Setting
 */
const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;
