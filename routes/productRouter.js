const express = require("express");
const productdata = require("../controller/product");
const router = express.Router();

router
  .post("/", productdata.createProduct)
  .get("/:id", productdata.findById)
  .put("/:id", productdata.updateProduct)
  .patch("/:id", productdata.updateProductPatch)
  .delete("/:id", productdata.deleteProduct);

exports.router = router;
