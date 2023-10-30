// const path = require("path");
// const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const { getProduct, getCart } = require("../controllers/shop");

router.get("/", getProduct);
router.get("/cart", getCart);

module.exports = router;
