const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const appValidation = require('../../validations/app.validation');
const appController = require('../../controllers/app.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('create:apps'), validate(appValidation.createApp), appController.createApp)
  .get(auth('view:apps'), validate(appValidation.queryApps), appController.queryApps);

router.route('/bulk-create').post(auth('create:apps'), validate(appValidation.bulkCreateApps), appController.bulkCreateApps);

router
  .route('/:appId')
  .get(auth('view:apps'), validate(appValidation.getAppById), appController.getAppById)
  .patch(auth('update:apps'), validate(appValidation.updateApp), appController.updateAppById)
  .delete(auth('delete:apps'), validate(appValidation.deleteApp), appController.deleteAppById);

router.route('/assign/:appId').patch(auth('update:apps'), validate(appValidation.assignApp), appController.assignApp);

router
  .route('/tenant-or-user/:tenantId/:userId')
  .get(auth('view:apps'), validate(appValidation.getAppsForTenantOrUser), appController.getAppsForTenantOrUser);

router
  .route('/toggle-status/:appId')
  .patch(auth('update:apps'), validate(appValidation.toggleAppStatus), appController.toggleAppStatus);

router
  .route('/tenant/:tenantId')
  .delete(auth('delete:apps'), validate(appValidation.deleteAppsByTenant), appController.deleteAppsByTenant);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: App management and retrieval
 */

/**
 * @swagger
 * /apps:
 *   post:
 *     summary: Create an app
 *     description: Only admins can create apps.
 *     tags: [Apps]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: MyApp
 *               description: This is a sample app
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/App'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all apps
 *     description: Only admins can retrieve all apps.
 *     tags: [Apps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: App name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of apps
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/App'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /apps/{id}:
 *   get:
 *     summary: Get an app
 *     description: Logged in users can fetch only their own app information. Only admins can fetch other apps.
 *     tags: [Apps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: App id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/App'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an app
 *     description: Logged in users can only update their own app information. Only admins can update other apps.
 *     tags: [Apps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: App id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: MyApp
 *               description: This is a sample app
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/App'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an app
 *     description: Logged in users can delete only their own apps. Only admins can delete other apps.
 *     tags: [Apps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: App id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
// TODO: Update other files to reflect changes for app.route
