import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderOfHosting from './components/HeaderOfHosting/HeaderOfHosting';
import MoviesList from "./components/MovieList/MovieList";
import MovieInfo from './components/MovieInfo/MovieInfo';
import './App.css'; // Стилі для основного фону сайту

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [backgroundClass, setBackgroundClass] = useState('light-background');

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
        setBackgroundClass(prevClass => prevClass === 'light-background' ? 'dark-background' : 'light-background');
    };

    return (
        <Router>
            <div className={`app ${backgroundClass}`}>
                <HeaderOfHosting onThemeToggle={toggleTheme} isDarkTheme={isDarkTheme} />
                <Routes>
                    <Route path="/" element={<MoviesList />} />
                    <Route path="/search" element={<MoviesList />} />
                    <Route path="/movie/:id" element={<MovieInfo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;