const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
    createAddress,
    getMyAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController")

router.post(
    "/",
    authMiddleware,
    createAddress
)
router.get(
    "/",
    authMiddleware,
    getMyAddress
)
router.delete(
    "/:id",
    authMiddleware,
    deleteAddress
)
router.put(
    "/:id",
    authMiddleware,
    updateAddress
)
module.exports = router