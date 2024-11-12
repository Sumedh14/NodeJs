
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const getProduct = (req, res) => {
  res.send(`${data}`);
  // res.json(`${data}`);
};

const createProduct = (req, res) => {
  const product = req.body;
  data.push(product);
};

const findById = (req, res) => {
  const id = +req.params.id;
  const product = data.find((product) => product.id === id);
  res.json(product);
  // res.json(data);
};

const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1, { ...req.body, id });
  res.json(data);
};

const updateProductPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  const product = data[productIndex];
  data.splice(productIndex, 1, { ...product, ...req.body });
  res.json(data);
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1);
  res.json(data);
};

export {
  getProduct,
  deleteProduct,
  updateProductPatch,
  updateProduct,
  findById,
  createProduct,
};
