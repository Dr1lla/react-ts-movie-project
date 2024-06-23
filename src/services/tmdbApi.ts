import axios from 'axios';

const API_KEY = '1784c92203fc49d4745e3105e1b62993';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const fetchGenres = async () => {
    const response = await axiosInstance.get('/genre/movie/list');
    return response.data;
};

export const fetchMovies = async ({ page }: { page: number }) => {
    const response = await axiosInstance.get('/discover/movie', {
        params: {
            page,
        },
    });
    return response.data;
};

export const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
    const response = await axiosInstance.get('/discover/movie', {
        params: {
            with_genres: genreId,
            page,
        },
    });
    return response.data;
};

export const searchMovies = async (query: string) => {
    const response = await axiosInstance.get('/search/movie', {
        params: {
            query,
        },
    });
    return response.data;
};
