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
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(
    "Product",
    productSchema
)