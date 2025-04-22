import apiInstance from './api';
import {requireAuth} from '../utils/authUtils';

const orderService = {
    async createOrder(orderData) {
        try {
            requireAuth();
            return await apiInstance.post('/orders/place-order', orderData);
        } catch (error) {
            throw error;
        }
    },

    async getOrders({page = 1, limit = 10, status, sortBy, sortOrder} = {}) {
        try {
            requireAuth();
            return await apiInstance.get('/orders', {
                queryParams: {
                    page,
                    limit,
                    status,
                    sortBy,
                    sortOrder
                }
            });
        } catch (error) {
            throw error;
        }
    },

    async getOrderById(orderId) {
        try {
            requireAuth();
            return await apiInstance.get('/orders/:orderId', {
                pathVariables: {orderId}
            });
        } catch (error) {
            throw error;
        }
    },

    async updateOrderStatus(orderId, status) {
        try {
            requireAuth();
            return await apiInstance.put('/orders/:orderId/status', {
                pathVariables: {orderId},
                data: {status}
            });
        } catch (error) {
            throw error;
        }
    },

    async cancelOrder(orderId) {
        try {
            requireAuth();
            return await apiInstance.put(`/orders/cancel-order/${orderId}`);
        } catch (error) {
            throw error;
        }
    },

    async getOrderHistory({page = 1, size = 10} = {}) {
        try {
            requireAuth();
            return await apiInstance.get('/orders/order-history', {
                params: {
                    page,
                    size
                }
            });
        } catch (error) {
            throw error;
        }
    },

    async trackOrder(orderId) {
        try {
            requireAuth();
            return await apiInstance.get('/orders/:orderId/tracking', {
                pathVariables: {orderId}
            });
        } catch (error) {
            throw error;
        }
    },

    async createPayment(amount, orderId) {
        try {
            requireAuth();
            return await apiInstance.get(`/payment/vn-pay?amount=${amount}&orderId=${orderId}`);
        } catch (error) {
            throw error;
        }
    }
};

export default orderService; 