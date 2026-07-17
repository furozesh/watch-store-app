const Product = require("../models/Product")
const User = require("../models/User")
const Order = require("../models/Order")
const SiteStats = require("../models/SiteStats")

const getDashboard = async(req, res) => {
    try{
        const visitors = await SiteStats.findOne();
        const totalVisitors = visitors ? visitors.totalVisits : 0
        const totalUsers = await User.countDocuments()
        const totalProduct = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()
        const outOfStock = await Product.countDocuments({
            stock: 0
        })
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ])
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
        const latestOrders = await Order.find()
            .populate("user", "fullName phone")
            .sort({
                createdAt: -1
            })
            .limit(5);
        res.status(200).json({
            visitors: totalVisitors,
            users: totalUsers,
            products: totalProduct,
            orders: totalOrders,
            outOfStock,
            revenue: totalRevenue,
            latestOrders
        })    
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getDashboard
}