const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

/***
 * Summary of statement.model.js:
References: Node, Collection, userId, and tenantId.
Fields: amount, type, description, balanceAfter, reference, status, metadata.
Static Methods:
generateReference(): generates a unique reference like TXN-ABCD1234.
isReferenceTaken(reference): checks uniqueness.
createStatement(data): main creation logic with validation.
 *
 *
 */
const statementSchema = mongoose.Schema(
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

    node: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
    },

    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    reference: {
      type: String,
      unique: true,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
statementSchema.plugin(toJSON);
statementSchema.plugin(paginate);
statementSchema.plugin(tenantPlugin);

/**
 * Generate a unique reference ID
 * @returns {string}
 */
statementSchema.statics.generateReference = function () {
  return 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

/**
 * Check if a reference already exists
 * @param {string} reference
 * @returns {Promise<boolean>}
 */
statementSchema.statics.isReferenceTaken = async function (reference) {
  const stmt = await this.findOne({ reference });
  return !!stmt;
};

/**
 * Create a new statement record
 * @param {Object} data
 * @returns {Promise<Statement>}
 */
statementSchema.statics.createStatement = async function (data) {
  if (!data.reference) {
    data.reference = this.generateReference();
  }

  const exists = await this.isReferenceTaken(data.reference);
  if (exists) {
    throw new Error('Transaction reference already used');
  }

  const statement = new this(data);
  await statement.save();
  return statement;
};

/**
 * @typedef Statement
 */
const Statement = mongoose.model('Statement', statementSchema);

module.exports = Statement;
