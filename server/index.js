require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")

const authRoutes = require("./routes/authRoute")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoute")
const orderRoutes = require("./routes/orderRoutes")
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
console.log("env",process.env.JWT_SECRET)
app.listen(5000 , () => {
    console.log("Server Running")
})