const express = require('express');
const ctrl = require('../../controllers/tasks');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/task');

const router = express.Router();

router.get('/:id', authenticate, ctrl.listTasks);

router.post('/:id', authenticate, validateBody(schemas.addOrUpdateSchema), ctrl.addTask);

router.delete('/:id', authenticate, isValidId, ctrl.removeTask);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.updateTask
);

module.exports = router;
