import React, { FC } from 'react';
import Header from './features/movies/Header';
import MoviesList from './features/movies/MoviesList';

const App: FC = () => {
    const handleThemeToggle = () => {
        // Реалізуйте функцію для зміни теми
        console.log('Тема змінена');
    };

    return (
        <div>
            <Header onThemeToggle={handleThemeToggle} />
            <div className="container">
                <h1>Movie Hosting App</h1>
                <MoviesList />
            </div>
        </div>
    );
};

export default App;
