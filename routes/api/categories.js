const express = require('express');
const ctrl = require('../../controllers/categories');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/category');

const router = express.Router();

router.get('/', authenticate, ctrl.listCategories);

router.post('/', authenticate, validateBody(schemas.addOrUpdateSchema), ctrl.addCategory);

router.delete('/:id', authenticate, isValidId, ctrl.removeCategory);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.updateCategory
);

module.exports = router;
