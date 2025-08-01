import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    
    const authToken = import.meta.env.VITE_TMDB_TOKEN; 

    if (!authToken) {
      
      throw new Error('Authentication token (VITE_TMDB_TOKEN) is not defined in environment variables.');
    }

    const response = await axios.get<FetchMoviesResponse>(`/api/movies`, {
      params: { query },
   
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error in fetchMovies (client-side):", error);
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data?.error;
      const status = error.response?.status;

      if (status === 401) {
        throw new Error(`Authentication failed. Please check your VITE_TMDB_TOKEN and server configuration.`);
      } else if (status === 400) {
        throw new Error(`Invalid request: ${apiError || 'Query missing.'}`);
      } else if (status === 500) {
        throw new Error(`Server error: ${apiError || 'Please try again later.'}`);
      }
      throw new Error(`Failed to fetch movies: ${apiError || error.message || 'Unknown error.'}`);
    } else {
      throw new Error('An unexpected error occurred while fetching movies.');
    }
  }
};
