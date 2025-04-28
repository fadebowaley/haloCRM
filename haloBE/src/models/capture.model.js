const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');


/****
 *✅ Features Recap:
Stores data in flexible Mixed format.
Linked to: Datapoint, DatapointConfig, userId, node, tenantId.
Static Methods:
createCapture(body)
getCapturesByDatapoint(datapointId, filter)
Extras: source, status, capturedAt timestamps
 *
 *
 *
 */
const captureSchema = mongoose.Schema(
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

    datapoint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Datapoint',
      required: true,
    },

    datapointConfig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DatapointConfig',
    },

    node: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    capturedAt: {
      type: Date,
      default: Date.now,
    },

    source: {
      type: String,
      enum: ['web', 'mobile', 'api', 'sync'],
      default: 'web',
    },
    deletedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['active', 'archived', 'pending'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
captureSchema.plugin(toJSON);
captureSchema.plugin(paginate);
captureSchema.plugin(tenantPlugin);

/**
 * Create a new capture entry
 * @param {Object} body - The captured data object
 * @returns {Promise<Capture>}
 */
captureSchema.statics.createCapture = async function (body) {
  const capture = new this(body);
  await capture.save();
  return capture;
};

/**
 * Get captures by Datapoint with filters
 * @param {ObjectId} datapointId
 * @param {Object} filter
 * @returns {Promise<Array>}
 */
captureSchema.statics.getCapturesByDatapoint = async function (datapointId, filter = {}) {
  return this.find({ datapoint: datapointId, ...filter });
};

/**
 * @typedef Capture
 */
const Capture = mongoose.model('Capture', captureSchema);
module.exports = Capture;
