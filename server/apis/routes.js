const express = require('express')
const passport = require('../auth/passport')
const { generateToken } = require('../auth/jwt')

const router = express.Router()

router.get('/auth/google',passport.authenticate('google',{
      scope:['profile','email'],
      session:false
    }))

router.get('/auth/google/callback',
    passport.authenticate('google',{ session:false, failureRedirect: '/' } ),
    (req,res) => {
        const user = req.user
        const token = generateToken(user)
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    }
)

module.exports = router