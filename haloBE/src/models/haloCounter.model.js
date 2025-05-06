const mongoose = require('mongoose');

const haloCounterSchema = new mongoose.Schema({
  name: { type: String, default: 'halo' },
  seq: { type: Number, default: 0 },
});

// Avoid OverwriteModelError
module.exports = mongoose.models.HaloCounter || mongoose.model('HaloCounter', haloCounterSchema, 'halo_counters');
