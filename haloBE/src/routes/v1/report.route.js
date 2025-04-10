const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reportValidation = require('../../validations/report.validation');
const reportController = require('../../controllers/report.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Report management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the report
 *         name:
 *           type: string
 *           description: The name of the report
 *         type:
 *           type: string
 *           description: The type of the report
 *         description:
 *           type: string
 *           description: The description of the report
 *         data:
 *           type: object
 *           description: The report data
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the report
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the report was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the report was last updated
 *     ReportResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Report'
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
 *           description: Number of reports imported
 *         failedCount:
 *           type: integer
 *           description: Number of reports that failed to import
 */

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Create a new report
 *     description: Create a new report with the provided data
 *     tags: [Reports]
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
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monthly Sales Report"
 *               type:
 *                 type: string
 *                 example: "sales"
 *               description:
 *                 type: string
 *                 example: "Report for monthly sales performance"
 *               data:
 *                 type: object
 *                 example: { "sales": 1000, "revenue": 50000 }
 *     responses:
 *       "201":
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *   get:
 *     summary: Get all reports
 *     description: Retrieve a list of reports with pagination
 *     tags: [Reports]
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
 *         description: List of reports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportResponse'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for creating a new report
router
  .route('/')
  .post(auth('create:report'), validate(reportValidation.createReport), reportController.createReport)
  .get(auth('view:report'), validate(reportValidation.queryReports), reportController.queryReports);

/**
 * @swagger
 * /reports/bulk-import:
 *   post:
 *     summary: Bulk import reports
 *     description: Import multiple reports at once
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reports
 *             properties:
 *               reports:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - type
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Report 1"
 *                     type:
 *                       type: string
 *                       example: "type1"
 *                     description:
 *                       type: string
 *                       example: "Description 1"
 *                     data:
 *                       type: object
 *                       example: { "key": "value" }
 *     responses:
 *       "201":
 *         description: Reports imported successfully
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

// Route for bulk importing reports
router
  .route('/bulk-import')
  .post(auth('create:report'), validate(reportValidation.bulkImportReports), reportController.bulkImportReports);

/**
 * @swagger
 * /reports/{reportId}:
 *   get:
 *     summary: Get a report by ID
 *     description: Retrieve a specific report by its ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     responses:
 *       "200":
 *         description: Report details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Report not found
 *   patch:
 *     summary: Update a report
 *     description: Update a specific report by its ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Report Name"
 *               type:
 *                 type: string
 *                 example: "updated_type"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               data:
 *                 type: object
 *                 example: { "updated": "data" }
 *     responses:
 *       "200":
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Report not found
 *   delete:
 *     summary: Delete a report
 *     description: Delete a specific report by its ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *     responses:
 *       "204":
 *         description: Report deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 *       "404":
 *         description: Report not found
 */

// Route for fetching a report by ID
router
  .route('/:reportId')
  .get(auth('view:report'), validate(reportValidation.getReport), reportController.getReport)
  .patch(auth('update:report'), validate(reportValidation.updateReport), reportController.updateReport)
  .delete(auth('delete:report'), validate(reportValidation.deleteReport), reportController.deleteReport);

/**
 * @swagger
 * /reports/delete-all:
 *   delete:
 *     summary: Delete all reports
 *     description: Delete all reports from the system
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: All reports deleted successfully
 *       "401":
 *         description: Not authenticated
 *       "403":
 *         description: Not authorized
 */

// Route for deleting all reports
router
  .route('/delete-all')
  .delete(auth('delete:report'), validate(reportValidation.deleteAllReports), reportController.deleteAllReports);

module.exports = router;
