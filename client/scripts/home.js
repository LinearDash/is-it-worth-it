const loadMovies = async ()=>{
  const response = await fetch('/movies/popular')
  const movies = await response.json()
  const container = document.getElementById('movies-row')

   movies.forEach(movie => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-poster" />
      <div class="card-info">
        <p class="card-title">${movie.title}</p>
        <p class="card-rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `
    card.addEventListener('click', () => {
      window.location.href = `/pages/item.html?type=movie&id=${movie.id}`
    })
    container.appendChild(card)
  })
}

loadMovies()

const loadShows = async()=>{
  const response = await fetch('/shows/popular')
  const shows = await response.json()
  const container = document.getElementById('shows-row')

  shows.forEach(show =>{
    const card = document.createElement('div')
    card.className= 'card'
    card.innerHTML =`
     <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" class="card-poster" />
      <div class="card-info">
        <p class="card-title">${show.name}</p>
        <p class="card-rating">⭐ ${show.vote_average.toFixed(1)}</p>
      </div>
    `
  container.appendChild(card)
  })
}

loadShows()