// scripts/backfillHaloId.js
const mongoose = require('mongoose');
const config = require('../config/config'); // Adjust the path as necessary
const logger = require('../config/logger'); // Adjust the path as necessary
const User = require('../models/user.model'); // Adjust path as needed



// MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB for permission generation.');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the script if MongoDB connection fails
  }
};


(async () => {

  await connectToDB();

  const usersWithoutHaloId = await User.find({ haloId: { $exists: false } });

  for (const user of usersWithoutHaloId) {
    user.haloId = await User.generateHaloId();
    await user.save({ validateBeforeSave: false });
    console.log(`Updated user ${user.email} -> ${user.haloId}`);
  }

  console.log('✅ Done assigning haloIds to all users.');
  process.exit();
})();
