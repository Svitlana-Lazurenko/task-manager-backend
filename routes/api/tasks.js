const express = require("express");
const ctrl = require("../../controllers/tasks");
const {
  validateBody,
  isValidId,
  //   validateStatusBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/task");

const router = express.Router();

router.get("/", authenticate, ctrl.listTasks);

// router.get("/:id", authenticate, isValidId, ctrl.getTaskById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.addTask
);

router.delete("/:id", authenticate, isValidId, ctrl.removeTask);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addOrUpdateSchema),
  ctrl.updateTask
);

module.exports = router;
