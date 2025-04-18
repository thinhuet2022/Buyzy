import api from './api';
import { requireAuth } from '../utils/authUtils';

const orderService = {
  async createOrder(orderData) {
    try {
      requireAuth();
      return await api.post('/orders', {
        data: orderData
      });
    } catch (error) {
      throw error;
    }
  },

  async getOrders({ page = 1, limit = 10, status, sortBy, sortOrder } = {}) {
    try {
      requireAuth();
      return await api.get('/orders', {
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
      return await api.get('/orders/:orderId', {
        pathVariables: { orderId }
      });
    } catch (error) {
      throw error;
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      requireAuth();
      return await api.put('/orders/:orderId/status', {
        pathVariables: { orderId },
        data: { status }
      });
    } catch (error) {
      throw error;
    }
  },

  async cancelOrder(orderId) {
    try {
      requireAuth();
      return await api.put('/orders/:orderId/cancel', {
        pathVariables: { orderId }
      });
    } catch (error) {
      throw error;
    }
  },

  async getOrderHistory({ page = 1, limit = 10, startDate, endDate } = {}) {
    try {
      requireAuth();
      return await api.get('/orders/history', {
        queryParams: {
          page,
          limit,
          startDate,
          endDate
        }
      });
    } catch (error) {
      throw error;
    }
  },

  async trackOrder(orderId) {
    try {
      requireAuth();
      return await api.get('/orders/:orderId/tracking', {
        pathVariables: { orderId }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default orderService; 