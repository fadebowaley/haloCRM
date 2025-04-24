#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mongoose = require('mongoose');
const Permission = require('../models/permission.model'); // Update path if needed

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

const generatePermissionsFromRoutes = async ({
  routesDir = 'src/routes',
  staticPermissionsPath = 'permissions.static.json',
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

  // Merge with static permissions
  let staticPermissions = [];
  if (fs.existsSync(staticPermissionsPath)) {
    staticPermissions = JSON.parse(fs.readFileSync(staticPermissionsPath));
  }

  const allPermissions = [...permissions, ...staticPermissions];
  const uniquePermissions = Array.from(new Map(allPermissions.map((p) => [p.name, p])).values());

  // Write snapshot for audit
  fs.writeFileSync('permissions.snapshot.json', JSON.stringify(uniquePermissions, null, 2));

  if (dryRun) {
    console.log(uniquePermissions);
    return;
  }

  if (shouldSeed) {
    const existing = await Permission.find({});
    const existingNames = existing.map((p) => p.name);
    const newPermissions = uniquePermissions.filter((p) => !existingNames.includes(p.name));

    if (newPermissions.length > 0) {
      await Permission.insertMany(newPermissions);
      console.log(`✅ Seeded ${newPermissions.length} new permissions.`);
    } else {
      console.log(`⚠️  No new permissions to seed.`);
    }

    if (removeObsolete) {
      const currentNames = uniquePermissions.map((p) => p.name);
      const obsolete = existing.filter((p) => !currentNames.includes(p.name));
      if (obsolete.length > 0) {
        await Permission.deleteMany({ name: { $in: obsolete.map((p) => p.name) } });
        console.log(`🗑️ Removed ${obsolete.length} obsolete permissions.`);
      }
    }
  } else {
    console.log(uniquePermissions);
  }
};

module.exports = generatePermissionsFromRoutes;

// CLI Wrapper
const { program } = require('commander');
program
  .option('-s, --seed', 'Seed new permissions to database')
  .option('-d, --dry-run', 'Only display generated permissions, do not insert into DB')
  .option('-r, --remove-obsolete', 'Remove permissions in DB not found in routes')
  .option('-R, --routes <path>', 'Path to routes directory', 'src/routes')
  .option('-S, --static <path>', 'Path to static permissions JSON', 'permissions.static.json')
  .parse(process.argv);

const options = program.opts();

(async () => {
  await generatePermissionsFromRoutes({
    routesDir: options.routes,
    staticPermissionsPath: options.static,
    shouldSeed: options.seed,
    dryRun: options.dryRun,
    removeObsolete: options.removeObsolete,
  });
})();
