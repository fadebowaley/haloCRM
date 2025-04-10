const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventConfigValidation = require('../../validations/eventConfig.validation');
const eventConfigController = require('../../controllers/eventConfig.controller');

const router = express.Router();

// Route for creating a new event configuration
router
  .route('/')
  .post(
    auth('create:eventConfig'),
    validate(eventConfigValidation.createEventConfig),
    eventConfigController.createEventConfig
  )
  .get(auth('view:eventConfig'), validate(eventConfigValidation.queryEventConfigs), eventConfigController.queryEventConfigs);

// Routes for fetching, updating, and deleting an event config by ID
router
  .route('/:eventConfigId')
  .get(
    auth('view:eventConfig'),
    validate(eventConfigValidation.getEventConfigById),
    eventConfigController.getEventConfigById
  )
  .patch(
    auth('update:eventConfig'),
    validate(eventConfigValidation.updateEventConfigById),
    eventConfigController.updateEventConfigById
  )
  .delete(
    auth('delete:eventConfig'),
    validate(eventConfigValidation.deleteEventConfigById),
    eventConfigController.deleteEventConfigById
  );

// Route for deleting all event configurations for a tenant
router
  .route('/deleteAll')
  .delete(
    auth('delete:eventConfig'),
    validate(eventConfigValidation.deleteAllConfigs),
    eventConfigController.deleteAllConfigs
  );

// Route for getting event configuration by event ID
router
  .route('/event/:eventId')
  .get(auth('view:eventConfig'), validate(eventConfigValidation.getConfigByEvent), eventConfigController.getConfigByEvent);

module.exports = router;
