import api from './api';
import { requireAuth } from '../utils/authUtils';
import axios from 'axios';
import apiInstance from './api';

const userService = {
  async getProfile() {
    try {
      requireAuth();
      return await apiInstance.get('/users/me');
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(userData) {
    try {
      requireAuth();
      return await apiInstance.post('/users/change-profile', userData);
    } catch (error) {
      throw error;
    }
  },

  async updateProfileImage(file) {
    try {
      requireAuth();
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post('http://localhost:8080/api/v1/users/update-user-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async changePassword(currentPassword, newPassword) {
    try {
      requireAuth();
      return await api.put('/users/password', {
        data: { currentPassword, newPassword }
      });
    } catch (error) {
      throw error;
    }
  },

  async updateAddress(addressData, email) {
    try {
      requireAuth();
      return await apiInstance.post('/users/update-address', addressData, {
        params: {
          email
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getAddress() {
    try {
      requireAuth();
      return await apiInstance.get('/users/get-address');
    } catch (error) {
      throw error;
    }
  }
};

export default userService; 