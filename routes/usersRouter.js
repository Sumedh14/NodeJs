const express = require("express");
router = express.Router();
const userData = require("../controller/users");

// .post("/", userData.createUser)

router
  .get("/", userData.getUsers)
  .get("/:id", userData.findUserById)
  .put("/:id", userData.replaceUser)
  .patch("/:id", userData.updateUser)
  .delete("/:id", userData.deleteUser);

exports.router = router;
