const Product = require("../models/product");
const numFormat = require("../utils/numFormat");

exports.getProduct = (req, res) => {
  Product.findAll().then((products) => {
    res.render("shop/index", {
      pageTitle: "My Products",
      products: products.map((product) => {
        product.price = numFormat(product.price || 0);
        return product;
      }),
      path: "/",
    });
  });
};
exports.getProductDetail = (req, res) => {
  Product.findByPk(req.params.id).then((product) => {
    res.render("shop/product-detail", {
      pageTitle: product.name,
      product: product,
      path: `/`,
    });
  });
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "My Cart",
        products: products,
        path: "/cart",
      });
    })
    .catch(() =>
      res.render("shop/cart", {
        pageTitle: "My Cart",
        products: [],
        path: "/cart",
      })
    );
};
exports.postAddCart = (req, res) => {
  const { id, qty } = req.body;
  // req.user.createCart({ qty });
  let userCart;
  let newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      if (products.length > 0) {
        newQty = +products[0].cartItem.qty + +(qty || 1);
        return products[0];
      }
      return Product.findByPk(id).then((product) => {
        return product;
      });
    })
    .then((product) => {
      if (newQty > 0) {
        return userCart.addProduct(product, { through: { qty: newQty } });
      } else {
        return;
      }
    })
    .then(() => {
      res.redirect("/cart");
    });
  // const cart = new Cart(id, qty || 1);
  // cart.save();
};
exports.postDelCart = (req, res) => {
  const { id } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      if (products.length) {
        products[0].cartItem.destroy();
      }
    })
    .then(() => {
      res.redirect("/cart");
    });
};

exports.getOrder = (req, res) => {
  req.user.getOrders({ include: ["products"] }).then((orders) => {
    res.render("shop/order", {
      pageTitle: "My Cart",
      orders: orders.map((order) => {
        return {
          ...order,
          products: order.products.map((product) => {
            product.price = numFormat(product.price);
            product.orderItem.qty = numFormat(product.orderItem.qty);
            return product;
          }),
        };
      }),
      path: "/cart",
    });
  });
};
exports.postOrder = (req, res) => {
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      if (products.length) {
        return req.user.createOrder().then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { qty: product.cartItem.qty };
              return product;
            })
          );
        });
      } else {
        throw "no item in cart";
      }
    })
    .then(() => userCart.setProducts(null))
    .then(() => res.redirect("/order"))
    .catch((err) => res.redirect("cart"));
};
