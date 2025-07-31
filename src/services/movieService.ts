import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response: AxiosResponse<FetchMoviesResponse> = await apiClient.get(
    '/search/movie',
    {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    }
  );
  return response.data.results;
};
