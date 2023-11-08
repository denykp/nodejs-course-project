// const path = require("path");
// const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const {
  getProduct,
  getCart,
  getProductDetail,
  postAddChart,
} = require("../controllers/shop");

router.get("/", getProduct);

router.get("/cart", getCart);
router.post("/cart", postAddChart);

router.get("/product/:id", getProductDetail);

module.exports = router;
