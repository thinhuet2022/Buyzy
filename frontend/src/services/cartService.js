import apiInstance from './api';
import {requireAuth} from '../utils/authUtils';

const cartService = {
    async getCart() {
        try {
            requireAuth();
            return await apiInstance.get('/cart/items');
        } catch (error) {
            throw error;
        }
    },

    async getCartItemCount() {
        try {
            requireAuth();
            return await apiInstance.get('/cart/cart-size');
        } catch (error) {
            throw error;
        }
    },

    async addToCart(productId, quantity = 1, selectedVariantId, sku) {
        try {
            requireAuth();
            return await apiInstance.post('/cart/add', {
                productId,
                quantity,
                selectedVariantId,
                sku
            });
        } catch (error) {
            throw error;
        }
    },

    async updateCartItem(cartItemId, quantity) {
        try {
            requireAuth();
            return await apiInstance.put(`/cart/update/${cartItemId}?quantity=${quantity}`);
        } catch (error) {
            throw error;
        }
    },

    async removeFromCart(cartItemId) {
        try {
            requireAuth();
            return await apiInstance.put(`/cart/remove/${cartItemId}`);
        } catch (error) {
            throw error;
        }
    },

    async clearCart() {
        try {
            requireAuth();
            return await apiInstance.put('/cart/clear');
        } catch (error) {
            throw error;
        }
    },

    async clearCartItems(checkoutItemRequests) {
        try {
            requireAuth();
            return await apiInstance.put('/cart/remove-checkout-item', checkoutItemRequests);
        } catch (error) {
            throw error;
        }
    },

    async getCheckoutItems(data) {
        try {
            requireAuth();
            return await apiInstance.post('/cart/checkout', data);
        } catch (error) {
            throw error;
        }
    }
};

export default cartService;