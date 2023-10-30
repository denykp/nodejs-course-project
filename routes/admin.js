// const path = require("path");
// const rootDir = require("../utils/path");
const express = require("express");

const {
  getAddProduct,
  postAddProduct,
  getProduct,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/list-product", getProduct);

module.exports = router;
