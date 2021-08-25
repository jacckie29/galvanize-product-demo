const { Product } = require("./Product");
const { ErrorPage } = require("./ErrorPage");

const Routes = [
  { path: "/product", router: Product },
  { path: "/", router: ErrorPage }
];

module.exports = {
  Routes
};
