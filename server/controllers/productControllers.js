const Product = require("../models/Product")

const createProduct = async (req, res) => {
    try {

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            image: req.file ? req.file.filename: "",
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

const getProducts = async(req , res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

const deleteProduct = async(req , res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Product Deleted."
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProduct = async (req , res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(updatedProduct)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getProductByID = async(req , res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(
            product
        )
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}
module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct,
}