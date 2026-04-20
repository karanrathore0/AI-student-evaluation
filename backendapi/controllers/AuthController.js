const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    static register = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, password } = req.body

            // validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "all field are required"
                })
            }

            //check user already exist
            const userExist = await userModel.findOne({ email })
            if (userExist) {
                return res.status(400).json({
                    message: "user already exist"
                })
            }

            //password hash
            const hashpassword = await bcrypt.hash(password, 10)

            //create user
            const result = new userModel({
                name: name,
                email: email,
                // password:password     // password ko koi bhi check kar sakta th adek sakta tha isliye hash kiya
                password: hashpassword
            })

            //save user
            await result.save()     // result me save karne ke liye
            res.status(201).json({  //message shor karane ke liye
                message: "user insert success",
                user: {
                    id: result._id,
                    name: result.name,
                    email: result.email
                }
                //postman me hi dikhega teeno field message ke saath
            })

        } catch (error) {
            console.log(error)
        }
    }


    //login ko secure karne ke liye jsonwebtoken  
    //token generate karta hai 
    static login = async (req, res) => {
        try {
            const { email, password } = req.body

            // validation
            if (!email || !password) {
                return res.status(400).json({
                    message: "all field are required"
                })
            }

            //check user  exist
            const userExist = await userModel.findOne({ email })
            if (!userExist) {
                return res.status(400).json({
                    message: "invalid email or password"
                })
            }

            //password compare     password check
            const isMatch = await bcrypt.compare(password, userExist.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "invalid email or password"
                })
            }

            //generate jwt token
            const token = jwt.sign(
                { id: userExist._id , role:userExist.role }, 
                "karanrathore", { expiresIn: "1h" })    // 1h 1 hour ke liye 
                // "karanrathore"  secret key hai 

                res.status(200).json({
                    message:"login success",
                    token,
                    user:{
                        id:userExist._id,
                        name:userExist.name,
                        email:userExist.email,
                        role:userExist.role
                    }
                    //token id dega 
                    // aur baki sari detail 
                })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "internal server error"
            })
        }
    }

}


module.exports = AuthController