const passport = require('passport')

const {Strategy} = require('passport-google-oauth20')

passport.use(
  new Strategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async(acessToken,refreshToken,Profiler,done)=>{
      try {
        // find user

        // if user doesnot exit create a user

        // if user existes return the user
      } catch (error) {
        return done(error,undefined)
      }
    }
  )
)

module.exports = passport