const model = require("../models/userSchema");
const User = model.User;

const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  const data = req.body;
  console.log(data);
  const token = jwt.sign({ email: req.body.email }, "asdfghjkl");
  try {
    const user = new User(data);
    user.token = token;
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
