const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const generateToken = (user)=>{
  try {
    if(!user){
      return Error('User data is required')
    }
    const token = jwt.sign({
      id:user.id,
      email:user.email,
      name:user.name
    }, SECRET,{
      expiresIn:'7d'
    })
    return token
  } catch (error) {
    return Error(error.message)
  }
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (error) {
    return Error(error.message)
  }
}

module.exports = { generateToken, verifyToken }