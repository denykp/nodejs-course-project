const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

const { products } = require("./admin");

router.get("/", (_, res) => {
  console.log("products", products);
  res.render("shop", { pageTitle: "My Products", products: products });
});

module.exports = router;
