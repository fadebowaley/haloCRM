const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const generatePermissionsFromRoutes = require('../utils/permissionGenerator');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb';

mongoose.connect(MONGO_URI).then(async () => {
  await generatePermissionsFromRoutes('src/routes', true); // change path as needed
  mongoose.disconnect();
});
