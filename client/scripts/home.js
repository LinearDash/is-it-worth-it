const addToLibrary = async (id, title, type, poster_path, rating) => {
  const item = { id, title, type, poster_path, rating };
  const response = await fetch("/library/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item }),
  });
  const data = await response.json();
  console.log(data);
};

const loadMovies = async () => {
  const response = await fetch("/movies/popular");
  const movies = await response.json();
  const container = document.getElementById("movies-row");

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-poster" />
      <div class="card-info">
        <p class="card-title">${movie.title}</p>
        <p class="card-rating">⭐ ${movie.vote_average.toFixed(1)}</p>
       </div>
    `;
    card.addEventListener("click", () => {
      openItemDialog("movie", movie.id);
    });

    container.appendChild(card);
  });
};

loadMovies();

const loadShows = async () => {
  const response = await fetch("/shows/popular");
  const shows = await response.json();
  const container = document.getElementById("shows-row");

  shows.forEach((show) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
     <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" class="card-poster" />
      <div class="card-info">
        <p class="card-title">${show.name}</p>
        <p class="card-rating">⭐ ${show.vote_average.toFixed(1)}</p>
        </div>
    `;
    card.addEventListener("click", () => {
      openItemDialog("show", show.id);
    });
    container.appendChild(card);
  });
};

loadShows();

const openItemDialog = async (type, id) => {
  const response = await fetch(`/${type}s/${id}`);
  const item = await response.json();
  const itemName = type === "movie" ? item.title : item.name;
  document.getElementById("dialog-content").innerHTML = `
   <img src='https://image.tmdb.org/t/p/w1280${item.backdrop_path}' class="dialog-backdrop" />
    <div class="dialog-body">
      <img src='https://image.tmdb.org/t/p/w500${item.poster_path}' class="dialog-poster" />
      <div class="dialog-info">
        <h2 class="dialog-title">${itemName}</h2>
        <p class="dialog-rating">⭐ ${item.vote_average.toFixed(1)}</p>
        <p class="dialog-overview">${item.overview}</p>
      </div>
    </div>
  `;
  document.getElementById("item-dialog").showModal();
};

document.getElementById("close-dialog").addEventListener("click", () => {
  document.getElementById("item-dialog").close();
});
