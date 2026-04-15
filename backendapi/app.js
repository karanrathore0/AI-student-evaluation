const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./database/connectDB')



//connect DB
connectDB()


//route load localhost:3000/api
app.use('/api',web)


app.listen(port, () => {
  console.log(`Server Start Localhost: ${port}`)
})
