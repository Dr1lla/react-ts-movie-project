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
    genres: string[]; // Додали поле для жанрів
}

const MovieInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieInfoProps | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const [movieResponse, genresResponse] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                        params: {
                            api_key: '1784c92203fc49d4745e3105e1b62993',
                        },
                    }),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                        params: {
                            api_key: '1784c92203fc49d4745e3105e1b62993',
                        },
                    }),
                ]);

                const genres = movieResponse.data.genres.map((genre: { name: string }) => genre.name);

                setMovie({
                    title: movieResponse.data.title,
                    description: movieResponse.data.overview,
                    releaseDate: movieResponse.data.release_date,
                    rating: movieResponse.data.vote_average,
                    posterPath: movieResponse.data.poster_path,
                    genres: genres,
                });
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
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
            <p>Genres: {movie.genres.join(', ')}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.rating}</p>
        </div>
    );
};

export default MovieInfo;