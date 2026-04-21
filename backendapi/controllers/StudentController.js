const Result = require('../models/result')

class StudentController {
    
    //get all results
    static async myResult(req, res) {
        try {
            //role check
            //security ke liye
            if(req.user.role !== "student"){
                return res.status(403).json({ message: "Unauthorized" })
            }
            const results = await Result.find({
                //studet ke andar jake userid lekeaana hai
                student: req.user.id
            })
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "server error" })
        }
    }
}

module.exports = StudentController