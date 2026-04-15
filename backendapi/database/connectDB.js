const mongoose = require('mongoose')


const  connectDB = async() => {
    try {
        const conn =await mongoose.connect('mongodb://127.0.0.1:27017/ai_student_evaluation');
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB