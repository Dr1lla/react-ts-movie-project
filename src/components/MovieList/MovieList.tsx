import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchMoviesThunk, fetchMoviesByGenreThunk, searchMoviesThunk } from '../../store/movieSlice'; // Використовуємо Thunks
import MoviesListCard from '../MovieListCard/MovieListCard';
import './MovieList.css';
import { useParams } from 'react-router-dom';
import { MovieInterface } from '../../interfaces/Movie.interface';

const MoviesList: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies.results);
    const searchResults = useSelector((state: RootState) => state.movies.searchResults);
    const status = useSelector((state: RootState) => state.movies.status);
    const searchTerm = useSelector((state: RootState) => state.movies.searchTerm);
    const { genreId } = useParams<{ genreId: string }>(); // Отримуємо genreId з URL параметрів
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!searchTerm && !genreId) {
            dispatch(fetchMoviesThunk({ page }));
        } else if (genreId) {
            dispatch(fetchMoviesByGenreThunk({ genreId: parseInt(genreId), page }));
        } else {
            dispatch(searchMoviesThunk({ query: searchTerm, page }));
        }
    }, [dispatch, page, searchTerm, genreId]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    let movieList: MovieInterface[] = [];
    if (!searchTerm) {
        movieList = movies || [];
    } else {
        movieList = searchResults || [];
    }

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
                <button onClick={handlePreviousPage} disabled={page === 1}>Попередня</button>
                <span>{page}</span>
                <button onClick={handleNextPage}>Наступна</button>
            </div>
        </div>
    );
};

export default MoviesList;
