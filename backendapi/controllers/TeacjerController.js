const Result = require('../models/result')

class TeacherController {

    //add result
    static async addResult(req, res) {
        try {
            //role check
            //security ke liye
            if(req.user.role !== "teacher"){
                return res.status(403).json({ message: "Unauthorized" })
            }
            //console.log(req.body)
            const { student, subject, marks } = req.body

            //bbasic validation
            if (!student || !subject || !marks) {
                return res.status(400).json({ message: "All fields are required" })
            }

            //grade logic
            let grade = ""
            if (marks >= 90) {
                grade = "A"
            } else if (marks >= 80) {
                grade = "B"
            } else if (marks >= 70) {
                grade = "C"
            } else if (marks >= 60) {
                grade = "D"
            } else {
                grade = "F"
            }

            const result = await Result.create({
                student,
                subject,
                marks,
                grade
            })

            res.status(201).json({ message: "Result added successfully", result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }




    //get all results
    static async allResult(req, res) {
        try {
            const results = await Result.find().populate("student", "name email")
            //populate use karna se user me jake student ka data leke aayega aur dega
            //agar populate use nahi karte to sirf student ki id aati

            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }
}


module.exports = TeacherController
