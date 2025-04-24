const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65f2c6e5d4f5a5b8e4a12345
 *         firstname:
 *           type: string
 *           example: John
 *         lastname:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         isEmailVerified:
 *           type: boolean
 *           example: false
 *         isOwner:
 *           type: boolean
 *           example: false
 *         isSuper:
 *           type: boolean
 *           example: false
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["65f2c6e5d4f5a5b8e4a12345"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-13T12:00:00Z
 *     PaginatedUsers:
 *       type: object
 *       properties:
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
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

// Create a new user (owner only)
router.post(
  '/',
  auth('manageUsers'),
  validate(userValidation.ownerCreate),
  userController.ownerCreate
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (owner only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: Password123
 *               isOwner:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       "201":
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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

// Get all users
router.get('/', auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter by email
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (searches in firstname, lastname, email, and userId)
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
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUsers'
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

// Get user by ID
router.get('/:userId', auth('getUsers'), validate(userValidation.getUser), userController.getUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       "200":
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Update user
router.patch('/:userId', auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewPassword123
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               isSuper:
 *                 type: boolean
 *                 example: false
 *               isOwner:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       "200":
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Delete user
router.delete('/:userId', auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.post('/bulk-create', auth('manageUsers'), validate(userValidation.bulkCreate), userController.bulkCreate);



router.post(
  '/restore',
  auth('manageUsers'),
  validate(userValidation.restoreUsers), // Add validation if you decide to use it
  userController.restoreUsers
);

router.post(
  '/restore/:userId', // Expecting userId as URL parameter
  auth('manageUsers'),
  validate(userValidation.restorzeUser), // Validation for userId
  userController.restoreUser // Controller function to restore the user
);


router.post(
  '/soft-delete/:userId',
  auth('manageUsers'),
  userController.softDeleteUser
);




module.exports = router;