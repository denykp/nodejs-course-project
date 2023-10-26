// const path = require("path");
// const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const { getProduct } = require("../controllers/products");

router.get("/", getProduct);

module.exports = router;
