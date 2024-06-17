import React, { FC } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Імпорт іконки для аккаунту (можете використовувати інші залежно від вашого вибору)
import './Header.css'; // Підключення стилів для хедера (створіть власний файл стилів)

interface HeaderProps {
    onThemeToggle: () => void; // Функція для зміни теми
}

const Header: FC<HeaderProps> = ({ onThemeToggle }) => {
    return (
        <header className="header">
            <div className="header-left">
                <h1>Movie Hosting App</h1> {/* Назва сайту зліва */}
            </div>
            <div className="header-center">
                <button className="header-button">Головна</button> {/* Кнопка для входу на головну */}
                <button className="header-button">Жанри</button> {/* Кнопка для відкриття меню жанрів */}
                <input type="text" placeholder="Пошук..." className="header-search" /> {/* Пошукове поле */}
                <button className="header-theme-toggle" onClick={onThemeToggle}>Змінити тему</button> {/* Кнопка для зміни теми */}
            </div>
            <div className="header-right">
                <span className="header-user-info">Ім'я користувача</span> {/* Ім'я користувача */}
                <FaUserCircle className="header-user-icon" /> {/* Іконка для аккаунту */}
            </div>
        </header>
    );
};

export default Header;
