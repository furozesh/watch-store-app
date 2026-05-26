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
        otp: String,
        otpExpires: Date,
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("User", userSchema)