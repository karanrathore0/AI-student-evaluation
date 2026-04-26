const Result = require('../models/result')

class TeacherController {

    // 1. ADD RESULT FUNCTION: Ye function bachcho ke marks database me save karta hai
    static async addResult(req, res) {
        try {
            // Check kar rahe hain ki aane wali request 'Teacher' ne hi bheji hai na?
            // Security ke liye: Agar koi student khud ke marks daalne ki koshish kare, to mana kardo (403 Error)
            if(req.user.role !== "teacher"){
                return res.status(403).json({ message: "Unauthorized - Sirf Teacher marks add kar sakte hain" })
            }

            // Frontend form se aane wala data (Student ID, Subject aur Marks) catch kar rahe hain
            const { student, subject, marks } = req.body

            // Basic validation: Check karo ki teacher ne galti se koi field khali to nahi chhod di?
            if (!student || !subject || !marks) {
                return res.status(400).json({ message: "Sari fields parna zaruri hai!" })
            }

            // Grade Logic: Marks ke hisaab se automatic ABCD grade tay karna
            let grade = ""
            if (marks >= 90) {
                grade = "A" // 90 ya usse zada pe A grade
            } else if (marks >= 80) {
                grade = "B"
            } else if (marks >= 70) {
                grade = "C"
            } else if (marks >= 60) {
                grade = "D"
            } else {
                grade = "F" // 60 se kam pe Fail (F)
            }

            // Database (MongoDB) me naya Result create/save kar rahe hain
            const result = await Result.create({
                student, // Kis student ka result hai uski Mongo ID
                subject, // Konsa subject hai
                marks,   // Kitne number hain
                grade    // Jo grade upar calculate kiya wo attach kar diya
            })

            // Agar sab sahi se save ho gaya, to frontend (React) ko Success message bhej do
            res.status(201).json({ message: "Result successully add ho gaya!", result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server me kuch error aayi hai!" })
        }
    }


    // 2. GET ALL RESULTS FUNCTION: Ye function database se saare marks mangwata hai
    static async allResult(req, res) {
        try {
            // Result.find() se MongoDB me jitne bhi results hain sab bahar aa jayenge
            // Populate("student") use karna bahut zaroori hai! 
            // Isse result ke andar student ki sirf 'ID' nahi, uska naam aur email waghaira nikal kar aa jayega.
            const results = await Result.find().populate("student", "name email")

            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server me kuch error aayi hai!" })
        }
    }

    // 3. GET ALL STUDENTS FUNCTION: Ye function dashboard dropdown ke liye saare students ki list nikalta hai
    static async getAllStudents(req, res) {
        try {
            const User = require('../models/user');
            
            // Database me sirf un users ko dhundho jinka role "student" hai. 
            // select("-password") ka matlab hai password mat lana (security ke liye, password chupake rakho)
            const students = await User.find({ role: "student" }).select("-password");
            
            res.status(200).json(students);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server me error aayi hai!" });
        }
    }
}


module.exports = TeacherController
