const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = async (req, res) => {
  try {
    const { title, price, author, year } = req.body;
    const product = new Product(title, author, year, price);
    product.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

exports.getProduct = (_, res) => {
  Product.fetchAll((products) => {
    res.render("admin/list-product", {
      pageTitle: "My Products",
      products: products,
      path: "/admin/list-product",
    });
  });
};

exports.getEditProduct = (_, res) => {};
exports.editProduct = (_, res) => {};
exports.deleteProduct = (_, res) => {};
