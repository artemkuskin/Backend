require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose  = require('mongoose')
const router = require('./routers')
const errorMidlleware = require('./midllewares/error-midlleware')


const PORT = process.env.PORT || 5000
const app = express()

const corsOptions ={
  origin:'http://localhost:3002', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use('/api', router)
app.use(errorMidlleware)
const start = async () => {
  try {
   await  mongoose.connect('mongodb+srv://artem-kuskin:tamerlan2308@cluster0.nsl1wlu.mongodb.net/?retryWrites=true&w=majority')
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start()