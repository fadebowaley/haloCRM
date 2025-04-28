const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

/***
 *Features Recap:
Fields: tenantId, userId, appName, isActive, config, icon, launchCount
Static Methods:
registerApp(body)
getAppsByTenant(tenantId)
toggleAppStatus(id, isActive)
Built-in protection against duplicate app registration for the same tenant.

 *
 *
 */





const allowedApps = [
  'HaloAi',
  'HaloCalendar',
  'HaloGoogleSheet',
  'HaloAdvisor',
  'HaloGrowth',
  'HaloCompliance',
  'HaloInsight',
  'HaloProperties',
];

const appSchema = mongoose.Schema(
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

    appName: {
      type: String,
      enum: allowedApps,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    icon: {
      type: String,
      default: '', // Optional custom icon URL
    },

    config: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    launchCount: {
      type: Number,
      default: 0,
    },
    deletedAt: { type: Date, default: null },
    lastUsedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
appSchema.plugin(toJSON);
appSchema.plugin(paginate);
appSchema.plugin(tenantPlugin);

/**
 * Register a new app to dashboard
 * @param {Object} body
 * @returns {Promise<App>}
 */
appSchema.statics.registerApp = async function (body) {
  const exists = await this.findOne({
    tenantId: body.tenantId,
    appName: body.appName,
  });
  if (exists) {
    throw new Error('App already registered for tenant');
  }
  const app = new this(body);
  await app.save();
  return app;
};

/**
 * Get all apps for a tenant
 * @param {string} tenantId
 * @returns {Promise<App[]>}
 */
appSchema.statics.getAppsByTenant = async function (tenantId) {
  return this.find({ tenantId });
};

/**
 * Activate or deactivate an app
 * @param {ObjectId} id
 * @param {boolean} isActive
 * @returns {Promise<App>}
 */
appSchema.statics.toggleAppStatus = async function (id, isActive) {
  const app = await this.findById(id);
  if (!app) throw new Error('App not found');
  app.isActive = isActive;
  await app.save();
  return app;
};

/**
 * @typedef App
 */
const App = mongoose.model('App', appSchema);
module.exports = App;
