const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const programValidation = require('../../validations/program.validation');
const programController = require('../../controllers/program.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Program management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Program:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the program
 *         name:
 *           type: string
 *           description: The name of the program
 *         description:
 *           type: string
 *           description: The description of the program
 *         status:
 *           type: string
 *           enum: [active, inactive, completed]
 *           description: The status of the program
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the program
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the program
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the program
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the program was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the program was last updated
 *     ProgramResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Program'
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
 *     BulkImportResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         importedCount:
 *           type: integer
 *           description: Number of programs imported
 *         failedCount:
 *           type: integer
 *           description: Number of programs that failed to import
 */

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new program
 *     description: Create a new program with the provided data
 *     tags: [Programs]
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
 *                 example: "Summer Training Program"
 *               description:
 *                 type: string
 *                 example: "A comprehensive training program for summer"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, completed]
 *                 example: "active"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59Z"
 *     responses:
 *       "201":
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *   get:
 *     summary: Get all programs
 *     description: Retrieve a list of programs with pagination
 *     tags: [Programs]
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
 *         description: List of programs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgramResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for creating a new program
router
  .route('/')
  .post(auth('create:program'), validate(programValidation.createProgram), programController.createProgram)
  .get(auth('view:program'), validate(programValidation.queryPrograms), programController.queryPrograms);

/**
 * @swagger
 * /programs/bulk-import:
 *   post:
 *     summary: Bulk import programs
 *     description: Import multiple programs at once
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - programs
 *             properties:
 *               programs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Program 1"
 *                     description:
 *                       type: string
 *                       example: "Description 1"
 *                     status:
 *                       type: string
 *                       enum: [active, inactive, completed]
 *                       example: "active"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-01T00:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-31T23:59:59Z"
 *     responses:
 *       "201":
 *         description: Programs imported successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BulkImportResponse'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for bulk importing programs
router
  .route('/bulk-import')
  .post(auth('create:program'), validate(programValidation.bulkImportPrograms), programController.bulkImportPrograms);

/**
 * @swagger
 * /programs/{programId}:
 *   get:
 *     summary: Get a program by ID
 *     description: Retrieve a specific program by its ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     responses:
 *       "200":
 *         description: Program details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Program not found
 *   patch:
 *     summary: Update a program
 *     description: Update a specific program by its ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Program Name"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, completed]
 *                 example: "completed"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59Z"
 *     responses:
 *       "200":
 *         description: Program updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Program not found
 *   delete:
 *     summary: Delete a program
 *     description: Delete a specific program by its ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     responses:
 *       "204":
 *         description: Program deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Program not found
 */

// Route for fetching a program by ID
router
  .route('/:programId')
  .get(auth('view:program'), validate(programValidation.getProgram), programController.getProgram)
  .patch(auth('update:program'), validate(programValidation.updateProgram), programController.updateProgram)
  .delete(auth('delete:program'), validate(programValidation.deleteProgram), programController.deleteProgram);

/**
 * @swagger
 * /programs/delete-all:
 *   delete:
 *     summary: Delete all programs
 *     description: Delete all programs from the system
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: All programs deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for deleting all programs
router
  .route('/delete-all')
  .delete(auth('delete:program'), validate(programValidation.deleteAllPrograms), programController.deleteAllPrograms);

/**
 * @swagger
 * /programs/{programId}/assign:
 *   patch:
 *     summary: Assign a user to a program
 *     description: Assign a user to a specific program
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to assign
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       "200":
 *         description: User assigned to program successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Program or user not found
 */

// Route for assigning a user to a program
router
  .route('/:programId/assign')
  .patch(auth('update:program'), validate(programValidation.assignToProgram), programController.assignToProgram);

module.exports = router;
