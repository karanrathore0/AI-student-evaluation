//security ke liye 
//take teacher hi sirf student ko add kar sake
//student hi sirf apna result dekh sake

const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    //token ko check karne ke liye
    const token = req.cookies?.token    //cookie se token leke token me daalke check karega
    //agar token nahi hai to unauthorized show karega
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
     const decoded = jwt.verify(token, "karanrathore")
     console.log(decoded)
        req.user = decoded
        next()
        //next() se aage badhega wapas web pe bhej dega
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

module.exports = auth