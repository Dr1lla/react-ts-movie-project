import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderOfHosting from './components/HeaderOfHosting/HeaderOfHosting';
import MoviesList from "./components/MovieList/MovieList";
import MovieInfo from './components/MovieInfo/MovieInfo';

const App = () => {
    return (
        <Router>
            <div className="app">
                <HeaderOfHosting onThemeToggle={() => console.log('Тема змінена')} />
                <Routes>
                    <Route path="/" element={<MoviesList />} />
                    <Route path="/search" element={<MoviesList />} />
                    <Route path="/genres/:genreId" element={<MoviesList />} />
                    <Route path="/movie/:id" element={<MovieInfo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
