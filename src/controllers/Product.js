const { ProductModel } = require("../models");

async function addProduct(req, res) {
  const { body } = req;
  const data = await ProductModel.addProduct(body);
  let statusCode = 200;
  if (data === "No Record Inserted") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "succes",
    data
  });
}

async function deleteProduct(req, res) {
  const { body } = req;
  const data = await ProductModel.deleteProduct(body);
  let statusCode = 200;
  if (data === "No Record Found") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "succes",
    data
  });
}

async function fetchProduct(req, res) {
  const { body } = req;
  const data = await ProductModel.fetchProduct(body);
  let statusCode = 200;
  if (data === "No Record Found") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "succes",
    data
  });
}

async function fetchAllProduct(req, res) {
  const { body } = req;
  const data = await ProductModel.fetchAllProduct(body);
  let statusCode = 200;
  if (data === "No Record Found") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "succes",
    data
  });
}

const ProductController = {
  addProduct,
  deleteProduct,
  fetchProduct,
  fetchAllProduct
};

module.exports = {
  ProductController
};
