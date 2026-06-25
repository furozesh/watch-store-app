const express = require("express")
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
    addToCart,
    getCart,
    removeFromCart,
    getCartCount
} = require('../controllers/cartController')

router.post(
    "/add",
    authMiddleware,
    addToCart
)
router.get(
    "/",
    authMiddleware,
    getCart
)
router.delete(
    "/:productId",
    authMiddleware,
    removeFromCart
)
router.get(
    "/count",
    authMiddleware,
    getCartCount
)

module.exports = router;