
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const departmentValidation = require('../../validations/department.validation');
const departmentController = require('../../controllers/department.controller');

const router = express.Router();

// Route for creating a new department
router
  .route('/')
  .post(auth('create:department'), validate(departmentValidation.createDepartment), departmentController.createDepartment)
  .get(auth('view:department'), validate(departmentValidation.queryDepartments), departmentController.queryDepartments);

// Routes for fetching, updating, and deleting a department by ID
router
  .route('/:departmentId')
  .get(auth('view:department'), validate(departmentValidation.getDepartmentById), departmentController.getDepartmentById)
  .patch(
    auth('update:department'),
    validate(departmentValidation.updateDepartmentById),
    departmentController.updateDepartmentById
  )
  .delete(
    auth('delete:department'),
    validate(departmentValidation.deleteDepartmentById),
    departmentController.deleteDepartmentById
  );

// Route for importing departments
router
  .route('/import')
  .post(auth('import:department'), validate(departmentValidation.importDepartments), departmentController.importDepartments);

// Route for exporting departments
router
  .route('/export')
  .get(auth('export:department'), validate(departmentValidation.exportDepartments), departmentController.exportDepartments);

module.exports = router;
