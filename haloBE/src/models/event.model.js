const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');



/****
 *✅ Key Features:
Linked to Program, Collection, Datapoint
Supports reminders, SMS/Email notifications
Static methods:
createEvent()
getUpcomingEvents()
 *
 *
 */
const eventSchema = mongoose.Schema(
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

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
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

    reminders: {
      type: [String], // e.g., ['1 hour before', '1 day before']
      default: [],
    },

    notifyBySMS: {
      type: Boolean,
      default: false,
    },

    notifyByEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);
eventSchema.plugin(tenantPlugin);

/**
 * Create a new event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
eventSchema.statics.createEvent = async function (eventBody) {
  const event = new this(eventBody);
  await event.save();
  return event;
};

/**
 * Find all upcoming events by tenant
 * @param {string} tenantId
 * @returns {Promise<Event[]>}
 */
eventSchema.statics.getUpcomingEvents = async function (tenantId) {
  return this.find({
    tenantId,
    startDate: { $gte: new Date() },
  }).sort({ startDate: 1 });
};

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
