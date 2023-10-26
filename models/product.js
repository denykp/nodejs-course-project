const fs = require("fs");
const path = require("path");
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    Product.fetchAll((res) => {
      const products = [...res];
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.error(err);
      });
    });
  }

  static fetchAll(callbackFunction) {
    fs.readFile(filePath, (err, content) => {
      if (!err) {
        callbackFunction(JSON.parse(content));
      } else {
        callbackFunction([]);
      }
    });
  }
};
