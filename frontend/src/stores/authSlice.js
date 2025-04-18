import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getCurrentUser(),
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async thunk for login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await authService.login(credentials.email, credentials.password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Async thunk for logout
export const logoutUser = () => (dispatch) => {
  authService.logout();
  dispatch(logout());
};

export default authSlice.reducer; 