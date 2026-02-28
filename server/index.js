const dontenv = require('dotenv')
dontenv.config()

const http = require('http')

const PORT = process.env.PORT

const router =require('./apis/routes')



const server = http.createServer((req,res)=>{

  res.writeHead(200,{'Content-Type':'text/plain'})
  router(req,res)
  
  
})

server.listen(PORT,()=>{
  console.log(`Server running on Port:${PORT}`)
})