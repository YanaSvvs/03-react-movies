import { useState } from 'react';
import { fetchMovies } from '../../services/movieService'; 
import type { Movie } from '../../types/movie'; 

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import css from './App.module.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setMovies([]); 

    try {
      const results = await fetchMovies(query);

      if (results && results.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(results);
    } catch (err) {
      console.error("Помилка при пошуку фільмів:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`There was an error: ${errorMessage}. Please try again...`);
      toast.error('Oops, something went wrong!');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      {/* Передаємо handleSearch як пропс onSubmit до SearchBar. */}
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {movies.length > 0 && !isLoading && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;

