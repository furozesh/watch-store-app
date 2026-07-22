const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { createReview , getProductReviews } = require("../controllers/reviewController")

router.post(
    '/:productId',
    authMiddleware,
    createReview
)

router.get(
    '/:productId',
    getProductReviews
)

module.exports = router