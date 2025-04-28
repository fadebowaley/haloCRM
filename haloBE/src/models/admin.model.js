const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');


/***
 *Fields: tenantId, userId, role, permissions, assignedModules, isActive
Static Methods:
upsertAdmin(body)
getTenantAdmins(tenantId)
toggleStatus(id, isActive)
Built to manage elevated access with fine-grained control.


 *
 */
const adminSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['SuperAdmin', 'TenantAdmin', 'OperationalAdmin'],
      default: 'TenantAdmin',
    },

    permissions: {
      type: [String],
      default: [],
    },

    assignedModules: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    note: {
      type: String,
      default: '',
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Plugins
adminSchema.plugin(toJSON);
adminSchema.plugin(paginate);
adminSchema.plugin(tenantPlugin);

/**
 * Assign or update an admin
 * @param {Object} body
 * @returns {Promise<Admin>}
 */
adminSchema.statics.upsertAdmin = async function (body) {
  const existing = await this.findOne({ userId: body.userId, tenantId: body.tenantId });
  if (existing) {
    Object.assign(existing, body);
    await existing.save();
    return existing;
  }

  const admin = new this(body);
  await admin.save();
  return admin;
};

/**
 * Fetch admins for a tenant
 * @param {string} tenantId
 * @returns {Promise<Admin[]>}
 */
adminSchema.statics.getTenantAdmins = async function (tenantId) {
  return this.find({ tenantId });
};

/**
 * Toggle admin status
 * @param {ObjectId} id
 * @param {boolean} isActive
 * @returns {Promise<Admin>}
 */
adminSchema.statics.toggleStatus = async function (id, isActive) {
  const admin = await this.findById(id);
  if (!admin) throw new Error('Admin not found');
  admin.isActive = isActive;
  await admin.save();
  return admin;
};

/**
 * @typedef Admin
 */
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
