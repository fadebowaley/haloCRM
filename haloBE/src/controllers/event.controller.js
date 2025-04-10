const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

// Create a new event
const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

// Bulk import events
const bulkImportEvents = catchAsync(async (req, res) => {
  const events = await eventService.bulkImportEvents(req.body.eventsArray);
  res.status(httpStatus.CREATED).json({
    message: `${events.length} events successfully created.`,
    data: events,
  });
});

// Query events with filters and pagination
const queryEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'programId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.queryEvents(filter, options);
  res.send(result);
});

// Get event by ID
const getEventById = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.send(event);
});

// Get events by program ID
const getEventsByProgram = catchAsync(async (req, res) => {
  const events = await eventService.getEventsByProgram(req.params.programId);
  if (!events || events.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No events found for this program');
  }
  res.send(events);
});

// Update event by ID
const updateEventById = catchAsync(async (req, res) => {
  const updatedEvent = await eventService.updateEventById(req.params.eventId, req.body);
  res.send(updatedEvent);
});

// Delete event by ID
const deleteEventById = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all events
const deleteAllEvents = catchAsync(async (req, res) => {
  const result = await eventService.deleteAllEvents();
  res.status(httpStatus.OK).json({
    message: result.message,
    deletedCount: result.deletedCount,
  });
});

// Get events by date range
const getEventsByDateRange = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const events = await eventService.getEventsByDateRange(startDate, endDate);
  res.send(events);
});

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
