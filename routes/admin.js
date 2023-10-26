// const path = require("path");
// const rootDir = require("../utils/path");
const express = require("express");

const { getAddProduct, postAddProduct } = require("../controllers/products");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = router;
