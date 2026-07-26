const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createReview,
    getProductReviews,
    getAllReviews,
    updateReviewStatus
} = require("../controllers/reviewController");

router.post(
    "/:productId",
    authMiddleware,
    createReview
);

router.get(
    "/:productId",
    getProductReviews
);

router.get(
    "/",
    authMiddleware,
    getAllReviews
);

router.patch(
    "/:id/status",
    authMiddleware,
    updateReviewStatus
);


module.exports = router;