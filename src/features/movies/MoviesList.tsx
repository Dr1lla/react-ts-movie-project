import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchMoviesAsync } from './moviesSlice';
import MovieCard from './MovieCard';
import './MoviesList.css';
import {MovieInterface} from "../../interfaces/Movie.interface"; // Додайте файл стилів для компонента, якщо потрібно

const MoviesList: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const status = useSelector((state: RootState) => state.movies.status);
    const error = useSelector((state: RootState) => state.movies.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMoviesAsync(1));
        }
    }, [status, dispatch]);

    // Розділення фільмів по п'ять в рядок
    const chunkedMovies = movies.reduce<MovieInterface[][]>((result, item, index) => {
        const chunkIndex = Math.floor(index / 5);
        if (!result[chunkIndex]) {
            result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
    }, []);

    return (
        <div className="movies-container">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' &&
                chunkedMovies.map((row, rowIndex) => (
                    <div key={rowIndex} className="movies-row">
                        {row.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default MoviesList;