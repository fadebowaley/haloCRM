const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'CHF', 'MYR', 'JPY', 'CNY'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'],
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * Create a new payment entry
 * @param {Object} body - The payment data object
 * @returns {Promise<Payment>}
 */
paymentSchema.statics.createPayment = async function (body) {
  const payment = new this(body);
  await payment.save();
  return payment;
};

/**
 * Get payment by reference
 * @param {String} reference - The payment reference
 * @returns {Promise<Payment>}
 */
paymentSchema.statics.getPaymentByReference = async function (reference) {
  return this.findOne({ reference });
};

/**
 * Update payment status
 * @param {String} reference - The payment reference
 * @param {String} status - The new status
 * @returns {Promise<Payment>}
 */
paymentSchema.statics.updatePaymentStatus = async function (reference, status) {
  const payment = await this.findOne({ reference });
  if (payment) {
    payment.status = status;
    await payment.save();
  }
  return payment;
};

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

