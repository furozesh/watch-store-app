const Address = require("../models/Address")
const createAddress = async(req, res) => {
    try{
        const address= await Address.create({
            user: req.user.id,
            receiverName: req.body.receiverName,
            receiverPhone: req.body.receiverPhone,
            province: req.body.province,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode
        })
        res.status(201).json(address)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const getMyAddress = async(req, res) => {
    try{
        const addresses = await Address.find({
            user: req.user.id
        })
        res.status(200).json(addresses)
    }catch(error){
        res.status(500).json({
        message: error.message
    })
    } 
}

const deleteAddress = async(req, res) => {
    try{
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Deleted"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createAddress,
    getMyAddress,
    deleteAddress,
}