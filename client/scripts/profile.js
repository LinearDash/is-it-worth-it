const payload = JSON.parse(atob(token.split(".")[1]));

const loadProfile = () => {
  const container = document.getElementById("profile");
  const profile = document.createElement("div");
  profile.className = "profile-section";
  profile.innerHTML = `
  <img src="${payload.photo}" alt="${payload.name}" class="profile-avatar" referrerpolicy="no-referrer"  />
  <div class="profile-details">
    <h2 class="profile-name">${payload.name}</h2>
    <p class="profile-email">${payload.email}</p>
  </div>
`;
  container.appendChild(profile);
};

loadProfile();

const loadLibrary = async () => {
  const response = await fetch("/library", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const library = await response.json();

  const container = document.getElementById("library-grid");
  library.forEach((item) => {
    const card = document.createElement("div");
    card.className = "lCard";
    card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}" class="lcard-poster" />
      <div class="lcard-info">
        <p class="lcard-title">${item.title}</p>
        <p class="lcard-rating">⭐ ${item.rating}</p>
        <span class="badge ${item.type === "movie" ? "badge-movie" : "badge-show"}">
          ${item.type === "movie" ? "Movie" : "TV Show"}
        </span>
        </div>
        <button class="remove-btn" data-id="${item.id}">✕ Remove</button>
    `;
    container.appendChild(card);
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromLibrary(item.id);
      card.remove();
    });
  });
};

loadLibrary();
