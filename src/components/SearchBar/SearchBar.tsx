import { useState, type FormEvent } from 'react'; 
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
}


export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState(''); 

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    const formData = new FormData(evt.currentTarget);
    const searchQuery = formData.get('query') as string; 

    if (searchQuery.trim() === '') { 
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(searchQuery); 
    setQuery(''); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}