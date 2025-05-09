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

  // Helper function to generate a random date from January 1st of this year to today
  function getRandomDateThisYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // January 1st of this year
    const end = now;
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime);
  }

  const users = await User.find({});

  for (const user of users) {
    user.createdAt = getRandomDateThisYear();
    await user.save({ validateBeforeSave: false });
    console.log(`Updated user ${user.email}, createdAt: ${user.createdAt}`);
  }

  console.log('✅ Done assigning random createdAt dates to all users.');
  process.exit();
})();
