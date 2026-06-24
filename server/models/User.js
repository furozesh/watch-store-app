const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user",
        },
        fullName: {
            type: String,
            default: ""
        },
        nationalCode: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            default: null
        },
        otp: String,
        otpExpires: Date,
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("User", userSchema)