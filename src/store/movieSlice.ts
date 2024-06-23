import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMoviesByGenre, searchMovies } from '../services/tmdbApi';
import { MovieInterface } from '../interfaces/Movie.interface';

export const fetchMoviesThunk = createAsyncThunk(
    'movies/fetchMovies',
    async ({ page }: { page: number }) => {
        const response = await fetchMovies({ page });
        return response.results; // повертаємо тільки результати
    }
);

export const fetchMoviesByGenreThunk = createAsyncThunk(
    'movies/fetchMoviesByGenre',
    async ({ genreId, page }: { genreId: number, page: number }) => {
        const response = await fetchMoviesByGenre(genreId, page);
        return response.results; // повертаємо тільки результати
    }
);

export const searchMoviesThunk = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
        const response = await searchMovies(query);
        return response.results; // повертаємо тільки результати
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [] as MovieInterface[],
        searchResults: null as MovieInterface[] | null,
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
            .addCase(fetchMoviesByGenreThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoviesByGenreThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMoviesByGenreThunk.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(searchMoviesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMoviesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload;
            })
            .addCase(searchMoviesThunk.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default movieSlice.reducer;