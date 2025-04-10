const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const statementValidation = require('../../validations/statement.validation');
const statementController = require('../../controllers/statement.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Statements
 *   description: Statement management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Statement:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the statement
 *         amount:
 *           type: number
 *           description: The amount of the statement
 *         description:
 *           type: string
 *           description: The description of the statement
 *         nodeId:
 *           type: string
 *           description: The ID of the associated node
 *         collectionId:
 *           type: string
 *           description: The ID of the associated collection
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the statement
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the statement was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the statement was last updated
 *     StatementResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Statement'
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
 *     TotalPaymentsResponse:
 *       type: object
 *       properties:
 *         totalAmount:
 *           type: number
 *           description: Total amount of payments
 *         count:
 *           type: integer
 *           description: Number of payments
 */

/**
 * @swagger
 * /statements:
 *   post:
 *     summary: Create a new statement
 *     description: Create a new statement with the provided data
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000.50
 *               description:
 *                 type: string
 *                 example: "Payment for services"
 *               nodeId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               collectionId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *     responses:
 *       "201":
 *         description: Statement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statement'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *   get:
 *     summary: Get all statements
 *     description: Retrieve a list of statements with pagination
 *     tags: [Statements]
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
 *         description: Sort field (e.g., amount:desc)
 *     responses:
 *       "200":
 *         description: List of statements
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatementResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for creating a new statement
router
  .route('/')
  .post(auth('create:statement'), validate(statementValidation.createStatement), statementController.createStatement)
  .get(auth('view:statement'), validate(statementValidation.getStatements), statementController.getStatements);

/**
 * @swagger
 * /statements/{statementId}:
 *   get:
 *     summary: Get a statement by ID
 *     description: Retrieve a specific statement by its ID
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement ID
 *     responses:
 *       "200":
 *         description: Statement details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statement'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Statement not found
 *   patch:
 *     summary: Update a statement
 *     description: Update a specific statement by its ID
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1500.75
 *               description:
 *                 type: string
 *                 example: "Updated payment description"
 *     responses:
 *       "200":
 *         description: Statement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statement'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Statement not found
 *   delete:
 *     summary: Delete a statement
 *     description: Delete a specific statement by its ID
 *     tags: [Statements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Statement ID
 *     responses:
 *       "204":
 *         description: Statement deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Statement not found
 */

// Route for fetching a single statement by ID
router
  .route('/:statementId')
  .get(auth('view:statement'), validate(statementValidation.getStatement), statementController.getStatement)
  .patch(auth('update:statement'), validate(statementValidation.updateStatement), statementController.updateStatement)
  .delete(auth('delete:statement'), validate(statementValidation.deleteStatement), statementController.deleteStatement);

/**
 * @swagger
 * /statements/total-payments/node/{nodeId}:
 *   get:
 *     summary: Get total payments for a node
 *     description: Retrieve the total amount of payments for a specific node
 *     tags: [Statements]
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
 *       "200":
 *         description: Total payments for the node
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TotalPaymentsResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Node not found
 */

// Route for fetching total payments for a node
router
  .route('/total-payments/node/:nodeId')
  .get(
    auth('view:statement'),
    validate(statementValidation.getTotalPaymentsForNode),
    statementController.getTotalPaymentsForNode
  );

/**
 * @swagger
 * /statements/total-payments/collection/{collectionId}:
 *   get:
 *     summary: Get total payments for a collection
 *     description: Retrieve the total amount of payments for a specific collection
 *     tags: [Statements]
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
 *         description: Total payments for the collection
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TotalPaymentsResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Collection not found
 */

// Route for fetching total payments for a collection
router
  .route('/total-payments/collection/:collectionId')
  .get(
    auth('view:statement'),
    validate(statementValidation.getTotalPaymentsForCollection),
    statementController.getTotalPaymentsForCollection
  );

module.exports = router;
