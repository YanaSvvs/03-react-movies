import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  action: (formData: FormData) => Promise<void>; 
}

export default function SearchBar({ action }: SearchBarProps) { 
  const [query, setQuery] = useState('');

  const handleFormAction = async (formData: FormData) => {
    const searchQuery = formData.get('query') as string;

    if (searchQuery.trim() === '') {
      toast.error('Please enter your search query.');
      return; 
    }

    await action(formData); 
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
        {/* Використовуємо атрибут action та передаємо функцію handleFormAction */}
        {}
        <form className={styles.form} action={handleFormAction}>
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