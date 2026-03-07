const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const passport = require('./auth/passport')
const path = require('path')

const app = express()
const PORT = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client')))
app.use(passport.initialize())


const router =require('./apis/routes')

app.use('/',router)

app.listen(PORT,()=>{
  console.log(`Server running http://localhost:${PORT}`)
})