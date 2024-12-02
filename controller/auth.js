const model = require("../models/userSchema");
const User = model.User;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");

const privasteKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf8"
);

exports.signUp = (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const token = jwt.sign({ email: req.body.email }, privasteKey, {
      algorithm: "RS256",
    });

    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new User(data);
    user.password = hash;
    user.token = token;
    user.save();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    const veriable = bcrypt.compareSync(req.body.password, user.password);
    if (veriable) {
      const token = jwt.sign({ email: email }, privasteKey, {
        algorithm: "RS256",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: err });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
