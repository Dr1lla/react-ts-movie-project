import React from 'react';
import ReactDOM from 'react-dom/client'; // Імпортуємо з 'react-dom/client'
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

// Знаходимо кореневий елемент у DOM
const rootElement = document.getElementById('root');

// Створюємо корінь за допомогою createRoot
const root = ReactDOM.createRoot(rootElement!);

// Використовуємо метод render нового кореня
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);