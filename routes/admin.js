// const path = require("path");
// const rootDir = require("../utils/path");
const express = require("express");

const {
  getAddProduct,
  postAddProduct,
  getProduct,
  deleteProduct,
  getEditProduct,
  postEditProduct,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);
router.post("/add-product", postAddProduct);
router.get("/edit-product/:id", getEditProduct);
router.post("/edit-product", postEditProduct);

router.get("/list-product", getProduct);
router.post("/delete-product", deleteProduct);

module.exports = router;
