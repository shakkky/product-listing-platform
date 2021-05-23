const express = require("express");
const router = express.Router();
const { productController }  = require('../controllers/product-controller');

// GET request is made to /products
router.get("/products", productController);

module.exports = router;