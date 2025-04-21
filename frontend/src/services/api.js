import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Attach token before every request
apiInstance.interceptors.request.use(config => {
    const jwt_token = localStorage.getItem('Authorization');
    if (jwt_token) {
        config.headers.Authorization = `Bearer ${jwt_token}`;
    }
    return config;
});

// Handle error globally
apiInstance.interceptors.response.use(
    response => response.data,
    error => {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        return Promise.reject(errorMessage);
    }
);


export default apiInstance;
