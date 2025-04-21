import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: true
        })
}); 