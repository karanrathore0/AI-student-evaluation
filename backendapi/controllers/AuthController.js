const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    
    // REGISTER FUNCTION: Naya account banane (Student ya Teacher) ke liye
    static register = async (req, res) => {
        try {
            // Frontend se aane wale form data ko catch kar rahe hain
            const { name, email, password, role } = req.body

            // Validation: Agar user ne koi box khali chhod diya to error bhej do
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Sari fields bharna zaruri hai!" })
            }

            // Check karo ki is Email se pehle se koi account to nahi hai?
            const userExist = await userModel.findOne({ email })
            if (userExist) {
                return res.status(400).json({ message: "Ye Email pehle se maujud hai!" })
            }

            // Password Security: Password ko seedha save karne ke bajaye "hash" kardo (taki koi hack karke password padh na sake)
            const hashpassword = await bcrypt.hash(password, 10)

            // Naye User ka format (Model) ready kar rahe hain
            const result = new userModel({
                name: name,
                email: email,
                role: role || "student", // Agar role nahi bataya, to default 'student' maan lenge
                password: hashpassword   // Original ki jagah hashed (surakshit) password
            })

            // Database (MongoDB) me naye User ko permanently save kar do
            await result.save()     
            
            // Success message frontend (React) waalo ko bhej do
            res.status(201).json({  
                message: "Account successfully ban gaya!",
                user: {
                    id: result._id,
                    name: result.name,
                    email: result.email
                }
            })

        } catch (error) {
            console.log(error)
        }
    }


    // LOGIN FUNCTION: Puraane user ko andar aane (login) dene ke liye
    static login = async (req, res) => {
        try {
            // Frontend login form se aayi email aur password le rahe hain
            const { email, password } = req.body

            // Validation: Kuch khali to nahi chuta?
            if (!email || !password) {
                return res.status(400).json({ message: "Email aur password likhna zaruri hai!" })
            }

            // Database me dhoondho ki is email wala koi user hai kya?
            const userExist = await userModel.findOne({ email })
            
            // Agar email kisi ki nahi mili, toh error do
            if (!userExist) {
                return res.status(400).json({ message: "Galat Email ya Password!" })
            }

            // Password Check: Jo password user laya hai, aur jo database me bcrypt hash password hai usko compare karo
            const isMatch = await bcrypt.compare(password, userExist.password)
            
            // Agar dono match nahi hue, to Password galat hai bol do
            if (!isMatch) {
                return res.status(400).json({ message: "Galat Email ya Password!" })
            }

            // LOGIN SECURITY (JSON Web Token - JWT)
            // JWT token banate hain 'karanrathore' secret key ki madad se. 
            // Ye Token user ki pehchan (ID ticket) ki tarah kaam karega agle 1 ghante(1h) tak!
            const token = jwt.sign(
                { id: userExist._id, role: userExist.role },
                "karanrathore", { expiresIn: "1h" })  

            // Is Token Ticket ko sidha user ke Browser (Cookie) me save karwa do!
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Kyunki localhost (HTTP) pe chala rahe hain isliye false, live server (HTTPS) pe true rakhte hain
                sameSite: "lax",
            })

            // Login successful hone par saara jaruri data User ko de do (taki wo Dashboard bna sake)
            res.status(200).json({
                message: "Login successful ho gaya!",
                token,
                user: {
                    id: userExist._id,
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Koi technical error aayi hai server me!" })
        }
    }

}


module.exports = AuthController