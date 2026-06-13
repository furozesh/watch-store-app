const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
   createOrder,
   getMyOrders 
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

module.exports = router;