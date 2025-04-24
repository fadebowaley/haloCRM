#!/usr/bin/env node

const { generatePermissions } = require('./permissions/generate');
const args = require('minimist')(process.argv.slice(2));

const shouldSeed = args.seed || false;
const dryRun = args['dry-run'] || false;
const removeObsolete = args['remove-obsolete'] || false;

generatePermissions({
  routesDir: 'src/routes',
  staticPermissionsPath: './scripts/permissions/static.json',
  snapshotPath: './scripts/permissions/snapshot.json',
  shouldSeed,
  dryRun,
  removeObsolete,
});
