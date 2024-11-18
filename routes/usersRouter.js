const express = require("express");
const userdata = require("../controller/users");
const router = express.Router();

// productRouter.get("/", (req, res) => {
//   res.send("<h1>Express</h1>");
//   // res.send(`${data}`);
// });
router
  .get("/", userdata.getuser)
  .post("/", userdata.createuser)
  .get("/:id", userdata.findById)
  .put("/:id", userdata.updateuser)
  .patch("/:id", userdata.updateuserPatch)
  .delete("/:id", userdata.deleteuser);

exports.routes = router;
