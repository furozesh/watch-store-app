const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB