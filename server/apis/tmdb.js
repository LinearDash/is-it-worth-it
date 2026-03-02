const TMDB_API_KEY = process.env.TMDB_API_KEY

const getPopularMovies = async()=>{
  try {
    const response= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`)
    const data = await response.json()


    return data.results;
  } catch (error) {
    return({message:'Something went wrong in getPopularMovies'})
  }
}
const getPopularShows = async()=>{
  try {
    const response= await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`)
    const data = await response.json()

    
    return data.results;
  } catch (error) {
    return({message:'Something went wrong in getPopularShows'})
  }
}
const searchMoviesAndShows = async(searchQuery)=>{
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${searchQuery}`)
    const data = await response.json()

    return data.results;
  } catch (error) {
    return({message:'Something Went wrong in searchMoviesAndShows'})
  }
}

const getMovieById = async(id)=>{
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
    const data = await response.json()

    return data;
  } catch (error) {
  return({message:'Something Went wrong in getMovieById'})    
  }
}

const getShowById = async(id)=>{
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`)
    const data = await response.json()

    return data;
  } catch (error) {
  return({message:'Something Went wrong in getShowById'})    
  }
}

module.exports ={getPopularMovies,getPopularShows,searchMoviesAndShows,getMovieById,getShowById}