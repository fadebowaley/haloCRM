const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

/****
 *tenantId, userId, and node references: ✔️

Auto-generated departmentId: ✔️

Custom status + description

Static methods:

generateDepartmentId()

createDepartment()

isNameTaken()
 *
 *
 */
const departmentSchema = mongoose.Schema(
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

    departmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);
departmentSchema.plugin(tenantPlugin);

/**
 * Generate a unique department ID
 * @returns {string}
 */
departmentSchema.statics.generateDepartmentId = function () {
  return 'DPT-' + Math.random().toString().slice(2, 10);
};

/**
 * Create a department
 * @param {Object} body
 * @returns {Promise<Department>}
 */
departmentSchema.statics.createDepartment = async function (body) {
  body.departmentId = this.generateDepartmentId();
  const department = new this(body);
  await department.save();
  return department;
};

/**
 * Check if a department name is taken under the same node
 * @param {string} name
 * @param {string} nodeId
 * @returns {Promise<boolean>}
 */
departmentSchema.statics.isNameTaken = async function (name, nodeId) {
  const existing = await this.findOne({ name: new RegExp(`^${name}$`, 'i'), node: nodeId });
  return !!existing;
};

/**
 * @typedef Department
 */
const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
