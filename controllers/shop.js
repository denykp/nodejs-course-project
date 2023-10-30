const Product = require("../models/product");

exports.getProduct = (_, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "My Products",
      products: products,
      path: "/",
    });
  });
};

exports.getCart = (_, res) => {
  res.render("shop/cart", {
    pageTitle: "My Cart",
    // products: products,
    path: "/cart",
  });
};
exports.postAddChart = (_, res) => {};
exports.deleteChart = (_, res) => {};
