const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},   // student ki id aati hai
    subject: String,   // subject ka name
    marks: Number,     // marks
    grade: String      // grade
}, {timestamps: true})

module.exports = mongoose.model("Result", resultSchema)