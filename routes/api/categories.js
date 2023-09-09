const express = require("express");
const ctrl = require("../../controllers/categories");
const {
  validateBody,
  isValidId,
  //   validateStatusBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/categorie");

const router = express.Router();

router.get("/", authenticate, ctrl.listCategories);

// router.get("/:id", authenticate, isValidId, ctrl.getCategorieById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.addCategorie
);

router.delete("/:id", authenticate, isValidId, ctrl.removeCategorie);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.updateCategorie
);

module.exports = router;
