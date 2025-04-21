import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

// Check localStorage on initial load
const token = localStorage.getItem('Authorization');
const email = localStorage.getItem('email');
if (token && email) {
    initialState.user = {email};
    initialState.isAuthenticated = true;
}

// Create async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const user = await authService.login(credentials.email, credentials.password);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {logout} = authSlice.actions;

// Async thunk for logout
export const logoutUser = () => (dispatch) => {
    authService.logout();
    dispatch(logout());
};

export default authSlice.reducer; 