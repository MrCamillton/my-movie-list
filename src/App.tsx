import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";

function App() {
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [filter, setFilter] = useState("all");

  function markAsWatched(id: number) {
    if (watchedMovies.includes(id)) {
      setWatchedMovies(watchedMovies.filter((movieId) => movieId !== id));
    } else {
      setWatchedMovies([...watchedMovies, id]);
    }
  }

  function changeRating(id: number, rating: number) {
    setRatings({
      ...ratings,
      [id]: rating,
    });
  }

  function clearAll() {
    setWatchedMovies([]);
    setRatings({});
  }

  let filteredMovies = movies;

  if (filter === "watched") {
    filteredMovies = movies.filter((movie) => watchedMovies.includes(movie.id));
  }

  if (filter === "unwatched") {
    filteredMovies = movies.filter(
      (movie) => !watchedMovies.includes(movie.id),
    );
  }

  return (
    <div className="app">
      <h1>Moja lista filmów</h1>

      <h3>
        Obejrzane: {watchedMovies.length} / {movies.length}
      </h3>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Wszystkie</button>

        <button onClick={() => setFilter("watched")}>Obejrzane</button>

        <button onClick={() => setFilter("unwatched")}>Nieobejrzane</button>

        <button onClick={clearAll}>Wyczyść wszystkie</button>
      </div>

      {filteredMovies.length === 0 ? (
        <p>Brak filmów.</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              watched={watchedMovies.includes(movie.id)}
              rating={ratings[movie.id] || 0}
              onWatched={() => markAsWatched(movie.id)}
              onRating={(rating) => changeRating(movie.id, rating)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
