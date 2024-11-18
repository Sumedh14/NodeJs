const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const index = fs.readFileSync("index.html", "utf-8");
const product = data.products;

exports.getProduct = (req, res) => {
  res.send(`${data}`);
  // res.json(`${data}`);
};

exports.createProduct = (req, res) => {
  const product = req.body;
  product.push(product);
};

exports.findById = (req, res) => {
  const id = +req.params.id;
  const product = product.find((product) => product.id === id);
  res.json(product);
  // res.json(data);
};

exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = product.findIndex((pr) => pr.id === id);
  product.splice(productIndex, 1, { ...req.body, id });
  res.json(product);
};

exports.updateProductPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = product.findIndex((pr) => pr.id === id);
  const product = product[productIndex];
  product.splice(productIndex, 1, { ...product, ...req.body });
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = product.findIndex((pr) => pr.id === id);
  product.splice(productIndex, 1);
  res.json(product);
};
