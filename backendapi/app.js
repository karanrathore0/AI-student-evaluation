const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./database/connectDB')
const cookieParser = require('cookie-parser')
//token ko get karne ke liye
const cors = require('cors')


//cors   iske bina frontend ko connect nhinkar sakte
//backend api ko frontend se connect karne ke liye
//backend se data frontend me lane ke liye
app.use(
  cors({
    origin: "http://localhost:5173",  //react ka port
    credentials: true,
  })
)



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
