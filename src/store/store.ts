import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../store/movieSlice';

const store = configureStore({
    reducer: {
        movies: movieReducer,
        // Додайте інші редуктори, якщо вони є
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // вимкнення перевірки серіалізації, якщо потрібно
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;