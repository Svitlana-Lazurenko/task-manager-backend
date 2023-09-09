const express = require('express');
const ctrl = require('../../controllers/categories');
const {
  validateBody,
  isValidId,
  //   validateStatusBody,
  authenticate,
} = require('../../middlewares');
const { schemas } = require('../../models/category');

const router = express.Router();

router.get('/', authenticate, ctrl.listCategories);

// router.get("/:id", authenticate, isValidId, ctrl.getCategorieById);

router.post('/', authenticate, validateBody(schemas.addOrUpdateSchema), ctrl.addCategory);

router.delete('/:id', authenticate, isValidId, ctrl.removeCategory);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.updateCategory
);

module.exports = router;
