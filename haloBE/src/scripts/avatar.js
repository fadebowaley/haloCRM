// scripts/backfillAvatar.js
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../config/logger');
const User = require('../models/user.model');

const AVATAR_BASE_URL = 'https://halocrm.s3.us-east-1.amazonaws.com/user';

// MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB for avatar backfill.');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

(async () => {
  await connectToDB();

  const usersWithoutAvatar = await User.find({ avatar: { $exists: false } });

  for (const user of usersWithoutAvatar) {
    const randomNum = Math.floor(Math.random() * 15) + 1;
    const paddedNum = String(randomNum).padStart(2, '0');
    user.avatar = `${AVATAR_BASE_URL}/avatar-${paddedNum}.webp`;

    await user.save({ validateBeforeSave: false });
    console.log(`Updated user ${user.email} -> avatar-${paddedNum}.webp`);
  }

  console.log(`✅ Done assigning avatars to ${usersWithoutAvatar.length} users.`);
  process.exit();
})();
