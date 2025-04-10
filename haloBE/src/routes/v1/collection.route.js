const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const collectionValidation = require('../../validations/collection.validation');
const collectionController = require('../../controllers/collection.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Collection management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the collection
 *         name:
 *           type: string
 *           description: The name of the collection
 *         description:
 *           type: string
 *           description: The description of the collection
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the collection
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the collection was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the collection was last updated
 *     CollectionResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Collection'
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
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     description: Create a new collection with the provided data
 *     tags: [Collections]
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
 *                 example: "My Collection"
 *               description:
 *                 type: string
 *                 example: "A collection of items"
 *     responses:
 *       "201":
 *         description: Collection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *   get:
 *     summary: Get all collections
 *     description: Retrieve a list of collections with pagination
 *     tags: [Collections]
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
 *         description: List of collections
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollectionResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

router
  .route('/')
  .post(auth('create:collection'), validate(collectionValidation.createCollection), collectionController.createCollection)
  .get(auth('view:collection'), validate(collectionValidation.queryCollections), collectionController.queryCollections);

/**
 * @swagger
 * /collections/{collectionId}:
 *   get:
 *     summary: Get a collection by ID
 *     description: Retrieve a specific collection by its ID
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
 *     responses:
 *       "200":
 *         description: Collection details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Collection not found
 *   patch:
 *     summary: Update a collection
 *     description: Update a specific collection by its ID
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Collection"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *     responses:
 *       "200":
 *         description: Collection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Collection not found
 *   delete:
 *     summary: Delete a collection
 *     description: Delete a specific collection by its ID
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
 *     responses:
 *       "204":
 *         description: Collection deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Collection not found
 */

router
  .route('/:collectionId')
  .get(auth('view:collection'), validate(collectionValidation.getCollectionById), collectionController.getCollectionById)
  .patch(
    auth('update:collection'),
    validate(collectionValidation.updateCollectionById),
    collectionController.updateCollectionById
  )
  .delete(
    auth('delete:collection'),
    validate(collectionValidation.deleteCollectionById),
    collectionController.deleteCollectionById
  );

module.exports = router;
