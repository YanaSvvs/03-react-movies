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

  const handleSearchAction = async (formData: FormData) => {
    
    const query = formData.get('query') as string;

    if (query.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

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
      {/* Передаємо handleSearchAction як пропс 'action' до SearchBar */}
      <SearchBar action={handleSearchAction} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {/* Відображаємо сітку фільмів, якщо є результати і завантаження завершено */}
      {movies.length > 0 && !isLoading && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      {/* Відображаємо модальне вікно, якщо вибрано фільм */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      {/* Компонент для відображення повідомлень toast */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
