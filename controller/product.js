const model = require("../models/productSchema");
const Product = model.Product;

// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// // const index = fs.readFileSync("index.html", "utf-8");
// const product = data.products;

exports.createProduct = (req, res) => {
  const data = req.body;
  const product = new Product(data);
  product.save();
  res.status(201).json(res.body);
};

exports.findById = async (req, res) => {
  const id = +req.params.id;
  try {
    const product = await Product.find({ id: id }).exec();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err });
  }

  // const product = product.find((product) => product.id === id);
  // res.json(product);
  // res.json(data);
};

exports.updateProduct = async (req, res) => {
  const id = +req.params.id;
  const data = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, data);
    res.status(204).json(product);
  } catch (err) {
    res.status(400).json({ err });
  }
  // const productIndex = product.findIndex((pr) => pr.id === id);
  // product.splice(productIndex, 1, { ...req.body, id });
  // res.json(product);
};

exports.updateProductPatch = (req, res) => {
  // const id = +req.params.id;
  // const productIndex = product.findIndex((pr) => pr.id === id);
  // const product = product[productIndex];
  // product.splice(productIndex, 1, { ...product, ...req.body });
  // res.json(product);
};

exports.deleteProduct = (req, res) => {
  // const id = +req.params.id;
  // const productIndex = product.findIndex((pr) => pr.id === id);
  // product.splice(productIndex, 1);
  // res.json(product);
};
