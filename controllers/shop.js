const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProduct = (_, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "My Products",
      products: products,
      path: "/",
    });
  });
};
exports.getProductDetail = (req, res) => {
  Product.findById(req.params.id, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.name,
      product: product,
      path: `/`,
    });
  });
};

exports.getCart = (_, res) => {
  Cart.fetchAllDetail((products) => {
    res.render("shop/cart", {
      pageTitle: "My Cart",
      products: products,
      path: "/cart",
    });
  });
};
exports.postAddChart = (req, res) => {
  const { id, qty } = req.body;
  const cart = new Cart(id, qty || 1);
  cart.save();
  res.redirect("/cart");
};
exports.postDelChart = (_, res) => {};
