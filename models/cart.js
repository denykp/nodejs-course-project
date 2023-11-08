const fs = require("fs");
const path = require("path");
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

const Product = require("./product");

module.exports = class Cart {
  constructor(id, qty) {
    this.id = id;
    this.qty = qty;
  }

  save() {
    Cart.fetchAll((products) => {
      const idx = products.findIndex((val) => val.id == this.id);
      if (idx >= 0) {
        products[idx].qty = +products[idx].qty + +this.qty;

        if (products[idx].qty < 1) {
          products.splice(idx, 1);
        }
      } else {
        products.push({ ...this, qty: 1 });
      }
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) console.error("err", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, content) => {
      if (!err) {
        callback(JSON.parse(content));
      } else {
        callback([]);
      }
    });
  }

  static fetchAllDetail(callback) {
    Cart.fetchAll((productsChart) => {
      Product.fetchAll((products) => {
        const result = [];
        for (const product of productsChart) {
          const productDetail = products.find((val) => val.id == product.id);
          console.log(product, productDetail);
          result.push({
            ...product,
            title: productDetail.title,
            price: productDetail.price,
            author: productDetail.author,
            year: productDetail.year,
          });
        }
        callback(result);
      });
    });
  }

  static delete(id, callback) {
    Cart.fetchAll((products) => {
      const idx = products.findIndex((val) => val.id == id);
      const newList = [...products];
      if (idx >= 0) {
        newList.splice(idx, 1);
      }
      fs.writeFile(filePath, JSON.stringify(newList), (err) => {
        if (err) console.error("err", err);
      });
      callback(newList);
    });
  }
};
