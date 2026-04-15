class AuthController {
    static register = async(req,res) => {
        try {
            res.send("register")
        } catch (error) {
            console.log(error)
        }
    }

    static login = async (req,res) => {
        try {
            res.send("login")
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = AuthController