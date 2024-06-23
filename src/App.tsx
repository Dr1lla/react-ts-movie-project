import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderOfHosting from './components/HeaderOfHosting/HeaderOfHosting';
import MoviesList from './components/MovieList/MovieList';
import MovieInfo from './components/MovieInfo/MovieInfo';
import './App.css';

const App: FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <Router>
            <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <HeaderOfHosting onThemeToggle={toggleTheme} isDarkTheme={isDarkTheme} />
                <Routes>
                    <Route path="/" element={<MoviesList />} /> {/* Головна сторінка зі всіма фільмами */}
                    <Route path="/search" element={<MoviesList />} /> {/* Результати пошуку */}
                    <Route path="/movie/:id" element={<MovieInfo />} /> {/* Інформація про конкретний фільм */}
                    <Route path="/genres/:genreId" element={<MoviesList />} /> {/* Фільми за певним жанром */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
