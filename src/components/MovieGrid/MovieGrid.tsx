import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/8898/5aa6/1abb/f07d/7d3f/513e/719d/e60c/88985aa61abbf07d7d3f513e719de60c.jpg';

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
