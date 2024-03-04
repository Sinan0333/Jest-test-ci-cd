const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const connect = await mongoose.connect("mongodb+srv://sinanmp333:sinanat2005@mern.2xyblil.mongodb.net/MERN?retryWrites=true&w=majority")
        console.log('Databse connected');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports= connectDB