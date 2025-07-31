import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie'; 

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
   
    const response: AxiosResponse<FetchMoviesResponse> = await axios.get(`/api/movies`, {
      params: { query }, 
    });

    return response.data.results;
  } catch (error) {
    console.error("Error in fetchMovies (client-side):", error);
    
    throw error; 
  }
};