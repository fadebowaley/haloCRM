const fs = require('fs');
const path = require('path');
const glob = require('glob');
const express = require('express');
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

const generatePermissionsFromRoutes = async (routesDir = 'src/routes', shouldSeed = false) => {
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

  // Deduplicate
  const uniquePermissions = Array.from(new Map(permissions.map((p) => [p.name, p])).values());

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
  } else {
    console.log(uniquePermissions);
  }
};

module.exports = generatePermissionsFromRoutes;
