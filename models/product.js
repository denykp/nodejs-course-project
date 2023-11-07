const fs = require("fs");
const path = require("path");
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(id, title, author, year, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.price = price;
  }

  save() {
    Product.fetchAll((products) => {
      // const products = [...res];
      if (this.id) {
        const idx = products.findIndex((val) => val.id == this.id);
        products[idx] = this;
      } else {
        let lastId = Math.max(...products.map((val) => val.id)) || 0;
        lastId++;
        products.push({ ...this, id: lastId });
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

  static findById(id, callback) {
    Product.fetchAll((products) => {
      const product = products.find((val) => val.id == id);
      callback(product);
    });
  }

  static delete(id, callback) {
    Product.fetchAll((products) => {
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
