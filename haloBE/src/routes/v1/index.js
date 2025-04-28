const express = require('express');
const appRoute = require('./app.route');
const authRoute = require('./auth.route');
const dataRoute = require('./data.route');
const docsRoute = require('./docs.route');
const levelRoute = require('./level.route');
const nodeRoute = require('./node.route');
const paymentRoute = require('./payment.route');
const permissionRoute = require('./permission.route');
const roleRoute = require('./role.route');
const structureRoute = require('./structure.route');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const captureRoute = require('./capture.route');
const departmentRoute = require('./department.route');
const eventRoute = require('./event.route');
const eventConfigRoute = require('./eventConfig.route');
const programRoute = require('./program.route');
const reportRoute = require('./report.route');
const settingsRoute = require('./settings.route');
const statementRoute = require('./statement.route');
const collectionRoute = require('./collection.route');

// declare rest of the routes: nodeLevel, nodeStructure, node etc.
const config = require('../../config/config');

const router = express.Router();

// Routes that are always available
const defaultRoutes = [
  {
    path: '/auth', // Example: /auth/login, /auth/register
    route: authRoute,
  },
  {
    path: '/users', // Example: /users/123, /users/profile
    route: userRoute,
  },
  {
    path: '/roles', // Example: /roles/123, /roles/info
    route: roleRoute,
  },
  {
    path: '/permissions', // Example: /permissions/123, /permissions/info
    route: permissionRoute,
  },
  {
    path: '/data', // Example: /data/123, /data/info
    route: dataRoute,
  },
  {
    path: '/app', // Example: /app/123, /app/info
    route: appRoute,
  },
  {
    path: '/level', // Example: /level/123, /level/info
    route: levelRoute,
  },
  {
    path: '/payment', // Example: /payment/123, /payment/info
    route: paymentRoute,
  },
  {
    path: '/structure', // Example: /structure/123, /structure/info
    route: structureRoute,
  },
  {
    path: '/node', // Example: /node/123, /node/info
    route: nodeRoute,
  },
  {
    path: '/admin', // Example: /admin/123, /admin/info
    route: adminRoute,
  },
  {
    path: '/capture', // Example: /capture/123, /capture/info
    route: captureRoute,
  },
  {
    path: '/department', // Example: /department/123, /department/info
    route: departmentRoute,
  },
  {
    path: '/event', // Example: /event/123, /event/info
    route: eventRoute,
  },
  {
    path: '/eventConfig', // Example: /eventConfig/123, /eventConfig/info
    route: eventConfigRoute,
  },
  {
    path: '/program', // Example: /program/123, /program/info
    route: programRoute,
  },
  {
    path: '/report', // Example: /report/123, /report/info
    route: reportRoute,
  },
  {
    path: '/settings', // Example: /settings/123, /settings/info
    route: settingsRoute,
  },
  {
    path: '/statement', // Example: /statement/123, /statement/info
    route: statementRoute,
  },
  {
    path: '/collections',
    route: collectionRoute,
  },
];

// Routes only available during development
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs', // Example: /docs shows API documentation
    route: docsRoute,
  },
];

// Set up all the regular routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Set up development routes only if we're in development mode
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

router.use('/admin', adminRoute);
router.use('/captures', captureRoute);
router.use('/collections', collectionRoute);
router.use('/departments', departmentRoute);

module.exports = router;
