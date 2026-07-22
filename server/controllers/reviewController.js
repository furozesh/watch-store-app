const Review = require('../models/Review')
const Order = require('../models/Order')
const createReview = async(req , res) => {
    try{
        const { rating , comment } = req.body;
        const productId = req.params.productId
        const hasBought = await Order.findOne({
            user: req.user.id,
            "items.product": productId,
        });
        if(!hasBought){
            return res.status(403).json({
                message: "فقط خریداران این محصول می‌توانند نظر ثبت کنند."
            })
        }
        const existingReview = await Review.findOne({
            user: req.user.id,
            product: productId,
        });
        if(existingReview){
            return res.status(400).json({
                message: 'شما قبلا برای این محصول نظر ثبت کردید',
            })
        }
        const review = await Review.create({
            user: req.user.id,
            product: productId,
            rating,
            comment
        });
        res.status(201).json({
            message: 'نظر شما ثبت شد و بعد از تایید نمایش داده می‌شود.',
            review
        });
    } catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const getProductReviews = async(req, res) => {
    try{
        const reviews = await Review.find({
            product: req.params.productId,
            status: 'approved'
        }).populate("user", "fullName phone")
        .sort({createdAt: -1})

        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllReviews = async(req, res) => {
    try{
        const reviews = await Review.find()
        .populate('user', 'fullName')
        .populate('product', 'title')
        .sort({createdAt: -1})
        res.json(reviews)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const updateReviewStatus = async(req, res) => {
    try{
        const {status} = req.body;
        if(!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                message: 'وضعیت نامعتبر است.'
            })
        }
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {status: req.body.status},
            {new: true}
        )
        .populate('user', 'fullName')
        .populate('product', 'title');

        if(!receive) {
            return res.status(404).json({
                message: 'نظر مورد نظر پیدا نشد.'
            });
        }

        res.status(200).json({
            message: 'وضعیت نظر با موفقیت تغییر کرد.',
            review
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    createReview,
    getProductReviews,
    getAllReviews,
    updateReviewStatus
}