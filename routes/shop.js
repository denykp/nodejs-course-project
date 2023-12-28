// const path = require("path");
// const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const {
  getProduct,
  getCart,
  getProductDetail,
  postAddCart,
  postDelCart,
  getOrder,
  postOrder,
} = require("../controllers/shop");

router.get("/", getProduct);

router.get("/cart", getCart);
router.post("/cart", postAddCart);
router.post("/delete-cart", postDelCart);

router.get("/product/:id", getProductDetail);

router.get("/order", getOrder);
router.post("/create-order", postOrder);

module.exports = router;
