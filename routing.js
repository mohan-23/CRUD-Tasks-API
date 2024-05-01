const express = require("express");
const middleware = require("./middleware");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  userRegister,
  userLogin,
} = require("./controller.js");

router.get("/", getTasks, middleware);
router.get("/:id", getTask, middleware);
router.post("/", createTask, middleware);
//update a product
router.put("/:id", updateTask, middleware);
//Delete a product
router.delete("/:id", deleteTask, middleware);
router.post("/", userRegister);
router.post("/", userLogin);

module.exports = router;
