#!/usr/bin/env node
const { generatePermissions } = require('./permissions/generate');
const args = require('minimist')(process.argv.slice(2));
const shouldSeed = args.seed || false;
const dryRun = args['dry-run'] || false;
const removeObsolete = args['remove-obsolete'] || false;
const pathPrefix = args.prefix || '';
const path = require('path');
const baseDir = __dirname;


if (args.help || args.h) {
  console.log(`
Usage:
  node script/generate-permissions.js [--seed] [--dry-run] [--remove-obsolete] [--prefix=/api/v1]

Flags:
  --seed              Seed new permissions into the DB
  --dry-run           Show what would be generated without inserting
  --remove-obsolete   Delete permissions not found in current routes
  --prefix            Remove this prefix from paths before processing
`);
  process.exit(0);
}

generatePermissions({
  routesDir: 'src/routes',
  staticPermissionsPath: path.resolve(baseDir, 'permissions/static.json'),
  snapshotPath: path.resolve(baseDir, 'permissions/snapshot.json'),
  shouldSeed,
  dryRun,
  removeObsolete,
  pathPrefix,
});
