
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const index = fs.readFileSync("index.html", "utf-8");


exports.getProduct = (req, res) => {
  res.send(`${data}`);
  // res.json(`${data}`);
};

exports.createProduct = (req, res) => {
  const product = req.body;
  data.push(product);
};

exports.findById = (req, res) => {
  const id = +req.params.id;
  const product = data.find((product) => product.id === id);
  res.json(product);
  // res.json(data);
};

exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1, { ...req.body, id });
  res.json(data);
};

exports.updateProductPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  const product = data[productIndex];
  data.splice(productIndex, 1, { ...product, ...req.body });
  res.json(data);
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1);
  res.json(data);
};

