import React, { FC, useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { searchMoviesThunk, fetchMoviesByGenreThunk } from '../../store/movieSlice';
import './HeaderOfHosting.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Genre {
    id: number;
    name: string;
}

interface HeaderProps {
    onThemeToggle: () => void;
}

const HeaderOfHosting: FC<HeaderProps> = ({ onThemeToggle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: '1784c92203fc49d4745e3105e1b62993',
                },
            });
            setGenres(response.data.genres);
        };

        fetchGenres();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(searchMoviesThunk({ query: searchTerm, page: 1 }));
            navigate('/search');
        }
    };

    const handleGenreClick = (genreId: number) => {
        dispatch(fetchMoviesByGenreThunk({ genreId, page: 1 }));
        navigate(`/genre/${genreId}`);
        setDropdownVisible(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Movie Hosting App</h1>
            </div>
            <div className="header-center">
                <button className="header-button" onClick={handleHomeClick}>Головна</button>
                <div className="dropdown">
                    <button
                        className="header-button"
                        onMouseEnter={() => setDropdownVisible(true)}
                        onMouseLeave={() => setDropdownVisible(false)}
                    >
                        Жанри
                    </button>
                    {isDropdownVisible && (
                        <div
                            className="dropdown-menu"
                            onMouseEnter={() => setDropdownVisible(true)}
                            onMouseLeave={() => setDropdownVisible(false)}
                        >
                            {genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className="dropdown-item"
                                    onClick={() => handleGenreClick(genre.id)}
                                >
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Пошук..."
                    className="header-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Enter</button>
                <button className="header-theme-toggle" onClick={onThemeToggle}>Змінити тему</button>
            </div>
            <div className="header-right">
                <span className="header-user-info">Ім'я користувача</span>
                <FaUserCircle className="header-user-icon" />
            </div>
        </header>
    );
};

export default HeaderOfHosting;
