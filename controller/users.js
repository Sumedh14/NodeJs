const model = require("../models/userSchema");
const User = model.User;

// const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// exports.createUser = (req, res) => {
//   const data = req.body;
//   console.log(data);
//   const token = jwt.sign({ email: req.body.email }, "asdfghjkl");
//   try {
//     const user = new User(data);
//     user.token = token;
//     user.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.findUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findByIdAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
