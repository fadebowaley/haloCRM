// Import required dependencies
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

// Create Express router instance
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Role management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the role
 *         name:
 *           type: string
 *           description: The name of the role
 *         description:
 *           type: string
 *           description: Description of the role
 *         isActive:
 *           type: boolean
 *           description: Whether the role is active
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of permission IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 5f8d04b3ab35de3d342acd4a
 *         name: admin
 *         description: Administrator role with full access
 *         isActive: true
 *         permissions: ["5f8d04b3ab35de3d342acd4b", "5f8d04b3ab35de3d342acd4c"]
 *         createdAt: 2020-10-20T07:06:43.000Z
 *         updatedAt: 2020-10-20T07:06:43.000Z
 *     CreateRole:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           pattern: ^[a-zA-Z0-9_ ]+$
 *           description: Role name
 *         description:
 *           type: string
 *           maxLength: 200
 *           description: Role description
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of permission IDs
 *       example:
 *         name: editor
 *         description: Content editor role
 *         permissions: ["5f8d04b3ab35de3d342acd4b"]
 *     UpdateRole:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           pattern: ^[a-zA-Z0-9_ ]+$
 *           description: Role name
 *         description:
 *           type: string
 *           maxLength: 200
 *           description: Role description
 *         isActive:
 *           type: boolean
 *           description: Whether the role is active
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of permission IDs
 *       example:
 *         name: updated-editor
 *         description: Updated content editor role
 *         isActive: false
 *     AssignPermissions:
 *       type: object
 *       required:
 *         - permissions
 *       properties:
 *         permissions:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: string
 *           description: Array of permission IDs to assign
 *       example:
 *         permissions: ["5f8d04b3ab35de3d342acd4b", "5f8d04b3ab35de3d342acd4c"]
 *     BulkCreateRoles:
 *       type: object
 *       required:
 *         - rolesArray
 *       properties:
 *         rolesArray:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 pattern: ^[a-zA-Z0-9_ ]+$
 *                 description: Role name
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 description: Role description
 *           description: Array of roles to create
 *       example:
 *         rolesArray:
 *           - name: moderator
 *             description: Content moderator role
 *           - name: viewer
 *             description: Read-only access role
 */

/**
 * @swagger
 * /roles/templates:
 *   get:
 *     summary: Get role templates
 *     description: Retrieve a list of available role templates
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */
router.get('/templates', roleController.getRoleTemplates);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: Only admins can create new roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all roles
 *     description: Only admins can retrieve all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Role name
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Role active status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the format field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of roles
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete all roles
 *     description: Only admins can delete all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
  .route('/')
  .post(auth('create:roles'), validate(roleValidation.createRole), roleController.createRole)
  .get(auth('view:roles'), roleController.getRoles)
  .delete(auth('delete:roles'), roleController.deleteAllRoles);

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Get a role
 *     description: Only admins can fetch role details
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a role
 *     description: Only admins can update roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a role
 *     description: Only admins can delete roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router
  .route('/:roleId')
  .get(auth('view:roles'), roleController.getRole)
  .patch(auth('update:roles'), validate(roleValidation.updateRole), roleController.updateRole)
  .delete(auth('delete:roles'), roleController.deleteRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   patch:
 *     summary: Assign permissions to role
 *     description: Only admins can assign permissions to roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignPermissions'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router
  .route('/:roleId/permissions')
  .patch(auth('assign:permissions'), validate(roleValidation.assignPermissions), roleController.assignPermissions);

/**
 * @swagger
 * /roles/bulk:
 *   post:
 *     summary: Create roles in bulk
 *     description: Only admins can create roles in bulk
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkCreateRoles'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/bulk').post(auth('create:roles'), validate(roleValidation.bulkCreateRoles), roleController.bulkCreateRoles);

module.exports = router;