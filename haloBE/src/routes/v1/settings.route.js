const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const settingsValidation = require('../../validations/settings.validation');
const settingsController = require('../../controllers/settings.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Settings management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Setting:
 *       type: object
 *       required:
 *         - name
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the setting
 *         name:
 *           type: string
 *           description: The name of the setting
 *         value:
 *           type: string
 *           description: The value of the setting
 *         nodeId:
 *           type: string
 *           description: The ID of the associated node
 *         datapoints:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of datapoint IDs
 *         reports:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of report IDs
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the setting
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the setting was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the setting was last updated
 *     SettingResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Setting'
 *         page:
 *           type: integer
 *           description: Current page number
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *         totalResults:
 *           type: integer
 *           description: Total number of results
 */

/**
 * @swagger
 * /settings:
 *   post:
 *     summary: Create a new setting
 *     description: Create a new setting with the provided data
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *                 example: "email_notifications"
 *               value:
 *                 type: string
 *                 example: "enabled"
 *               nodeId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       "201":
 *         description: Setting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setting'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *   get:
 *     summary: Get all settings
 *     description: Retrieve a list of settings with pagination
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (e.g., name:asc)
 *     responses:
 *       "200":
 *         description: List of settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SettingResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for creating a new setting
router
  .route('/')
  .post(auth('create:setting'), validate(settingsValidation.createSetting), settingsController.createSetting)
  .get(auth('view:setting'), validate(settingsValidation.getSettings), settingsController.getSettings);

/**
 * @swagger
 * /settings/{settingId}:
 *   get:
 *     summary: Get a setting by ID
 *     description: Retrieve a specific setting by its ID
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Setting ID
 *     responses:
 *       "200":
 *         description: Setting details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setting'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Setting not found
 *   patch:
 *     summary: Update a setting
 *     description: Update a specific setting by its ID
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Setting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "updated_setting_name"
 *               value:
 *                 type: string
 *                 example: "disabled"
 *     responses:
 *       "200":
 *         description: Setting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setting'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Setting not found
 *   delete:
 *     summary: Delete a setting
 *     description: Delete a specific setting by its ID
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Setting ID
 *     responses:
 *       "204":
 *         description: Setting deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Setting not found
 */

// Route for fetching a single setting by ID
router
  .route('/:settingId')
  .get(auth('view:setting'), validate(settingsValidation.getSetting), settingsController.getSetting)
  .patch(auth('update:setting'), validate(settingsValidation.updateSetting), settingsController.updateSetting)
  .delete(auth('delete:setting'), validate(settingsValidation.deleteSetting), settingsController.deleteSetting);

/**
 * @swagger
 * /settings/node/{nodeId}:
 *   delete:
 *     summary: Delete all settings for a node
 *     description: Delete all settings associated with a specific node
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nodeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Node ID
 *     responses:
 *       "204":
 *         description: All settings for the node deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Node not found
 */

// Route for deleting all settings for a specific node
router
  .route('/node/:nodeId')
  .delete(
    auth('delete:setting'),
    validate(settingsValidation.deleteAllSettingsForNode),
    settingsController.deleteAllSettingsForNode
  );

/**
 * @swagger
 * /settings/assign:
 *   post:
 *     summary: Assign datapoints and reports to a setting
 *     description: Assign datapoints and reports to a specific setting
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - settingId
 *             properties:
 *               settingId:
 *                 type: string
 *                 description: The ID of the setting
 *                 example: "507f1f77bcf86cd799439011"
 *               datapoints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of datapoint IDs to assign
 *                 example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *               reports:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of report IDs to assign
 *                 example: ["507f1f77bcf86cd799439014", "507f1f77bcf86cd799439015"]
 *     responses:
 *       "200":
 *         description: Datapoints and reports assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setting'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Setting not found
 */

// Route for assigning datapoints and reports to a setting
router
  .route('/assign')
  .post(
    auth('assign:setting'),
    validate(settingsValidation.assignDatapointsAndReports),
    settingsController.assignDatapointsAndReports
  );

module.exports = router;
