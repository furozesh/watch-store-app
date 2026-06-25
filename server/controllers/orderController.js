const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Address = require("../models/Address")

const createOrder = async(req, res) => {
    try{
        const {addressId} = req.body
        const address = await Address.findById(addressId)
        if(!address){
            return res.status(404).json({
                message: "Address not found."
            })
        }
        const cart = await Cart.findOne({
            user: req.user.id,
        }).populate(
            "items.product"
        );
        if(!cart || cart.items.length === 0){
            return res.status(400).json({
                message: "Cart is Empty."
            })
        }
        const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        for(const item of cart.items){
            if(item.quantity > item.product.stock){
                return res.status(400).json({
                    message: `${item.product.title} موجودی کافی ندارد.`
                })
            }
        }
        const order = await Order.create({
            user: req.user.id,
            address: addressId,
            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice,
        })
        for (const item of cart.items){
            item.product.stock -= item.quantity
            await item.product.save()
        }
        cart.items = [];
        await cart.save()
        res.status(201).json(order)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
const getMyOrders = async(req, res) => {
    try{
        const orders = await Order.find({user: req.user.id})
        .populate("items.product")
        .populate("address")
        .sort({createdAt: -1,})
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
const getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find().populate("user").populate("items.product").populate("address").sort({
            createdAt: -1,
        })
        res.status(200).json(
            orders
        )
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const updateOrderStatus = async(req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true,
            }
        )
        res.status(200).json(order)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
}