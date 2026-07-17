const Cart = require("../models/Cart")
const addToCart = async(req, res) => {
    try{
        const {productId} = req.body
        let cart = await Cart.findOne({
            user: req.user.id
        })
        if(!cart){
            cart = await Cart.create({
                user: req.user.id,
                items: [],
            });
        }
        const existingProduct = cart.items.find(item => item.product.toString() === productId);
        if(existingProduct){
            existingProduct.quantity += 1
        }else{
            cart.items.push({
                product: productId,
                quantity: 1,
            })
        }
        await cart.save();
        res.status(200).json({
            message: "Added To Cart",
            cart,
        })
        console.log("USER", req.user)
        await cart.save()
        console.log("CART SAVED:", cart)
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
const getCart = async(req, res) => {
    try{
        let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        const validItems = cart.items.filter(item => item.product !== null)
        if(validItems.length !== cart.items.length){
            cart.items = validItems;
            await cart.save()

            cart = await Cart.findOne({
                user: req.user.id
            }).populate("items.product")
        }
        res.status(200).json(cart)
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}
const removeFromCart = async(req, res) => {
    try{
        const cart = await Cart.findOne({
            user: req.user.id,
        })
        if(!cart) {
            return res.status(404).json({
                message: "Cart not founf"
            })
        }

        cart.items = cart.items.filter(item => item.product && item.product.toString() !== req.params.productId)
        await cart.save();

        res.status(200).json({
            message: "Removed"
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
const getCartCount = async(req, res) => {
    try{
        let cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product")
        if(!cart){
            return res.json({
                count: 0,
            })
        }
        const validItems = cart.items.filter(item => item.product)
        if(validItems.length !== cart.items.length){
            cart.items = validItems;
            await cart.save()
        }
        const count = validItems.reduce((sum , item) => sum + item.quantity, 0)
        res.json({count})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    getCartCount,
}