const express = require("express");
router = express.Router();
const auth = require("../controller/auth");

router.post("/signUp", auth.signUp).post("/login", auth.login);

exports.router = router;
