import api from './api';
import {requireAuth} from '../utils/authUtils';
import axios from 'axios';
import apiInstance from './api';

const API_URL = import.meta.env.VITE_API_URL;
const baseURL =  API_URL || "/api/v1"
const userService = {
    async getProfile() {
        try {
            requireAuth();
            return await apiInstance.get('/users/me');
        } catch (error) {
            throw error;
        }
    },

    async getImageProfile() {
        try {
            requireAuth();
            return await apiInstance.get('/users/user-image');
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
            const response = await axios.post(`${baseURL}/users/update-user-image`, formData, {
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
                data: {currentPassword, newPassword}
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