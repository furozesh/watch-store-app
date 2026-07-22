const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const {
    getAllReviews,
    updateReviewStatus
} = require('../controllers/reviewController')

router.get(
    '/',
    authMiddleware,
    adminMiddleware,
    getAllReviews
)

router.patch(
    '/:id',
    authMiddleware,
    adminMiddleware,
    updateReviewStatus
)

module.exports = router