// Import required dependencies
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

// Create Express router instance
const router = express.Router();


router.get('/templates', roleController.getRoleTemplates);

// Create and List Roles
router
  .route('/')
  .post(auth('create:roles'), validate(roleValidation.createRole), roleController.createRole)
  .get(auth('view:roles'), roleController.getRoles);

// Get, Update, Delete Role
router
  .route('/:roleId')
  .get(auth('view:roles'), roleController.getRole)
  .patch(auth('update:roles'), validate(roleValidation.updateRole), roleController.updateRole)
  .delete(auth('delete:roles'), roleController.deleteRole);

// Assign Permissions to Role
router
  .route('/:roleId/permissions')
  .patch(auth('assign:permissions'), validate(roleValidation.assignPermissions), roleController.assignPermissions);

// Delete All Roles
router.route('/').delete(auth('delete:roles'), roleController.deleteAllRoles);

// Create Bulk Roles by Template
router.route('/bulk').post(auth('create:roles'), validate(roleValidation.bulkCreateRoles), roleController.bulkCreateRoles);


module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65f2c6e5d4f5a5b8e4a12345
 *         name:
 *           type: string
 *           example: Admin
 *         description:
 *           type: string
 *           example: Administrator role with full access
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["65f2c6e5d4f5a5b8e4a12345", "65f2c6e5d4f5a5b8e4a12346"]
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *     PaginatedRoles:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
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
 *     BulkCreateRoleRequest:
 *       type: object
 *       required:
 *         - rolesArray
 *       properties:
 *         rolesArray:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 pattern: ^[a-zA-Z0-9_ ]+$
 *                 example: Admin
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 example: Administrator role
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 example: Administrator role with full access
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["65f2c6e5d4f5a5b8e4a12345"]
 *     responses:
 *       "201":
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
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

/**
 * @swagger
 * /roles/bulk:
 *   post:
 *     summary: Bulk create roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkCreateRoleRequest'
 *     responses:
 *       "201":
 *         description: Roles created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 3 roles successfully created.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
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

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by role name
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
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
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedRoles'
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

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Get role by ID
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
 *       "200":
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
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
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /roles/{roleId}:
 *   patch:
 *     summary: Update role
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 example: Updated administrator role
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["65f2c6e5d4f5a5b8e4a12345"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       "200":
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
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
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Delete role
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
 *       "204":
 *         description: Role deleted successfully
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
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /roles:
 *   delete:
 *     summary: Delete all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: All roles deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All roles deleted successfully
 *                 deletedCount:
 *                   type: integer
 *                   example: 5
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

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   post:
 *     summary: Assign permissions to role
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
 *             type: object
 *             required:
 *               - permissions
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 1
 *                 example: ["65f2c6e5d4f5a5b8e4a12345", "65f2c6e5d4f5a5b8e4a12346"]
 *     responses:
 *       "200":
 *         description: Permissions assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
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
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
