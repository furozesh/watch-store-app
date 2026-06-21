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