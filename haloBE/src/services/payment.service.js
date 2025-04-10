const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new payment
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
const createPayment = async (paymentBody) => {
  return Payment.create(paymentBody);
};

/**
 * Get payment by id
 * @param {ObjectId} id
 * @returns {Promise<Payment>}
 */
const getPaymentById = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

/**
 * Get payment by reference
 * @param {string} reference
 * @returns {Promise<Payment>}
 */
const getPaymentByReference = async (reference) => {
  const payment = await Payment.findOne({ reference });
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

/**
 * Update payment by id
 * @param {ObjectId} paymentId
 * @param {Object} updateBody
 * @returns {Promise<Payment>}
 */
const updatePaymentById = async (paymentId, updateBody) => {
  const payment = await getPaymentById(paymentId);
  Object.assign(payment, updateBody);
  await payment.save();
  return payment;
};

/**
 * Delete payment by id
 * @param {ObjectId} paymentId
 * @returns {Promise<Payment>}
 */
const deletePaymentById = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  await payment.remove();
  return payment;
};

/**
 * Query for payments
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (filter, options) => {
  return Payment.paginate(filter, options);
};

/**
 * Get payments by status
 * @param {string} status - Payment status
 * @returns {Promise<Array<Payment>>}
 */
const getPaymentsByStatus = async (status) => {
  return Payment.find({ status });
};

/**
 * Get payments by user
 * @param {ObjectId} userId
 * @returns {Promise<Array<Payment>>}
 */
const getPaymentsByUser = async (userId) => {
  return Payment.find({ userId });
};

/**
 * Process payment
 * @param {ObjectId} paymentId
 * @param {Object} paymentDetails
 * @returns {Promise<Payment>}
 */
const processPayment = async (paymentId, paymentDetails) => {
  const payment = await getPaymentById(paymentId);

  // Update payment with processing details
  payment.status = 'processing';
  payment.processedAt = new Date();
  payment.paymentDetails = paymentDetails;

  await payment.save();
  return payment;
};

/**
 * Complete payment
 * @param {ObjectId} paymentId
 * @param {Object} completionDetails
 * @returns {Promise<Payment>}
 */
const completePayment = async (paymentId, completionDetails) => {
  const payment = await getPaymentById(paymentId);

  // Update payment with completion details
  payment.status = 'completed';
  payment.completedAt = new Date();
  payment.completionDetails = completionDetails;

  await payment.save();
  return payment;
};

/**
 * Cancel payment
 * @param {ObjectId} paymentId
 * @param {string} reason
 * @returns {Promise<Payment>}
 */
const cancelPayment = async (paymentId, reason) => {
  const payment = await getPaymentById(paymentId);

  // Update payment with cancellation details
  payment.status = 'cancelled';
  payment.cancelledAt = new Date();
  payment.cancellationReason = reason;

  await payment.save();
  return payment;
};

/**
 * Refund payment
 * @param {ObjectId} paymentId
 * @param {Object} refundDetails
 * @returns {Promise<Payment>}
 */
const refundPayment = async (paymentId, refundDetails) => {
  const payment = await getPaymentById(paymentId);

  // Update payment with refund details
  payment.status = 'refunded';
  payment.refundedAt = new Date();
  payment.refundDetails = refundDetails;

  await payment.save();
  return payment;
};

/**
 * Generate payment receipt
 * @param {ObjectId} paymentId
 * @returns {Promise<string>} - Receipt URL or content
 */
const generatePaymentReceipt = async (paymentId) => {
  const payment = await getPaymentById(paymentId);

  // This would typically generate a PDF or other document
  // For now, we'll just return a placeholder
  return `Receipt for payment ${payment.reference}`;
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentByReference,
  updatePaymentById,
  deletePaymentById,
  queryPayments,
  getPaymentsByStatus,
  getPaymentsByUser,
  processPayment,
  completePayment,
  cancelPayment,
  refundPayment,
  generatePaymentReceipt,
};
