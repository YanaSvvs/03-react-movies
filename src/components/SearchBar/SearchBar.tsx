import { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSearch(formData: FormData) {
    const searchQuery = formData.get('query') as string;

    if (searchQuery.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

    await onSubmit(searchQuery);

    formRef.current?.reset();
  }

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
        {/* 4. Передаємо функцію handleSearch в атрибут action */}
        <form className={styles.form} ref={formRef} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query" 
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
