const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("admin/save-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEdit: false,
  });
};
exports.postAddProduct = async (req, res) => {
  try {
    const { title, price, author, year } = req.body;
    const product = new Product(null, title, author, year, price);
    product.save();
    res.redirect("/admin/list-product");
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

exports.getEditProduct = (req, res) => {
  Product.findById(req.params.id, (product) => {
    res.render("admin/save-product", {
      pageTitle: `Edit Product | ${product.name}`,
      path: "/admin/edit-product",
      isEdit: true,
      product: product,
    });
  });
};
exports.postEditProduct = async (req, res) => {
  try {
    const { id, title, price, author, year } = req.body;
    const product = new Product(id, title, author, year, price);
    product.save();
    res.status(200).redirect("/admin/list-product");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.body.id, (products) => {
    res.render("admin/list-product", {
      pageTitle: "My Products",
      products: products,
      path: "/admin/list-product",
    });
  });
};
