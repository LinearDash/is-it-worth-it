const addToLibrary = async (
  id,
  title,
  type,
  poster_path,
  rating,
  release_date,
  genres,
) => {
  const item = { id, title, type, poster_path, rating, release_date, genres };
  const response = await fetch("/library/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  console.log(data);
};
