const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');


/****
 *✅ Highlights:
References: Collection, Datapoint, Event
Supports recurrence setup
Static methods:
createProgram for creation
getActivePrograms to fetch all active ones
 *
 */
const programSchema = mongoose.Schema(
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

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'custom'],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    daysOfWeek: {
      type: [String], // E.g. ['Monday', 'Wednesday']
      default: [],
    },

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],

    datapoints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Datapoint',
      },
    ],

    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],

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
programSchema.plugin(toJSON);
programSchema.plugin(paginate);
programSchema.plugin(tenantPlugin);

/**
 * Create a new Program
 * @param {Object} body
 * @returns {Promise<Program>}
 */
programSchema.statics.createProgram = async function (body) {
  const program = new this(body);
  await program.save();
  return program;
};

/**
 * Retrieve all active programs for a tenant
 * @param {string} tenantId
 * @returns {Promise<Program[]>}
 */
programSchema.statics.getActivePrograms = async function (tenantId) {
  return this.find({ tenantId, isActive: true });
};

/**
 * @typedef Program
 */
const Program = mongoose.model('Program', programSchema);

module.exports = Program;
