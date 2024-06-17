// src/features/movies/MovieCard.tsx
import React from 'react';
import {MovieInterface} from '../../interfaces/Movie.interface';
import './MovieCard.css'; // Підключіть стилі для компонента

interface MovieCardProps extends MovieInterface {}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path, overview }) => {
    const imgUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;

    return (
        <div className="movie-card">
            <img src={imgUrl} alt={title} />
            <h3>{title}</h3>
            <p>{overview}</p>
        </div>
    );
};

export default MovieCard;