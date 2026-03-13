const searchItem = async () => {
  const param = new URLSearchParams(window.location.search);
  const query = param.get("q");

  document.getElementById("search-heading").textContent =
    `Results for "${query}"`;

  const response = await fetch(`/search?q=${query}`);
  const results = await response.json();

  const container = document.getElementById("search-results");

  results.forEach((result) => {
    const itemName = result.media_type === "movie" ? result.title : result.name;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${itemName}" class="card-poster" />
      <div class="card-info">
        <p class="card-title">${itemName}</p>
        <p class="card-rating">⭐ ${result.vote_average ? result.vote_average.toFixed(1) : "N/A"}</p>
        <span class="badge ${result.media_type === "movie" ? "badge-movie" : "badge-show"}">
          ${result.media_type === "movie" ? "Movie" : "TV Show"}
        </span>
       </div>
    `;
    card.addEventListener("click", () => {
      openItemDialog(
        result.media_type == "movie" ? "movie" : "show",
        result.id,
      );
    });
    container.appendChild(card);
  });
};

searchItem();

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
        <button id="add-to-library-btn" class="add-library-btn">+ Add to Library</button>
          <button id="get-verdict-btn" class="get-verdict-btn">Get AI Verdict</button>
        <div id="verdict-section" class="verdict-section"></div>
      </div>
    </div>
  `;
  document.getElementById("item-dialog").showModal();
  document
    .getElementById("add-to-library-btn")
    .addEventListener("click", () => {
      addToLibrary(
        item.id,
        itemName,
        type,
        item.poster_path,
        item.vote_average,
        item.release_date,
        item.genres,
      );
      document.getElementById("item-dialog").close();
    });
  document
    .getElementById("get-verdict-btn")
    .addEventListener("click", async () => {
      document.getElementById("verdict-section").innerHTML =
        '<p class="verdict-loading">Getting AI verdict...</p>';

      const verdictResponse = await fetch("/verdict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });
      const verdict = await verdictResponse.json();
      console.log("verdict:", verdict);

      // display verdict here
      document.getElementById("verdict-section").innerHTML = `
        <div class="verdict-card">
          <div class="verdict-header">
            <span class="verdict-badge ${verdict.verdict === "Worth It" ? "verdict-worth" : verdict.verdict === "Skip It" ? "verdict-skip" : "verdict-depends"}">${verdict.verdict}</span>
            <span class="verdict-score">${verdict.matchScore}% match</span>
          </div>
          <p class="verdict-summary">${verdict.summary}</p>
          <div class="verdict-lists">
            <div class="verdict-list">
              <p class="verdict-list-title">Perfect For You If...</p>
              <ul>
                ${verdict.perfectFor.map((reason) => `<li>${reason}</li>`).join("")}
              </ul>
            </div>
            <div class="verdict-list">
              <p class="verdict-list-title">Skip It If...</p>
              <ul>
                ${verdict.skipIf.map((reason) => `<li>${reason}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    });
};

document.getElementById("close-dialog").addEventListener("click", () => {
  document.getElementById("item-dialog").close();
});
