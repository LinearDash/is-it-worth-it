const getVerdict = async (item, library) => {
  const prompt = `
    You are a brutally honest media advisor. Your job is to tell users if a movie, show, or game is worth their time based on their personal taste.

    Here is the item the user is considering:
    - Title: ${item.title || item.name}
    - Type: ${item.type}
    - Overview: ${item.overview}
    - Genres: ${item.genres ? item.genres.map((g) => g.name).join(", ") : "Unknown"}
    - Community Rating: ${item.vote_average}/10

    Here is the user's library (what they have already watched and rated):
    ${
      library.length > 0
        ? library
            .map((l) => `- ${l.title} (${l.type}) — rated ${l.rating}/10`)
            .join("\n")
        : "The user has no library yet — give a general verdict based on the item alone."
    }

    Based on the user's taste profile from their library, return ONLY a valid JSON object with no extra text, no markdown, no backticks. Just raw JSON:
    {
      "matchScore": (number 0-100 how well this matches the user's taste),
      "verdict": ("Worth It" or "Skip It" or "Depends"),
      "summary": "(2 sentence honest opinion)",
      "perfectFor": ["reason 1", "reason 2", "reason 3"],
      "skipIf": ["reason 1", "reason 2", "reason 3"]
  }
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    },
  );
  const data = await response.json();
  console.log("Gemini full response", data);

  try {
    const text = data.candidates[0].content.parts[0].text;

    const verdict = JSON.parse(text);
    return verdict;
  } catch (error) {
    return { message: "Failed to parse AI response" };
  }
};

module.exports = { getVerdict };
