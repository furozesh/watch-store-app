const User = require("../models/User");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({ phone });
        }

        user.otp = otp;
        user.otpExpires = Date.now() + 2 * 60 * 1000;
        await user.save();

        console.log("OTP:", otp);

        return res.status(200).json({
            message: "OTP sent",
            otp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            "SECRET_KEY",
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
};
