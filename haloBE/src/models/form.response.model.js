// models/FormResponse.js
const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const AuditSchema = new mongoose.Schema({
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submittedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date },
  ipAddress: { type: String },
  userAgent: { type: String },
});

const ResponseStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['submitted', 'in-progress', 'draft', 'locked', 'archived'],
    default: 'submitted',
  },
  editableUntil: { type: Date },
  isLocked: { type: Boolean, default: false },
});

const FormResponseSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormDefinition', required: true },
    tenantId: { type: String, required: true },
    nodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nodes', required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    responseData: mongoose.Schema.Types.Mixed, // flexible JSON structure
    statusInfo: ResponseStatusSchema,
    audit: AuditSchema,
  },
  { timestamps: true }
);

FormResponseSchema.plugin(toJSON);
FormResponseSchema.plugin(paginate);
FormResponseSchema.plugin(tenantPlugin);

module.exports = mongoose.model('FormResponse', FormResponseSchema);
