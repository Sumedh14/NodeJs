const express = require("express");
router = express.Router();
const auth = require("../controller/auth");

router.post("/", auth.createUser);

exports.router = router;
