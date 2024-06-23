
import React, { FC, useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchGenres } from '../../services/tmdbApi';
import { searchMoviesThunk } from '../../store/movieSlice';
import './HeaderOfHosting.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onThemeToggle: () => void;
}

const HeaderOfHosting: FC<HeaderProps> = ({ onThemeToggle }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Стан для терміну пошуку
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]); // Стан для жанрів
    const [showGenres, setShowGenres] = useState(false); // Стан для відображення підменю жанрів
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres().then(data => setGenres(data.genres)); // Завантаження жанрів при завантаженні компоненту
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(searchMoviesThunk(searchTerm)); // Диспатч пошукового запиту
            navigate('/search'); // Перехід на сторінку з результатами пошуку
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(); // Запуск пошуку при натисканні Enter
        }
    };

    const handleHomeClick = () => {
        navigate('/'); // Перехід на головну сторінку
    };

    const handleGenreClick = (genreId: number) => {
        navigate(`/genres/${genreId}`); // Перехід на сторінку обраного жанру
        setShowGenres(false); // Приховати підменю після вибору жанру
    };

    const handleGenresMouseEnter = () => {
        setShowGenres(true); // Показати підменю при наведенні
    };

    const handleGenresMouseLeave = () => {
        setShowGenres(false); // Приховати підменю при відведенні миші
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>Movie Hosting App</h1>
            </div>
            <div className="header-center">
                <button className="header-button" onClick={handleHomeClick}>Головна</button> {/* Кнопка для переходу на головну сторінку */}
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
                    onKeyDown={handleKeyPress} // Запуск пошуку при натисканні Enter
                />
                <button onClick={handleSearch}>Пошук</button>
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