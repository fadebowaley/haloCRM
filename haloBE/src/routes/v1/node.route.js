const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const nodeValidation = require('../../validations/node.validation');
const nodeController = require('../../controllers/node.controller');

const router = express.Router();

// Route for creating a new node
router
  .route('/')
  .post(auth('create:node'), validate(nodeValidation.createNode), nodeController.createNode)
  .get(auth('view:node'), validate(nodeValidation.queryNodes), nodeController.queryNodes);

// Route for fetching, updating, and deleting a node by ID
router
  .route('/:nodeId')
  .get(auth('view:node'), validate(nodeValidation.getNodeById), nodeController.getNodeById)
  .patch(auth('update:node'), validate(nodeValidation.updateNodeById), nodeController.updateNodeById)
  .delete(auth('delete:node'), validate(nodeValidation.deleteNodeById), nodeController.deleteNodeById);

// Route for fetching nodes by type (e.g., main, owner)
router.route('/type').get(auth('view:node'), validate(nodeValidation.getNodesByType), nodeController.getNodesByType);

// Routes for fetching parent and child nodes
router.route('/:nodeId/parent').get(auth('view:node'), validate(nodeValidation.getParentNode), nodeController.getParentNode);

router
  .route('/:nodeId/children')
  .get(auth('view:node'), validate(nodeValidation.getChildNodes), nodeController.getChildNodes);

// Route for moving a node to a parent node
router
  .route('/:nodeId/move')
  .patch(auth('update:node'), validate(nodeValidation.moveNodeToParent), nodeController.moveNodeToParent);

// Route for fetching the node path (parent hierarchy)
router.route('/:nodeId/path').get(auth('view:node'), validate(nodeValidation.getNodePath), nodeController.getNodePath);

// Routes for activating and deactivating nodes
router
  .route('/:nodeId/activate')
  .patch(auth('update:node'), validate(nodeValidation.activateNode), nodeController.activateNode);

router
  .route('/:nodeId/deactivate')
  .patch(auth('update:node'), validate(nodeValidation.deactivateNode), nodeController.deactivateNode);

module.exports = router;
