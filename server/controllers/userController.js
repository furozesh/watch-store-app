const User = require("../models/User")
const getProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-__v")
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const updateProfile = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                fullName: req.body.fullName,
                nationalCode: req.body.nationalCode,
                email: req.body.email,
                gender: req.body.gender || null
            },
            {
                new: true,
            }
        )
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getProfile,
    updateProfile
}