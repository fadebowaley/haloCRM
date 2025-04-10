const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

// Create a new payment
const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

// Get payment by ID
const getPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  res.send(payment);
});

// Get payment by reference
const getPaymentByReference = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentByReference(req.params.reference);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  res.send(payment);
});

// Update payment by ID
const updatePayment = catchAsync(async (req, res) => {
  const updatedPayment = await paymentService.updatePaymentById(req.params.paymentId, req.body);
  res.send(updatedPayment);
});

// Delete payment by ID
const deletePayment = catchAsync(async (req, res) => {
  await paymentService.deletePaymentById(req.params.paymentId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Query payments with filters and pagination
const queryPayments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'user', 'amount']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await paymentService.queryPayments(filter, options);
  res.send(result);
});

// Get payments by status
const getPaymentsByStatus = catchAsync(async (req, res) => {
  const payments = await paymentService.getPaymentsByStatus(req.params.status);
  res.send(payments);
});

// Get payments by user
const getPaymentsByUser = catchAsync(async (req, res) => {
  const payments = await paymentService.getPaymentsByUser(req.params.userId);
  res.send(payments);
});

// Process a payment
const processPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.processPayment(req.body);
  res.send(payment);
});

// Complete a payment
const completePayment = catchAsync(async (req, res) => {
  const payment = await paymentService.completePayment(req.params.paymentId);
  res.send(payment);
});

// Cancel a payment
const cancelPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.cancelPayment(req.params.paymentId);
  res.send(payment);
});

// Refund a payment
const refundPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.refundPayment(req.params.paymentId);
  res.send(payment);
});

// Generate payment receipt
const generatePaymentReceipt = catchAsync(async (req, res) => {
  const receipt = await paymentService.generatePaymentReceipt(req.params.paymentId);
  res.send(receipt);
});

module.exports = {
  createPayment,
  getPayment,
  getPaymentByReference,
  updatePayment,
  deletePayment,
  queryPayments,
  getPaymentsByStatus,
  getPaymentsByUser,
  processPayment,
  completePayment,
  cancelPayment,
  refundPayment,
  generatePaymentReceipt,
};
