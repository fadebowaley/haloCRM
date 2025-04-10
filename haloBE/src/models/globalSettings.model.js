const mongoose = require('mongoose');
const validator = require('validator'); // Validator is used for validating input data, such as checking if a string is a valid email format.
const { toJSON, paginate, tenantPlugin } = require('./plugins'); // toJSON plugin is used to convert Mongoose documents to JSON format, while paginate helps in paginating results.

const globalSettingsSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    // General Organization Profile
    organizationName: { type: String, default: 'Default Organization Name' },
    logoUrl: { type: String },
    primaryColor: { type: String, default: '#0000FF' }, // Default: Blue
    contactEmail: { type: String, validate: [validator.isEmail, 'Invalid email format'] },
    contactPhone: { type: String, validate: [validator.isMobilePhone, 'Invalid phone number'] },
    websiteUrl: { type: String, validate: [validator.isURL, 'Invalid URL'] },
    socialLinks: { type: Object, default: {} }, // { facebook: "", twitter: "", linkedin: "", instagram: "" }
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' },

    // Multi-Tenancy Mode
    multiTenant: { type: Boolean, default: false }, // true = multi-tenant, false = single application

    // Event Settings
    eventSchedule: {
      type: [String],
      default: ['Monday 9 AM', 'Thursday 6 PM'],
    },
    enableLiveStreaming: { type: Boolean, default: false },
    liveStreamUrl: { type: String },
    enableEventRegistration: { type: Boolean, default: true },
    maxEventParticipants: { type: Number, default: 1000 },

    // Finance & Payment Settings
    enablePayments: { type: Boolean, default: true }, // Enable payment processing
    currency: { type: String, default: 'USD' },
    exchangeRates: { type: Object, default: {} }, // Multi-currency support
    donationCategories: { type: [String], default: ['General Fund', 'Project Fund', 'Special Fund'] },
    supportedPaymentGateways: {
      type: [String],
      default: ['paypal', 'stripe', 'square'],
    },
    defaultPaymentGateway: { type: String, default: 'paypal' }, // Select preferred payment gateway
    enableRecurringDonations: { type: Boolean, default: true },

    // Reporting & Analytics
    enableReporting: { type: Boolean, default: true }, // Enable/disable reporting
    reportingFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annually'],
      default: 'monthly',
    },
    enableAttendanceTracking: { type: Boolean, default: true },
    trackEngagementPatterns: { type: Boolean, default: true },
    generateReports: { type: Boolean, default: true },

    // Data Locking & Access Control
    enableDataLocks: { type: Boolean, default: true }, // Prevent modifications after submission
    lockPeriod: { type: Number, default: 14 }, // Data auto-lock after X days
    adminOverride: { type: Boolean, default: false }, // Allow admin to override locked data

    allowGuestAccess: { type: Boolean, default: false },

    // Communication & Notifications
    emailSMTP: { type: Object, default: {} },
    enableSMSNotifications: { type: Boolean, default: true },
    enablePushNotifications: { type: Boolean, default: true },
    announcementBroadcast: { type: Boolean, default: true },

    // Security & Compliance
    enableTwoFactorAuth: { type: Boolean, default: true },
    passwordStrengthPolicy: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    gdprCompliance: { type: Boolean, default: true },
    cookieConsentBanner: { type: Boolean, default: true },
    enableIPWhitelisting: { type: Boolean, default: false },
    ipWhitelist: { type: [String], default: [] }, // List of allowed IPs
    apiRateLimit: { type: Number, default: 1000 }, // API requests per hour
    accountRecovery: { type: Boolean, default: true }, // Enable password/account recovery options
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
globalSettingsSchema.plugin(toJSON);
globalSettingsSchema.plugin(paginate);
globalSettingsSchema.plugin(tenantPlugin);

/**
 * @typedef globalSettings
 */

const globalSettings = mongoose.model('globalSettings', globalSettingsSchema);
module.exports = globalSettings;
