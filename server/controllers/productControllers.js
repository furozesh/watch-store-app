const Product = require("../models/Product")

const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            gender: req.body.gender,
            image: req.file ? req.file.filename: "",
            brand: req.body.brand,
            discountPercentage: req.body.discountPercentage
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
        const {category, gender, minPrice, maxPrice, brand, inStock, discount, search, sort, page= 1, limit=9,} = req.query
        let filter = {}
        if(category){
            filter.category = category
        }
        if(gender){
            filter.gender = gender
        }
        if(brand){
            filter.brand = brand
        }
        if(search){
            filter.title = {
                $regex: search,
                $options: "i"
            }
        }
        if(minPrice || maxPrice) { 
            filter.price = {}
            if(minPrice){
                filter.price.$gte= Number(minPrice)
            }
            if(maxPrice){
                filter.price.$lte = Number(maxPrice)
            }
        }
        if(inStock === "true"){
            filter.stock = {$gt: 0}
        }
        if(discount === "true"){
            filter.discountPercentage = {$gt: 0}
        }
        const currentPage = Number(page)
        const pageSize = Number(limit)

        const totalProducts = await Product.countDocuments(filter)
        let sortOption = {
            createdAt: -1
        }
        switch(sort){
            case 'price_asc':
                sortOption = {
                    price: 1,
                }
                break;
            case 'price_desc':
                sortOption = {
                    price: -1,
                }  
                break;
            case 'rating': 
                sortOption = {
                    rating: -1,
                } 
                break;
            case 'newest':
                sortOption = {
                    createdAt: -1,
                }
                break;       
          
        }
        const products = await Product.find(filter)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .sort(sortOption)
        res.status(200).json({
            products,
            currentPage,
            totalPages: Math.max(1, Math.ceil(totalProducts / pageSize)),
            totalProducts,
        });
    }
    catch(error){
        console.log(error)
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
const SearchProducts = async (req, res) => {
    try{
        const query = req.query.query || "";
        const products = await Product.find({
            title: {
                $regex: query,
                $options: "i"
            },
        })
        .select("title image")
        .limit(5)

        res.status(200).json(products);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct,
    SearchProducts
}