import api from './api';
import { requireAuth } from '../utils/authUtils';

const cartService = {
  async getCart() {
    try {
      requireAuth();
      return await api.get('/cart');
    } catch (error) {
      throw error;
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      requireAuth();
      return await api.post('/cart/items', {
        data: { productId, quantity }
      });
    } catch (error) {
      throw error;
    }
  },

  async updateCartItem(cartItemId, quantity) {
    try {
      requireAuth();
      return await api.put('/cart/items/:cartItemId', {
        pathVariables: { cartItemId },
        data: { quantity }
      });
    } catch (error) {
      throw error;
    }
  },

  async removeFromCart(cartItemId) {
    try {
      requireAuth();
      return await api.delete('/cart/items/:cartItemId', {
        pathVariables: { cartItemId }
      });
    } catch (error) {
      throw error;
    }
  },

  async clearCart() {
    try {
      requireAuth();
      return await api.delete('/cart');
    } catch (error) {
      throw error;
    }
  },

  async applyCoupon(couponCode) {
    try {
      requireAuth();
      return await api.post('/cart/coupon', {
        data: { couponCode }
      });
    } catch (error) {
      throw error;
    }
  },

  async removeCoupon() {
    try {
      requireAuth();
      return await api.delete('/cart/coupon');
    } catch (error) {
      throw error;
    }
  }
};

export default cartService; 