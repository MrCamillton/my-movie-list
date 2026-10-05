import { useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";

function App() {
  const [movieList, setMovieList] = useState(movies);
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [filter, setFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState([""]);

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

  function addGenreField() {
    setGenres([...genres, ""]);
  }

  function changeGenre(index: number, value: string) {
    const newGenres = [...genres];
    newGenres[index] = value;
    setGenres(newGenres);
  }

  function removeGenreField(index: number) {
    setGenres(genres.filter((_, genreIndex) => genreIndex !== index));
  }

  function addMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie = {
      id: Date.now(),
      title: title,
      year: Number(year),
      genre: genres.filter((genre) => genre.trim() !== ""),
    };

    setMovieList([...movieList, newMovie]);

    setTitle("");
    setYear("");
    setGenres([""]);
  }

  let filteredMovies = movieList;

  if (filter === "watched") {
    filteredMovies = movieList.filter((movie) =>
      watchedMovies.includes(movie.id),
    );
  }

  if (filter === "unwatched") {
    filteredMovies = movieList.filter(
      (movie) => !watchedMovies.includes(movie.id),
    );
  }

  return (
    <div className="app">
      <h1>Moja lista filmów</h1>

      <h3>
        Obejrzane: {watchedMovies.length} / {movieList.length}
      </h3>

      <form onSubmit={addMovie} className="movie-form">
        <h2>Dodaj nowy film</h2>

        <div>
          <label>Tytuł:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Rok:</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
        </div>

        <div>
          {" "}
          <label>Gatunki:</label>
          {genres.map((genre, index) => (
            <div key={index} className="genre-input">
              <input
                type="text"
                value={genre}
                onChange={(event) => changeGenre(index, event.target.value)}
                required
              />

              <div className="genre-buttons">
                {genres.length > 1 && (
                  <button
                    type="button"
                    className="remove-genre"
                    onClick={() => removeGenreField(index)}
                  >
                    −
                  </button>
                )}

                {index === genres.length - 1 && (
                  <button
                    type="button"
                    className="add-genre"
                    onClick={addGenreField}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit">Dodaj</button>
      </form>

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
