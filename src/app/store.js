import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import buttonReducer from '../features/buttonSlide.js';
import rootReducer from "../actions.js";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, buttonReducer);

export const store = configureStore({
    reducer: {
        button: persistedReducer,
        title: rootReducer,
    },
});

export const persistor = persistStore(store);

export default store;