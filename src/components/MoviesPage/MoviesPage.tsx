import React, { FC } from 'react';
import MoviesList from '../MovieList/MovieList';

const MoviesPage: FC = () => {
    return (
        <div className="movies-page">
            <MoviesList />
            {/* Ваш код для MoviesPage */}
        </div>
    );
};

export default MoviesPage;