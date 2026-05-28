require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")

const authRoutes = require("./routes/authRoute")
const productRoutes = require("./routes/productRoutes")

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
console.log("env",process.env.JWT_SECRET)
app.listen(5000 , () => {
    console.log("Server Running")
})