const Product = require("../models/product");
const numFormat = require("../utils/numFormat");

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
    await req.user.createProduct({ title, author, year, price });
    // const product = new Product();
    // product.save();
    res.redirect("/admin/list-product");
  } catch (error) {
    console.error(error);
  }
};

exports.getProduct = (req, res) => {
  req.user.getProducts().then((products) => {
    res.render("admin/list-product", {
      pageTitle: "My Products",
      products: products.map((product) => {
        product.price = numFormat(product.price || 0);
        return product;
      }),
      path: "/admin/list-product",
    });
  });
};

exports.getEditProduct = (req, res) => {
  Product.findByPk(req.params.id).then((product) => {
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
    Product.findByPk(id)
      .then((product) => {
        product.title = title;
        product.price = price;
        product.author = author;
        product.year = year;
        return product.save();
      })
      .then(() => res.status(200).redirect("/admin/list-product"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
};

exports.deleteProduct = (req, res) => {
  Product.destroy({ where: { id: req.body.id } })
    .then(() => res.redirect("/admin/list-product"))
    .catch((err) => console.log(err));
};
