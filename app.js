const express = require('express')
const cors = require('cors')

const userRoute = require('./routes/userRoute')

module.exports = app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);


app.use('/',userRoute)


