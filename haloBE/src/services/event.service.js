const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

/**
 * Bulk import events
 * @param {Array} eventArray
 * @returns {Promise<Array<Event>>}
 */
const bulkImportEvents = async (eventArray) => {
  return Event.insertMany(eventArray);
};

/**
 * Query for events
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryEvents = async (filter, options) => {
  const events = await Event.paginate(filter, options);
  return events;
};

/**
 * Get event by ID
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * Get events by program ID
 * @param {ObjectId} programId
 * @returns {Promise<Array<Event>>}
 */
const getEventsByProgram = async (programId) => {
  return Event.find({ program: programId });
};

/**
 * Update event by ID
 * @param {ObjectId} eventId
 * @param {Object} updateBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

/**
 * Delete event by ID
 * @param {ObjectId} eventId
 * @returns {Promise<Event>}
 */
const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.remove();
  return event;
};

/**
 * Delete all events
 * @returns {Promise<{ deletedCount: number }>}
 */
const deleteAllEvents = async () => {
  return Event.deleteMany({});
};

/**
 * Get events by date range
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<Array<Event>>}
 */
const getEventsByDateRange = async (startDate, endDate) => {
  return Event.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
  });
};

module.exports = {
  createEvent,
  bulkImportEvents,
  queryEvents,
  getEventById,
  getEventsByProgram,
  updateEventById,
  deleteEventById,
  deleteAllEvents,
  getEventsByDateRange,
};
