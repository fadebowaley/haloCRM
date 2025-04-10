const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const adminValidation = require('../../validations/admin.validation');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('create:admins'), validate(adminValidation.createAdmin), adminController.createAdmin)
  .get(auth('view:admins'), validate(adminValidation.queryAdmins), adminController.queryAdmins);

router
  .route('/:adminId')
  .get(auth('view:admins'), validate(adminValidation.getAdminById), adminController.getAdminById)
  .patch(auth('update:admins'), validate(adminValidation.updateAdmin), adminController.updateAdminById)
  .delete(auth('delete:admins'), validate(adminValidation.deleteAdmin), adminController.deleteAdminById);

router
  .route('/tenant/:tenantId')
  .get(auth('view:admins'), validate(adminValidation.getAdminsByTenant), adminController.getAdminsByTenant);

router
  .route('/assign-role/:adminId')
  .patch(auth('update:admins'), validate(adminValidation.assignRole), adminController.assignRole);

router
  .route('/tenant/:tenantId/all')
  .delete(auth('delete:admins'), validate(adminValidation.deleteAdminsByTenant), adminController.deleteAdminsByTenant);

module.exports = router;
