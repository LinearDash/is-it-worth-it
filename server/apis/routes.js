const express = require('express')
const passport = require('../auth/passport')
const { generateToken } = require('../auth/jwt')

const { getPopularMovies,getMovieById,getPopularShows,getShowById,searchMoviesAndShows } = require('../apis/tmdb')
const authMiddleware = require('../middleware/auth')
const { addToLibrary } = require('../storage/users')


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
router.get('/movies/popular',async(req,res)=>{
    const movies = await getPopularMovies()
    res.json(movies)
})

router.get('/movies/:id', async(req,res) => {
    const movie = await getMovieById(req.params.id)
    res.json(movie)
})

router.get('/shows/popular', async(req,res) => {
    const shows = await getPopularShows()
    res.json(shows)
})

router.get('/shows/:id', async(req,res) => {
    const show = await getShowById(req.params.id)
    res.json(show)
})

router.get('/search', async(req,res) => {
    const results = await searchMoviesAndShows(req.query.q)
    res.json(results)
})

router.post('/library/add',authMiddleware, async(req,res)=>{
    const userId = req.user.id;
    const item = req.body

    const upadtedUser = addToLibrary(userId,item)
    res.json(upadtedUser)
})


module.exports = router