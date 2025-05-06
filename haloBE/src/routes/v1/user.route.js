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
 *   description: User management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         userId:
 *           type: string
 *           description: The unique user ID
 *         tenantId:
 *           type: string
 *           description: The tenant ID associated with the user
 *         firstname:
 *           type: string
 *           description: The user's first name
 *         lastname:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         isOwner:
 *           type: boolean
 *           description: Whether the user is an owner
 *         isSuper:
 *           type: boolean
 *           description: Whether the user has super admin privileges
 *         isAgreed:
 *           type: boolean
 *           description: Whether the user has agreed to terms
 *         isEmailVerified:
 *           type: boolean
 *           description: Whether the email is verified
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of role IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The date the user was soft deleted
 *       example:
 *         id: 65f2c6e5d4f5a5b8e4a12345
 *         userId: "abc123def45"
 *         tenantId: "tenant123"
 *         firstname: "John"
 *         lastname: "Doe"
 *         email: "john.doe@example.com"
 *         isOwner: false
 *         isSuper: false
 *         isAgreed: true
 *         isEmailVerified: false
 *         roles: ["65f2c6e5d4f5a5b8e4a12346"]
 *         createdAt: "2024-03-13T12:00:00Z"
 *         updatedAt: "2024-03-13T12:00:00Z"
 *         deletedAt: null
 *     UserResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 65f2c6e5d4f5a5b8e4a12345
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
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           format: int32
 *         message:
 *           type: string
 *       required:
 *         - code
 *         - message
 */


// Create a new user (owner only)
router.post('/', auth('create:user'), validate(userValidation.ownerCreate), userController.ownerCreate);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (owner only)
 *     description: Only owners can create new users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Must contain at least one letter and one number
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */


// Get all users
router.get('/', auth('view:user'), validate(userValidation.getUsers), userController.getUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a paginated list of users with filtering options.
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
 *         name: isOwner
 *         schema:
 *           type: boolean
 *         description: Filter by owner status
 *       - in: query
 *         name: isSuper
 *         schema:
 *           type: boolean
 *         description: Filter by super admin status
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUsers'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "500":
 *         description: Internal Server Error
 */

// Get user by ID
router.get('/:userId', auth('view:user::userId'), validate(userValidation.getUser), userController.getUser);


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a single user by their ID.
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Not Found
 */


// Update user
router.patch('/:userId', auth('update:user::userId'), validate(userValidation.updateUser), userController.updateUser);


/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update a user
 *     description: Update user information.
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
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               isSuper:
 *                 type: boolean
 *               isOwner:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Not Found
 */


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Permanently delete a user.
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
 *       "204":
 *         description: No Content
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Not Found
 */

/**
 * @swagger
 * /users/bulk-create:
 *   post:
 *     summary: Bulk create users
 *     description: Create multiple users at once.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserResponse'
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       error:
 *                         type: string
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/restore:
 *   post:
 *     summary: Restore multiple users
 *     description: Restore soft-deleted users by tenant ID.
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
 *               - tenantId
 *             properties:
 *               tenantId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restoredCount:
 *                   type: integer
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */

// Delete user
router.delete('/:userId', auth('delete:user::userId'), validate(userValidation.deleteUser), userController.deleteUser);

router.post('/bulk-create', auth('create:user:bulk-create'), validate(userValidation.bulkCreate), userController.bulkCreate);

router.post(
  '/restore',
  auth('create:user:restore'),
  validate(userValidation.restoreUsers),
  userController.restoreUsers
);

/**
 * @swagger
 * /users/restore/{userId}:
 *   post:
 *     summary: Restore a single user
 *     description: Restore a soft-deleted user by ID.
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Not Found
 */
router.post('/restore/:userId', // Expecting userId as URL parameter
  auth('create:user::userId'),
  validate(userValidation.restoreUser), // Validation for userId
  userController.restoreUser // Controller function to restore the user
);

/**
 * @swagger
 * /users/soft-delete/{userId}:
 *   post:
 *     summary: Soft delete a user
 *     description: Mark a user as deleted without permanent removal.
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Not Found
 */
router.post('/soft-delete/:userId', auth('create:user::userId'), userController.softDeleteUser);


module.exports = router;