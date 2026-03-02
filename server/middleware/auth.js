const {verifyToken}= require('../auth/jwt')


const authMiddleware = (req,res,next)=>{
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
      res.writeHead(401,{'Content-Type':'application/json'})
      res.end(JSON.stringify({ message: 'Authorization token missing' }))
    return;
    }
    
    const decoded = verifyToken(token)
    req.user = decoded;

    next()
  } catch (error) {
      res.writeHead(403,{'Content-Type':'application/json'})
      res.end(JSON.stringify({ message: 'Invalid or expired token' }))
      return;
  }
}

module.exports = authMiddleware