const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

// Route for creating a new payment
router
  .route('/')
  .post(auth('create:payment'), validate(paymentValidation.createPayment), paymentController.createPayment)
  .get(auth('view:payment'), validate(paymentValidation.queryPayments), paymentController.queryPayments);

// Route for fetching a payment by ID or reference
router
  .route('/:paymentId')
  .get(auth('view:payment'), validate(paymentValidation.getPayment), paymentController.getPayment)
  .patch(auth('update:payment'), validate(paymentValidation.updatePayment), paymentController.updatePayment)
  .delete(auth('delete:payment'), validate(paymentValidation.deletePayment), paymentController.deletePayment);

// Route for fetching a payment by reference
router
  .route('/reference/:reference')
  .get(auth('view:payment'), validate(paymentValidation.getPaymentByReference), paymentController.getPaymentByReference);

// Route for fetching payments by status
router
  .route('/status')
  .get(auth('view:payment'), validate(paymentValidation.getPaymentsByStatus), paymentController.getPaymentsByStatus);

// Route for fetching payments by user
router
  .route('/user/:userId')
  .get(auth('view:payment'), validate(paymentValidation.getPaymentsByUser), paymentController.getPaymentsByUser);

// Route for processing a payment
router
  .route('/:paymentId/process')
  .patch(auth('update:payment'), validate(paymentValidation.processPayment), paymentController.processPayment);

// Route for completing a payment
router
  .route('/:paymentId/complete')
  .patch(auth('update:payment'), validate(paymentValidation.completePayment), paymentController.completePayment);

// Route for canceling a payment
router
  .route('/:paymentId/cancel')
  .patch(auth('update:payment'), validate(paymentValidation.cancelPayment), paymentController.cancelPayment);

// Route for refunding a payment
router
  .route('/:paymentId/refund')
  .patch(auth('update:payment'), validate(paymentValidation.refundPayment), paymentController.refundPayment);

// Route for generating a payment receipt
router
  .route('/:paymentId/receipt')
  .get(auth('view:payment'), validate(paymentValidation.generatePaymentReceipt), paymentController.generatePaymentReceipt);

module.exports = router;
