const express = require("express")
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
    addToCart,
    getCart,
    removeFromCart,
    getCartCount,
    updateCartQuantity,
    clearCart
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
router.patch(
    '/:productId',
    authMiddleware,
    updateCartQuantity
)
router.delete(
    '/',
    authMiddleware,
    clearCart
)
module.exports = router;