// scripts/permissions/generate.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Permission = require('../../models/permission.model'); // adjust if needed

const HTTP_ACTION_MAP = {
  GET: 'view',
  POST: 'create',
  PUT: 'update',
  PATCH: 'update',
  DELETE: 'delete',
};

const extractResource = (pathStr) => {
  const parts = pathStr.split('/');
  const resource = parts.filter(Boolean).pop();
  return resource?.replace(':', '') || 'unknown';
};

const loadStaticPermissions = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
};

const writeSnapshot = (permissions, snapshotPath) => {
  fs.writeFileSync(snapshotPath, JSON.stringify(permissions, null, 2));
  console.log(`📸 Snapshot written to ${snapshotPath}`);
};

const generatePermissions = async ({
  routesDir = 'src/routes',
  staticPermissionsPath,
  snapshotPath,
  shouldSeed = false,
  dryRun = false,
  removeObsolete = false,
}) => {
  const files = glob.sync(`${routesDir}/**/*.js`);
  const permissions = [];

  for (const file of files) {
    const router = require(path.resolve(file));
    if (!router.stack) continue;

    router.stack.forEach((layer) => {
      if (layer.route) {
        const pathStr = layer.route.path;
        const methods = Object.keys(layer.route.methods).map((m) => m.toUpperCase());

        methods.forEach((method) => {
          const action = HTTP_ACTION_MAP[method];
          const resource = extractResource(pathStr);

          if (!action || !resource) return;

          const name = `${action}:${resource}`;
          const permission = {
            name,
            action,
            resource,
            method,
            description: `${action} permission on ${resource}`,
          };

          permissions.push(permission);
        });
      }
    });
  }

  const staticPermissions = loadStaticPermissions(staticPermissionsPath);
  const allPermissions = [...permissions, ...staticPermissions];

  const uniquePermissions = Array.from(new Map(allPermissions.map((p) => [p.name, p])).values());

  writeSnapshot(uniquePermissions, snapshotPath);

  if (dryRun) {
    console.log('💡 Dry run - generated permissions:', uniquePermissions);
    return;
  }

  const existing = await Permission.find({});
  const existingNames = existing.map((p) => p.name);

  const newPermissions = uniquePermissions.filter((p) => !existingNames.includes(p.name));
  const removedPermissions = existing.filter((p) => !uniquePermissions.find((up) => up.name === p.name));

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
