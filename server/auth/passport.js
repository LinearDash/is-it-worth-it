const passport = require('passport')
const {createUser,findUserByGoogleId}= require('../storage/users')


const {Strategy} = require('passport-google-oauth20')

passport.use(
  new Strategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async(acessToken,refreshToken,Profile,done)=>{
      try {
        // find user
        const user = findUserByGoogleId(Profile.id)

        // if user doesnot exit create a user
        if(!user){
          const newUser = createUser(Profile)
          return done(null,newUser)
        }

        // if user existes return the user
        return done(null,user)
        
      } catch (error) {
        return done(error,undefined)
      }
    }
  )
)

module.exports = passport