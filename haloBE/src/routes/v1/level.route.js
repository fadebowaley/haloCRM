const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const levelValidation = require('../../validations/level.validation');
const levelController = require('../../controllers/level.controller');

const router = express.Router();

// Route for creating a new level
router
  .route('/')
  .post(auth('create:level'), validate(levelValidation.createLevel), levelController.createLevel)
  .get(auth('view:level'), validate(levelValidation.queryLevels), levelController.queryLevels);

// Route for fetching, updating, and deleting a level by ID
router
  .route('/:levelId')
  .get(auth('view:level'), validate(levelValidation.getLevelById), levelController.getLevelById)
  .patch(auth('update:level'), validate(levelValidation.updateLevelById), levelController.updateLevelById)
  .delete(auth('delete:level'), validate(levelValidation.deleteLevelById), levelController.deleteLevelById);

// Route for fetching levels by hierarchy
router
  .route('/hierarchy')
  .get(auth('view:level'), validate(levelValidation.getLevelsByHierarchy), levelController.getLevelsByHierarchy);

// Route for fetching parent and child levels
router
  .route('/:levelId/parent')
  .get(auth('view:level'), validate(levelValidation.getParentLevel), levelController.getParentLevel);

router
  .route('/:levelId/children')
  .get(auth('view:level'), validate(levelValidation.getChildLevels), levelController.getChildLevels);

// Routes for activating and deactivating levels
router
  .route('/:levelId/activate')
  .patch(auth('update:level'), validate(levelValidation.activateLevel), levelController.activateLevel);

router
  .route('/:levelId/deactivate')
  .patch(auth('update:level'), validate(levelValidation.deactivateLevel), levelController.deactivateLevel);

// Route for moving a level to a parent level
router
  .route('/:levelId/move')
  .patch(auth('update:level'), validate(levelValidation.moveLevelToParent), levelController.moveLevelToParent);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Level management and retrieval
 */

/**
 * @swagger
 * /levels:
 *   post:
 *     summary: Create a level
 *     description: Only admins can create levels.
 *     tags: [Levels]
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
 *               name: MyLevel
 *               description: This is a sample level
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Level'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all levels
 *     description: Only admins can retrieve all levels.
 *     tags: [Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Level name
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
 *         description: Maximum number of levels
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
 *                     $ref: '#/components/schemas/Level'
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
 * /levels/{id}:
 *   get:
 *     summary: Get a level
 *     description: Logged in users can fetch only their own level information. Only admins can fetch other levels.
 *     tags: [Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Level'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a level
 *     description: Logged in users can only update their own level information. Only admins can update other levels.
 *     tags: [Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level id
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
 *               name: MyLevel
 *               description: This is a sample level
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Level'
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
 *     summary: Delete a level
 *     description: Logged in users can delete only their own levels. Only admins can delete other levels.
 *     tags: [Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Level id
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
// TODO: Update other files to reflect changes for level.route
