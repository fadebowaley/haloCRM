const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const dataValidation = require('../../validations/data.validation');
const dataController = require('../../controllers/data.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65f2c6e5d4f5a5b8e4a12345
 *         name:
 *           type: string
 *           example: Sample Data
 *         type:
 *           type: string
 *           example: json
 *         content:
 *           type: object
 *           example: { "key": "value" }
 *         metadata:
 *           type: object
 *           example: { "version": "1.0" }
 *         isPublic:
 *           type: boolean
 *           example: false
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tag1", "tag2"]
 *         createdBy:
 *           type: string
 *           example: 65f2c6e5d4f5a5b8e4a12345
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *     PaginatedData:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Data'
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 5
 *         totalResults:
 *           type: integer
 *           example: 50
 */

// Create a new data entry
router.post('/', auth('manageData'), validate(dataValidation.createData), dataController.createData);

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Create a new data entry
 *     tags: [Data]
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
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sample Data
 *               type:
 *                 type: string
 *                 example: json
 *               content:
 *                 type: object
 *                 example: { "key": "value" }
 *               metadata:
 *                 type: object
 *                 example: { "version": "1.0" }
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tag1", "tag2"]
 *     responses:
 *       "201":
 *         description: Data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "400":
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Get data by ID
router.get('/:dataId', auth('getData'), validate(dataValidation.getData), dataController.getDataById);

/**
 * @swagger
 * /data/{dataId}:
 *   get:
 *     summary: Get data by ID
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     responses:
 *       "200":
 *         description: Data details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Update data by ID
router.patch('/:dataId', auth('manageData'), validate(dataValidation.updateData), dataController.updateDataById);

/**
 * @swagger
 * /data/{dataId}:
 *   patch:
 *     summary: Update data
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Data
 *               type:
 *                 type: string
 *                 example: json
 *               content:
 *                 type: object
 *                 example: { "key": "updated value" }
 *               metadata:
 *                 type: object
 *                 example: { "version": "1.1" }
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tag1", "tag3"]
 *     responses:
 *       "200":
 *         description: Data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "400":
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Delete data by ID
router.delete('/:dataId', auth('manageData'), validate(dataValidation.deleteData), dataController.deleteDataById);

/**
 * @swagger
 * /data/{dataId}:
 *   delete:
 *     summary: Delete data
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     responses:
 *       "204":
 *         description: Data deleted successfully
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Query data with filters and pagination
router.get('/', auth('getData'), validate(dataValidation.listData), dataController.queryData);

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get all data with filters
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type
 *       - in: query
 *         name: isPublic
 *         schema:
 *           type: boolean
 *         description: Filter by public status
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter by tags (comma-separated)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (e.g., createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedData'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Import data
router.post('/import', auth('manageData'), validate(dataValidation.importData), dataController.importData);

/**
 * @swagger
 * /data/import:
 *   post:
 *     summary: Import data
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - format
 *               - data
 *             properties:
 *               format:
 *                 type: string
 *                 enum: [json, csv, xml]
 *                 example: json
 *               data:
 *                 type: string
 *                 example: '[{"name": "Data 1", "type": "json", "content": {"key": "value"}}]'
 *               options:
 *                 type: object
 *                 example: { "skipHeader": true }
 *     responses:
 *       "201":
 *         description: Data imported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data imported successfully
 *                 importedCount:
 *                   type: integer
 *                   example: 1
 *       "400":
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Export data
router.get('/export', auth('getData'), validate(dataValidation.exportData), dataController.exportData);

/**
 * @swagger
 * /data/export:
 *   get:
 *     summary: Export data
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         required: true
 *         schema:
 *           type: string
 *           enum: [json, csv, xml]
 *         description: Export format
 *       - in: query
 *         name: ids
 *         schema:
 *           type: string
 *         description: Comma-separated list of data IDs to export
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string of filter criteria
 *     responses:
 *       "200":
 *         description: Data exported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 format:
 *                   type: string
 *                   example: json
 *                 data:
 *                   type: string
 *                   example: '[{"name": "Data 1", "type": "json", "content": {"key": "value"}}]'
 *       "400":
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Make data public
router.patch('/:dataId/public', auth('manageData'), dataController.makeDataPublic);

/**
 * @swagger
 * /data/{dataId}/public:
 *   patch:
 *     summary: Make data public
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     responses:
 *       "200":
 *         description: Data made public successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Make data private
router.patch('/:dataId/private', auth('manageData'), dataController.makeDataPrivate);

/**
 * @swagger
 * /data/{dataId}/private:
 *   patch:
 *     summary: Make data private
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Data ID
 *     responses:
 *       "200":
 *         description: Data made private successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "401":
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

module.exports = router;
