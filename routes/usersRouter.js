const express = require("express");
const userdata = require("../controller/users");
const router = express.Router();

// productRouter.get("/", (req, res) => {
//   res.send("<h1>Express</h1>");
//   // res.send(`${data}`);
// });
router
  .get("/", userdata.getUser)
  .post("/", userdata.createUser)
  .get("/:id", userdata.findUserById)
  .put("/:id", userdata.replaceUser)
  .patch("/:id", userdata.updateUser)
  .delete("/:id", userdata.deleteUser);

exports.routes = router;
