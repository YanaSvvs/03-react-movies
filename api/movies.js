// api/movies.js

export default async function handler(req, res) {
  const tmdbToken = process.env.VITE_TMDB_TOKEN;
  const { query } = req.query;

  if (!tmdbToken) {
    console.error("Server Error: VITE_TMDB_TOKEN is not configured in Vercel environment variables.");
    return res.status(500).json({ error: 'Server Error: TMDB token is not configured.' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;

    console.log("TMDB Token being used (first 10 chars):", tmdbToken.substring(0, 10) + "..."); 

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tmdbToken}`, 
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TMDB API Error Response:", response.status, errorData);
      return res.status(response.status).json({ error: errorData.status_message || 'TMDB API error' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Serverless Function Internal Error (try-catch block):", error);
    res.status(500).json({ error: 'Internal Server Error during API call.' });
  }
}