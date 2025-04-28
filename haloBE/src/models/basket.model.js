const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const BasketSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    deletedAt: { type: Date, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offerings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collections' }],
    totalAmount: { type: Number, default: 0 }, // Total computed value of all offerings
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Reference to the user who created the role
  },
  { timestamps: true }
);

// Function to calculate total amount from offerings
BasketSchema.methods.calculateTotalAmount = async function () {
  const offerings = await mongoose.model('Collections').find({ _id: { $in: this.offerings } });
  this.totalAmount = offerings.reduce((total, offering) => total + offering.amount, 0);
  await this.save();
};


const Basket = mongoose.model('Basket', BasketSchema);
module.exports = Basket;
