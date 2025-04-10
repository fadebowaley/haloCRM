const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const captureValidation = require('../../validations/capture.validation');
const captureController = require('../../controllers/capture.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('create:captures'), validate(captureValidation.createCapture), captureController.createCapture)
  .get(auth('view:captures'), validate(captureValidation.queryCaptures), captureController.queryCaptures);

router
  .route('/bulk-create')
  .post(auth('create:captures'), validate(captureValidation.bulkInsertCaptures), captureController.bulkInsertCaptures);

router
  .route('/:captureId')
  .get(auth('view:captures'), validate(captureValidation.getCaptureById), captureController.getCaptureById)
  .patch(auth('update:captures'), validate(captureValidation.updateCaptureById), captureController.updateCaptureById)
  .delete(auth('delete:captures'), validate(captureValidation.deleteCaptureById), captureController.deleteCaptureById);

router
  .route('/datapoint/:datapointId')
  .get(auth('view:captures'), validate(captureValidation.getCapturesByDatapoint), captureController.getCapturesByDatapoint);

router
  .route('/tenant/:tenantId')
  .delete(
    auth('delete:captures'),
    validate(captureValidation.deleteAllCapturesByTenant),
    captureController.deleteAllCapturesByTenant
  );

router
  .route('/export/datapoint/:datapointId')
  .get(
    auth('view:captures'),
    validate(captureValidation.exportCapturesByDatapoint),
    captureController.exportCapturesByDatapoint
  );

module.exports = router;
