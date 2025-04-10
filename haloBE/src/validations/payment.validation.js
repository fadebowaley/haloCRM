const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new payment
const createPayment = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().alphanum(),
    userId: Joi.string().required().alphanum(),
    amount: Joi.number().required(),
    currency: Joi.string().valid('USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'CHF', 'MYR', 'JPY', 'CNY').required(),
    status: Joi.string().valid('pending', 'completed', 'failed', 'refunded').default('pending'),
    reference: Joi.string().required(),
    paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto').required(),
    paymentDate: Joi.date().default(Date.now),
    total: Joi.number().required(),
  }),
};

// Validation schema for querying payments
const queryPayments = {
  query: Joi.object().keys({
    tenantId: Joi.string().alphanum(),
    userId: Joi.string().alphanum(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for fetching a payment by ID
const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for fetching a payment by reference
const getPaymentByReference = {
  params: Joi.object().keys({
    reference: Joi.string().required(),
  }),
};

// Validation schema for updating a payment
const updatePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number(),
      currency: Joi.string().valid('USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'CHF', 'MYR', 'JPY', 'CNY'),
      status: Joi.string().valid('pending', 'completed', 'failed', 'refunded'),
      reference: Joi.string(),
      paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'),
      total: Joi.number(),
    })
    .min(1),
};

// Validation schema for deleting a payment
const deletePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for fetching payments by status
const getPaymentsByStatus = {
  query: Joi.object().keys({
    status: Joi.string().valid('pending', 'completed', 'failed', 'refunded').required(),
  }),
};

// Validation schema for fetching payments by user
const getPaymentsByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for processing a payment
const processPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for completing a payment
const completePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for canceling a payment
const cancelPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for refunding a payment
const refundPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for generating a payment receipt
const generatePaymentReceipt = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createPayment,
  queryPayments,
  getPayment,
  getPaymentByReference,
  updatePayment,
  deletePayment,
  getPaymentsByStatus,
  getPaymentsByUser,
  processPayment,
  completePayment,
  cancelPayment,
  refundPayment,
  generatePaymentReceipt,
};
