const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected to ${(await conn).connection.host}`);
        
    } catch (error) {
        throw error
        process.exit(1)
    }
}

module.exports = connectDB