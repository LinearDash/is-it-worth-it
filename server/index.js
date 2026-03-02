const dontenv = require('dotenv')
dontenv.config()

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())



const router =require('./apis/routes')

app.use('/',router)

app.listen(PORT,()=>{
  console.log(`Server running http://localhost:${PORT}`)
})