import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieInfo.css';

interface MovieInfoProps {
    title: string;
    description: string;
    releaseDate: string;
    rating: number;
    posterPath: string;
}

const MovieInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieInfoProps | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: '1784c92203fc49d4745e3105e1b62993',
                },
            });
            setMovie({
                title: response.data.title,
                description: response.data.overview,
                releaseDate: response.data.release_date,
                rating: response.data.vote_average,
                posterPath: response.data.poster_path,
            });
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-info">
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className="movie-info-poster"
            />
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.rating}</p>
        </div>
    );
};

export default MovieInfo;
