const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const {
   createOrder,
   getMyOrders, 
   getAllOrders,
   updateOrderStatus
} = require("../controllers/orderController")

router.post(
    "/",
    authMiddleware,
    createOrder
);
router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
)
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllOrders
)
router.put(
    "/admin/:id",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
)
module.exports = router;