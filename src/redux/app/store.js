import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../feature/auth/authSlice'

export const store = configureStore({
    reducer: {
        // ...authReducer,
        // auth: {
        //     ...authReducer.auth,
        // } 
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,

    },
    middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
