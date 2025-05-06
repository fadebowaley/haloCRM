const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const FrequencySchema = new mongoose.Schema({
  mode: { type: String, enum: ['one-time', 'recurring', 'date-range', 'specific-dates'], default: 'one-time' },
  recurring: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
  dateRange: {
    from: { type: Date },
    to: { type: Date },
  },
  specificDates: [{ type: Date }],
});

const AdvancedFinanceOptionsSchema = new mongoose.Schema({
  enableCheckout: { type: Boolean, default: false },
  percentageFields: [
    {
      label: String,
      percentage: Number,
    },
  ],
  targetAccount: { type: String },
});

const FormFieldSchema = new mongoose.Schema({
  fieldId: { type: String, required: true }, // Unique within the form
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'text',
      'textarea',
      'number',
      'select',
      'radio',
      'checkbox',
      'date',
      'datetime',
      'file',
      'email',
      'phone',
      'currency',
      'location',
      'image',
      'signature',
      'richtext',
      'group',
      'table',
    ],
    required: true,
  },
  placeholder: String,
  defaultValue: mongoose.Schema.Types.Mixed,
  required: { type: Boolean, default: false },
  options: [String], // For select/radio/checkbox
  validations: mongoose.Schema.Types.Mixed, // { min, max, pattern, maxLength, minLength }

  visibilityRules: mongoose.Schema.Types.Mixed, // Logic rules tied to form logic engine

  // Advanced
  isRepeatable: { type: Boolean, default: false },
  subFields: [this], // Recursive group/table fields

  // File settings
  acceptedFileTypes: [String],
  maxFileSizeMB: { type: Number },

  // Finance
  isFinancial: { type: Boolean, default: false },
  percentageOf: { type: String }, // fieldId it refers to
  currencyCode: { type: String, default: 'NGN' },

  // Editability
  isEditable: { type: Boolean, default: true },
  editableUntil: { type: Date },
});

const FormDefinitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ['HR-EMPLOYEES', 'PROPERTIES', 'FINANCES', 'ATTENDANCE', 'MARKET PRICES', 'CUSTOM'],
      default: 'CUSTOM',
    },
    tenantId: { type: String, index: true },
    assignedNodeLevels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level' }],
    assignedNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nodes' }],
    fields: [FormFieldSchema],

    // Generic Settings
    frequency: FrequencySchema,
    editable: {
      allowEdit: { type: Boolean, default: true },
      editableUntil: { type: Date }, // globally
      editablePerResponseTime: { type: Boolean, default: false },
      editWindowInHours: { type: Number }, // e.g., 24hr after response
    },
    publishDate: { type: Date, default: Date.now },
    closeDate: { type: Date }, // when form is closed for submission

    // Advanced Settings
    advancedOptions: {
      finance: AdvancedFinanceOptionsSchema,
      enableDraftSave: { type: Boolean, default: true },
      allowResponsePreview: { type: Boolean, default: true },
      allowMultipleSubmissions: { type: Boolean, default: true },
      logicEngineEnabled: { type: Boolean, default: false },
      uploadTo: { type: String, enum: ['s3', 'gcs', 'local'], default: 's3' },
    },

    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  },
  { timestamps: true }
);

FormDefinitionSchema.plugin(toJSON);
FormDefinitionSchema.plugin(paginate);
FormDefinitionSchema.plugin(tenantPlugin);

// Inside your FormDefinitionSchema file
FormDefinitionSchema.statics.createForm = async function (payload, tenantId) {

  const { title, fields } = payload;

  // Check for duplicate title within the same tenant
  const existing = await this.findOne({ title, tenantId });
  if (existing) {
    throw new Error('A form with this title already exists for this tenant.');
  }

  // Inject tenantId
  const formPayload = {
    ...payload,
    tenantId,
    advancedOptions: {
      enableDraftSave: true,
      allowResponsePreview: true,
      allowMultipleSubmissions: true,
      logicEngineEnabled: false,
      uploadTo: 's3',
      ...(payload.advancedOptions || {}),
    },
  };

  const created = await this.create(formPayload);
  return created;
};

module.exports = mongoose.model('FormDefinition', FormDefinitionSchema);
