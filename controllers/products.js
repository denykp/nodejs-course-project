const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("add-product", { pageTitle: "Add Product" });
};

exports.postAddProduct = async (req, res) => {
  try {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

exports.getProduct = (_, res) => {
  Product.fetchAll((products) => {
    res.render("shop", { pageTitle: "My Products", products: products });
  });
};
