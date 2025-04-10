const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');


/***
 *  Key Features:
Attached to an Event
Handles:
Custom notifications
Recurrence overrides
Linked automation
Static methods:
upsertConfig()
getByEvent()
 */
const eventConfigSchema = mongoose.Schema(
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

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      unique: true, // One config per event
    },

    notificationConfig: {
      sms: {
        enabled: { type: Boolean, default: false },
        timeBefore: { type: Number }, // in minutes
      },
      email: {
        enabled: { type: Boolean, default: false },
        timeBefore: { type: Number }, // in minutes
      },
    },

    recurrenceOverride: {
      frequency: {
        type: String,
        enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
        default: 'none',
      },
      interval: {
        type: Number,
        default: 1,
      },
      endAfterOccurrences: {
        type: Number,
      },
    },

    autoComplete: {
      enabled: { type: Boolean, default: false },
      afterMinutes: { type: Number }, // Time to auto-complete after start
    },

    linkedActions: {
      type: [String], // e.g., ['sendReport', 'notifyAdmin']
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
eventConfigSchema.plugin(toJSON);
eventConfigSchema.plugin(paginate);
eventConfigSchema.plugin(tenantPlugin);

/**
 * Create or update configuration for an event
 * @param {Object} configBody
 * @returns {Promise<EventConfig>}
 */
eventConfigSchema.statics.upsertConfig = async function (configBody) {
  const existing = await this.findOne({ event: configBody.event });
  if (existing) {
    Object.assign(existing, configBody);
    return await existing.save();
  }

  const config = new this(configBody);
  await config.save();
  return config;
};

/**
 * Get config by event ID
 * @param {string} eventId
 * @returns {Promise<EventConfig>}
 */
eventConfigSchema.statics.getByEvent = async function (eventId) {
  return this.findOne({ event: eventId });
};

/**
 * @typedef EventConfig
 */
const EventConfig = mongoose.model('EventConfig', eventConfigSchema);

module.exports = EventConfig;
