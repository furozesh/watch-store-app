const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 1,
        },
        image: {
            type: String
        },
        category: {
            type: String,
            enum: ["classic", "smart", "sport"],
            required: true,
        },
        gender: {
            type: String,
            enum: [
                "men",
                "women",
                "unisex"
            ],
            default: "unisex"
        },
        rating:{
            type: Number,
            default: 0,
        },
        reviewsCount: {
            type: Number,
            default: 0
        },
        discountPercentage: {
            type: Number,
            default: 0
        },
        brand: {
            type: String,
            enum: ["Casio", "Rolex", "Seiko", "Citizen", "Apple", "Samsung"]
        }
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(
    "Product",
    productSchema
)