import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieInterface } from '../../interfaces/Movie.interface';
import { fetchMovies } from '../../services/tmdbApi';

interface MoviesState {
    movies: MovieInterface[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    status: 'idle',
    error: null,
};

export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async (page: number) => {
        const response = await fetchMovies(page);
        return response.data.results;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMoviesAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMoviesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch movies';
            });
    },
});

export default moviesSlice.reducer;