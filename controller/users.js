const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const index = fs.readFileSync("index.html", "utf-8");
const users = data.users;

exports.getuser = (req, res) => {
  res.send(`${users}`);
  // res.json(`${data}`);
};

exports.createuser = (req, res) => {
  const user = req.body;
  users.push(user);
};

exports.findById = (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  res.json(user);
  // res.json(data);
};

exports.updateuser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((ur) => ur.id === id);
  users.splice(userIndex, 1, { ...req.body, id });
  res.json(users);
};

exports.updateuserPatch = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((pr) => pr.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.json(user);
};

exports.deleteuser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((pr) => pr.id === id);
  users.splice(userIndex, 1);
  res.json(users);
};
