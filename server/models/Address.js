const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverName: {
            type: String,
            required: true,
        },
        receiverPhone: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model(
    "Address",
    addressSchema
)