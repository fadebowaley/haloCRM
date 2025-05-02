const mongoose = require('mongoose');
const config = require('../../src/config/config');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    const isConnected = mongoose.connection.readyState === 1; // 1 means connected
    if (!isConnected) {
      throw new Error('Failed to connect to MongoDB');
    }
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
