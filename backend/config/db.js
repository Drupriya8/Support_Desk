const mongoose = require('mongoose')

const connectDB = async() => {
    mongoose.set('strictQuery', true);
    let conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected : ${conn.connection.host}`.green.underline)
}


module.exports = connectDB