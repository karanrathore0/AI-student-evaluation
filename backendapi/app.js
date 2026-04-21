const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./database/connectDB')
const cookieParser = require('cookie-parser')
//token ko get karne ke liye


//connect DB
connectDB()

//cookie parser
app.use(cookieParser())

//data get json
//data ko get karne kae liye postman se ya react se
app.use(express.json())


//route load localhost:3000/api
app.use('/api',web)


app.listen(port, () => {
  console.log(`Server Start Localhost: ${port}`)
})
