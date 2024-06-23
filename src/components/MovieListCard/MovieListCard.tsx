import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { MovieInterface } from '../../interfaces/Movie.interface';
import PosterPreview from "../PosterRreview/PosterRreview";
import StarsRating from '../StarsRating/StarsRating';

interface MoviesListCardProps {
    movie: MovieInterface;
}

const MoviesListCard: FC<MoviesListCardProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <PosterPreview imageUrl={movie.poster_path} />
            </Link>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <StarsRating rating={movie.vote_average} />
            </div>
        </div>
    );
};

export default MoviesListCard;