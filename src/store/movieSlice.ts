import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MovieInterface } from '../interfaces/Movie.interface';

const API_KEY = '1784c92203fc49d4745e3105e1b62993';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesThunk = createAsyncThunk(
    'movies/fetchMovies',
    async ({ page }: { page: number }) => {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                page,
            },
        });
        return response.data;
    }
);

export const searchMoviesThunk = createAsyncThunk(
    'movies/searchMovies',
    async ({ query, page }: { query: string, page: number }) => {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query,
                page,
            },
        });
        return { results: response.data.results, searchTerm: query };
    }
);

export const fetchMoviesByGenreThunk = createAsyncThunk(
    'movies/fetchMoviesByGenre',
    async ({ genreId, page }: { genreId: number, page: number }) => {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                page,
            },
        });
        return response.data;
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: { results: [] as MovieInterface[] },
        searchResults: null as { results: MovieInterface[] } | null,
        searchTerm: '',
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMoviesThunk.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(searchMoviesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMoviesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload.results;
                state.searchTerm = action.payload.searchTerm;
            })
            .addCase(searchMoviesThunk.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchMoviesByGenreThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesByGenreThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMoviesByGenreThunk.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default movieSlice.reducer;
