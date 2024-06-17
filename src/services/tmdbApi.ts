import axios from 'axios';
import { MovieInterface } from '../interfaces/Movie.interface';

const API_KEY = '1784c92203fc49d4745e3105e1b62993';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const fetchMovies = (page: number = 1) => {
    return axiosInstance.get<{ results: MovieInterface[] }>(`/discover/movie`, {
        params: {
            page,
        },
    });
};
