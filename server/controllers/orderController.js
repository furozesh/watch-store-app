const Order = require("../models/Order")
const Cart = require("../models/Cart")

const createOrder = async(req, res) => {
    try{
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
        const order = await Order.create({
            user: req.user.id,
            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice,
        })
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
        const orders = await Order.find({user: req.user.id}).populate("items.product").sort({createdAt: -1,})
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
const getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find().populate("user").populate("items.product").sort({
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