import React, { FC, useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchGenres } from '../../services/tmdbApi';
import { searchMoviesThunk, resetSearchResults } from '../../store/movieSlice'; // Імпортуємо resetSearchResults
import './HeaderOfHosting.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onThemeToggle: () => void; // Пропс для зміни теми
    isDarkTheme: boolean; // Пропс для визначення поточної теми
}

const HeaderOfHosting: FC<HeaderProps> = ({ onThemeToggle, isDarkTheme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);
    const [showGenres, setShowGenres] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres().then(data => setGenres(data.genres));
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(searchMoviesThunk({ query: searchTerm, page: 1 }));
            navigate('/search');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleHomeClick = () => {
        dispatch(resetSearchResults());
        navigate('/');
    };

    const handleGenreClick = (genreId: number) => {
        navigate(`/genres/${genreId}`);
        setShowGenres(false);
    };

    const handleGenresMouseEnter = () => {
        setShowGenres(true);
    };

    const handleGenresMouseLeave = () => {
        setShowGenres(false);
    };

    const toggleTheme = () => {
        onThemeToggle(); // Викликаємо пропс для зміни теми
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Movie Hosting App</h1>
            </div>
            <div className="header-center">
                <button className="header-button" onClick={handleHomeClick}>Головна</button>
                <div
                    className="header-button genres-button"
                    onMouseEnter={handleGenresMouseEnter}
                    onMouseLeave={handleGenresMouseLeave}
                >
                    Жанри
                    {showGenres && (
                        <div className="genres-dropdown">
                            {genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className="genre-item"
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
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSearch}>Пошук</button>
                <button className="header-theme-toggle" onClick={toggleTheme}>
                    {isDarkTheme ? 'Змінити на світлу' : 'Змінити на темну'}
                </button>
            </div>
            <div className="header-right">
                <span className="header-user-info">Ім'я користувача</span>
                <FaUserCircle className="header-user-icon" />
            </div>
        </header>
    );
};

export default HeaderOfHosting;
