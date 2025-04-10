const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permissionValidation = require('../../validations/permission.validation');
const permissionController = require('../../controllers/permission.controller');

const router = express.Router();

// Route for creating and querying permissions
router
  .route('/')
  .post(auth('create:permissions'), validate(permissionValidation.createPermission), permissionController.createPermission)
  .get(auth('view:permissions'), validate(permissionValidation.queryPermissions), permissionController.getPermissions);

// Route for querying, updating, or deleting a specific permission by name
router
  .route('/:permissionName')
  .get(auth('view:permissions'), validate(permissionValidation.getPermission), permissionController.getPermission)
  .patch(auth('update:permissions'), validate(permissionValidation.updatePermission), permissionController.updatePermission)
  .delete(
    auth('delete:permissions'),
    validate(permissionValidation.deletePermission),
    permissionController.deletePermission
  );


  // router.route('/').delete(auth('delete:roles'), permissionController.deleteAllRoles);

// Route for bulk creation of permissions
router
  .route('/bulk')
  .post(
    auth('create:permissions'),
    validate(permissionValidation.bulkCreatePermissions),
    permissionController.bulkCreatePermissions
  );




module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management and retrieval
 */

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a permission
 *     description: Only admins can create permissions.
 *     tags: [Permissions]
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
 *               - resource
 *               - action
 *             properties:
 *               name:
 *                 type: string
 *               resource:
 *                 type: string
 *               action:
 *                 type: string
 *             example:
 *               name: read_articles
 *               resource: articles
 *               action: read
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all permissions
 *     description: Only admins can retrieve all permissions.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Permission name
 *       - in: query
 *         name: resource
 *         schema:
 *           type: string
 *         description: Resource type
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Action type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of permissions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
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
 *                     $ref: '#/components/schemas/Permission'
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
 * /permissions/{permissionName}:
 *   get:
 *     summary: Get a permission by name
 *     description: Only admins can retrieve permissions by name.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a permission by name
 *     description: Only admins can update permissions.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               resource:
 *                 type: string
 *               action:
 *                 type: string
 *             example:
 *               name: update_articles
 *               resource: articles
 *               action: update
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
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
 *     summary: Delete a permission by name
 *     description: Only admins can delete permissions.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission name
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
