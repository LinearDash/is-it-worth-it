const loadNavbar = () => {
  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
      <span class="nav-logo">Is It Worth It?</span>
      <input
        type="text"
        id="search-input"
        class="search-bar"
        placeholder="Search movies, shows..."
      />
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/pages/profile.html">My Library</a></li>
      </ul>
  `;
  nav.querySelector("#search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = `/pages/search.html?q=${query}`;
      }
    }
  });

  document.body.prepend(nav);
};

loadNavbar();
