import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-react-frontend.onrender.com",
      "https://searchmoviereact-app.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Backend MovieApp is running");
});
app.get("/api/movies", async (req, res) => {
  const { movie } = req.query;
  const apiKey = process.env.TMD_API_KEY;

  if (!movie) {
    return res.status(400).json({ error: "Movie parameter is required" });
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: movie,
          api_key: apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    res.status(500).json({ error: "Error fetching movie data" });
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));