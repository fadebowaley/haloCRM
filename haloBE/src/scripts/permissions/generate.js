const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mongoose = require('mongoose');
const Permission = require('../../models/permission.model');
const config = require('../../config/config'); // Adjust the path as necessary
const logger = require('../../config/logger'); // Adjust the path as necessary


const HTTP_ACTION_MAP = {
  GET: 'view',
  POST: 'create',
  PUT: 'update',
  PATCH: 'update',
  DELETE: 'delete',
};

const normalizePath = (p) => (p.startsWith('/') ? p : '/' + p);

const loadStaticPermissions = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
};

const writeSnapshot = (permissions, snapshotPath) => {
  const dir = path.dirname(snapshotPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(snapshotPath, JSON.stringify(permissions, null, 2));
  console.log(`📸 Snapshot written to ${snapshotPath}`);
};

// Enhanced resource extractor
const extractResource = ({ filePath, routePath }) => {
  if (filePath) {
    const filename = path.basename(filePath, '.js'); // 'auth.route.js' => 'auth'
    const parts = filename.split('.');
    const resource = parts[0]; // 'auth'
    const routeParts = routePath.split('/');
    const action = routeParts[routeParts.length - 1]; // last segment of the path
    return `${resource}:${action}`; // e.g., 'auth:register'
  }
  return 'unknown';
};


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

const generatePermissions = async ({
  routesDir = 'src/routes',
  staticPermissionsPath,
  snapshotPath,
  shouldSeed = false,
  dryRun = false,
  removeObsolete = false,
  pathPrefix = '',
}) => {
  // Wait for the DB connection to be established first
  await connectToDB();

  const files = glob.sync(`${routesDir}/**/*.js`);
  const permissions = [];

  for (const file of files) {
    const router = require(path.resolve(file));
    if (!router.stack) continue;

    router.stack.forEach((layer) => {
      if (layer.route) {
        let pathStr = layer.route.path;
        if (pathPrefix) pathStr = pathStr.replace(new RegExp(`^${pathPrefix}`), '');
        pathStr = normalizePath(pathStr);
        const methods = Object.keys(layer.route.methods).map((m) => m.toUpperCase());
        methods.forEach((method) => {
          const action = HTTP_ACTION_MAP[method];
          const resource = extractResource({ filePath: file, routePath: pathStr }); // Pass routePath here
          const resourceFromPath = resource.split(':')[0];

          if (!action || !resource) return;

          let name = `${action}:${resource}`;

          if (pathStr === '/') {
            name = name.replace(/:$/, ''); // Remove the trailing colon for the root path
          }

          permissions.push({
            name,
            action,
            resource: resourceFromPath,
            path: pathStr,
            method,
            description: `${action} permission on ${name}`,
            isWildcard: pathStr.includes('*'),
            isAdminLevel: false,
          });
        });
      }
    });
  }

  const staticPermissions = loadStaticPermissions(staticPermissionsPath);
  const allPermissions = [...permissions, ...staticPermissions];

  const key = (p) => `${p.name}:${p.method}:${p.path}`;
  const uniquePermissions = Array.from(new Map(allPermissions.map((p) => [key(p), p])).values());

  writeSnapshot(uniquePermissions, snapshotPath);

  if (dryRun) {
    console.log('💡 Dry run - generated permissions:', uniquePermissions);
    return;
  }

  const existing = await Permission.find({});
  const existingKeys = new Set(existing.map((p) => key(p)));

  const newPermissions = uniquePermissions.filter((p) => !existingKeys.has(key(p)));
  const removedPermissions = existing.filter((p) => !uniquePermissions.find((up) => key(up) === key(p)));

  if (shouldSeed && newPermissions.length > 0) {
    await Permission.insertMany(newPermissions);
    console.log(`✅ Seeded ${newPermissions.length} new permissions.`);
  } else if (shouldSeed) {
    console.log('⚠️  No new permissions to seed.');
  }

  if (removeObsolete && removedPermissions.length > 0) {
    const removedNames = removedPermissions.map((p) => p.name);
    await Permission.deleteMany({ name: { $in: removedNames } });
    console.log(`🗑️  Removed ${removedNames.length} obsolete permissions.`);
  } else if (removedPermissions.length > 0) {
    console.log('⚠️  Found obsolete permissions (not removed):');
    removedPermissions.forEach((p) => console.log(` - ${p.name}`));
  }
};

module.exports = {
  generatePermissions,
};
