require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const reviewRoutes = require('./routes/reviewRoutes')
const dashboardRoute = require("./routes/dashboardRoute")
const statsRoute = require("./routes/statsRoute")
const authRoutes = require("./routes/authRoute")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoute")
const orderRoutes = require("./routes/orderRoutes")
const userRoutes = require("./routes/userRoutes")
const addressRoutes = require("./routes/addressRoutes")
const adminReviewRoutes = require('./routes/adminReviewRoutes')
const app = express()
connectDB(); 

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use("/api/products" , productRoutes)
app.use("/api/auth" , authRoutes);  
app.use(
  "/uploads",
  express.static("uploads")
);
app.use(
    "/api/cart",
    cartRoutes
)
app.use(
    "/api/orders",
    orderRoutes
)
app.use(
    "/api/users",
    userRoutes
)
app.use(
    "/api/addresses",
    addressRoutes
)
app.use(
    "/api/stats",
    statsRoute
)
app.use(
    "/api/admin/dashboard",
    dashboardRoute
)
app.use(
    '/api/reviews',
    reviewRoutes
)
app.use(
    '/api/admin/reviews',
    adminReviewRoutes
)
console.log("env",process.env.JWT_SECRET)
app.listen(5000 , () => {
    console.log("Server Running")
})