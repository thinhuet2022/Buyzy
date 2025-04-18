import apiInstance from './api';
import { useSelector } from 'react-redux';
const authService = {
  async login(email, password) {
    try {
      const response = await apiInstance.post('/auth/login', {
        email,
        password
      });
      if (response.jwt_token) {
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        localStorage.setItem('Authorization', response.jwt_token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(userData) {
    try {
      return await apiInstance.post('/auth/signup', userData);
    } catch (error) {
      throw error;
    }
  },

  async refreshToken() {
    try {
      return await apiInstance.post('/auth/refresh-token');
    } catch (error) {
      throw error;
    }
  },

  async forgotPassword(email) {
    try {
      return await apiInstance.post('/auth/forgot-password', {
        queryParams: { email }
      });
    } catch (error) {
      throw error;
    }
  },
  async resendCode(email) {
    try {
      return await apiInstance.get('/auth/resend-reset-code', {
        queryParams: { email }
      });
    } catch (error) {
      throw error;
    }
  },

  async verifyCode(email, verificationCode) {
    try {
      return await apiInstance.post('/auth/verify-reset-code', {
        queryParams: { email, verificationCode }
      });
    } catch (error) {
      throw error;
    }
  },

  async resetPassword(email, newPassword) {
    try {
      return await apiInstance.put('/auth/reset-password', {
        params: { email, newPassword }
      });
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('Authorization');
  },

  getCurrentUser() {
    const email = localStorage.getItem('email');
    return email ? email : null;
  },

  getAuthHeader() {
    const email = this.getCurrentUser();
    const token = localStorage.getItem('Authorization');
    if (email && token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  },

};

export default authService; 