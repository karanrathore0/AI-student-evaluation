const Result = require('../models/result')

class StudentController {
    
    // STUDENT VIEW RESULTS FUNCTION: Ye function student ko sirf uske apne marks dikhane me kaam aata hai
    static async myResult(req, res) {
        try {
            // Role Check: Pata lagao ki marks mangne wala user 'student' hi hai ya koi aur?
            // Security ke liye: Teacher ko khud student dashboard API access nahi milna chahiye
            if(req.user.role !== "student"){
                return res.status(403).json({ message: "Unauthorized - Aap student nahi hain" })
            }
            
            // Database me sirf wo result dhoondho jisme 'student' ki ID req.user.id se match hoti ho
            // Isse guarantee milti hai ki student ko doosre bacho ke marks kabhi nahi dikhenge
            const results = await Result.find({
                student: req.user.id   // Login karne wale student ki ID match kar rahe hain
            })
            
            // Marks mil gaye, unhe wapas Frontend bhej do
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server me error aayi hai!" })
        }
    }
}

module.exports = StudentController