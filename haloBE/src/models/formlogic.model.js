// models/FormLogicRule.js

const mongoose = require('mongoose');

const LogicConditionSchema = new mongoose.Schema({
  fieldId: { type: String, required: true }, // field to evaluate
  operator: {
    type: String,
    enum: ['equals', 'not_equals', 'gt', 'lt', 'gte', 'lte', 'contains', 'not_contains', 'in', 'not_in'],
    required: true,
  },
  value: mongoose.Schema.Types.Mixed, // string, number, boolean, array
});

const LogicActionSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ['show', 'hide', 'require', 'optional', 'disable', 'enable'],
    required: true,
  },
  targetFieldId: { type: String, required: true }, // field affected by the action
});

const FormLogicRuleSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormDefinition', required: true },
    ruleName: { type: String },
    conditions: [LogicConditionSchema],
    actions: [LogicActionSchema],
    logicType: {
      type: String,
      enum: ['all', 'any'], // all conditions must match, or any
      default: 'all',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FormLogicRule', FormLogicRuleSchema);
