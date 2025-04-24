const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const appValidation = require('../../validations/app.validation');
const appController = require('../../controllers/app.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('create:apps'), validate(appValidation.createApp), appController.createApp)
  .get(auth('view:apps'), validate(appValidation.queryApps), appController.queryApps);

router.route('/bulk-create').post(auth('create:apps'), validate(appValidation.bulkCreateApps), appController.bulkCreateApps);

router
  .route('/:appId')
  .get(auth('view:apps'), validate(appValidation.getAppById), appController.getAppById)
  .patch(auth('update:apps'), validate(appValidation.updateApp), appController.updateAppById)
  .delete(auth('delete:apps'), validate(appValidation.deleteApp), appController.deleteAppById);

router.route('/assign/:appId').patch(auth('update:apps'), validate(appValidation.assignApp), appController.assignApp);

router
  .route('/tenant-or-user/:tenantId/:userId')
  .get(auth('view:apps'), validate(appValidation.getAppsForTenantOrUser), appController.getAppsForTenantOrUser);

router
  .route('/toggle-status/:appId')
  .patch(auth('update:apps'), validate(appValidation.toggleAppStatus), appController.toggleAppStatus);

router
  .route('/tenant/:tenantId')
  .delete(auth('delete:apps'), validate(appValidation.deleteAppsByTenant), appController.deleteAppsByTenant);

module.exports = router;

