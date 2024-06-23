import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchMoviesThunk, searchMoviesThunk } from '../../store/movieSlice';
import MoviesListCard from '../MovieListCard/MovieListCard';
import './MovieList.css';

const MoviesList: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies.results);
    const searchResults = useSelector((state: RootState) => state.movies.searchResults?.results || null);
    const status = useSelector((state: RootState) => state.movies.status);
    const searchTerm = useSelector((state: RootState) => state.movies.searchTerm);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!searchResults) {
            dispatch(fetchMoviesThunk({ page }));
        } else {
            dispatch(searchMoviesThunk({ query: searchTerm, page }));
        }
    }, [dispatch, page, searchResults, searchTerm]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const movieList = searchResults || movies;

    return (
        <div className="movies-list-container">
            <div className="movies-list">
                {status === 'loading' && <div>Loading...</div>}
                {status === 'succeeded' && movieList.map((movie) => (
                    <MoviesListCard key={movie.id} movie={movie} />
                ))}
                {status === 'failed' && <div>Error fetching movies</div>}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <span>{page}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default MoviesList;
