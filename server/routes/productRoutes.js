const express = require("express")
const router = express.Router()
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts
} = require("../controllers/productControllers")

router.get("/", getProducts)
router.post("/", createProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

module.exports = router