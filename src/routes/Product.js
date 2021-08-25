const express = require("express");
const { Product: validate } = require("../validators");
const { ProductController } = require("../controllers");

const { productValidate, productIdValidate } = validate;
const {
  addProduct,
  deleteProduct,
  fetchProduct,
  fetchAllProduct
} = ProductController;

const Product = express.Router();

Product.post("/fetch-all", fetchAllProduct);
Product.post("/fetch", productIdValidate(), fetchProduct);
Product.post("/add", productValidate(), addProduct);
Product.delete("/delete", productIdValidate(), deleteProduct);

module.exports = {
  Product
};
