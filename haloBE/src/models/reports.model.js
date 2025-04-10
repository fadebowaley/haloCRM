const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');



/****
 *
 *
 * 
 */
const reportSchema = mongoose.Schema(
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

    datapoints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Datapoint',
      },
    ],

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],

    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    output: {
      type: mongoose.Schema.Types.Mixed,
      default: null, // e.g. cached report result
    },

    generatedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ['draft', 'generated', 'archived'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
reportSchema.plugin(toJSON);
reportSchema.plugin(paginate);
reportSchema.plugin(tenantPlugin);

/**
 * Generate a new report
 * @param {Object} data
 * @returns {Promise<Report>}
 */
reportSchema.statics.generate = async function (data) {
  // Simulate generation - could be expanded later
  const report = new this({
    ...data,
    status: 'generated',
    generatedAt: new Date(),
    output: {
      summary: 'This is a placeholder for generated report output.',
      totalRecords: 0,
    },
  });

  await report.save();
  return report;
};

/**
 * Find reports for a tenant and user
 * @param {string} tenantId
 * @param {string} userId
 * @returns {Promise<Report[]>}
 */
reportSchema.statics.findReports = async function (tenantId, userId) {
  return this.find({ tenantId, userId });
};

/**
 * @typedef Report
 */
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
