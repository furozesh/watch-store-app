const express = require("express")
const router = express.Router()
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts
} = require("../controllers/productControllers")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const upload = require("../middleware/uploadMiddleware")

router.get("/", getProducts)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct
);
router.delete(
  "/:id", 
  authMiddleware,
  adminMiddleware,
  deleteProduct
)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
)

module.exports = router