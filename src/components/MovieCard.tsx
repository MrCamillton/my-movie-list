type MovieCardProps = {
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
  rating: number;
  onWatched: () => void;
  onRating: (rating: number) => void;
};

function MovieCard(props: MovieCardProps) {
  return (
    <div className="movie-card">
      <h2>{props.title}</h2>

      <p>Rok: {props.year}</p>
      <p>Gatunek: {props.genre.join(", ")}</p>

      <button onClick={props.onWatched}>
        {props.watched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
      </button>

      <p>Ocena:</p>

      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => props.onRating(star)}>
            {star <= props.rating ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MovieCard;
