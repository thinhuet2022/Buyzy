import apiInstance from './api';
import {requireAuth} from '../utils/authUtils';

const productService = {
    // Get all products with optional filters
    async getAllProducts(filters = {}) {
        try {
            return await apiInstance.get('/products/all-products', {
                queryParams: filters
            });
        } catch (error) {
            throw error;
        }
    },

    // Get product by ID
    async getProductById(id) {
        try {
            return await apiInstance.get(`/products/${id}`);
        } catch (error) {
            throw error;
        }
    },

    // Get recommended products
    async getMostPopularProducts() {
        try {
            return await apiInstance.get('/products/most-popular');
        } catch (error) {
            throw error;
        }
    },

    // Get featured products
    async getNewestProducts() {
        try {
            return await apiInstance.get('/products/newest-items');
        } catch (error) {
            throw error;
        }
    },

    // Create new product
    async createProduct(productData) {
        try {
            requireAuth();
            return await apiInstance.post('/products', {
                data: productData
            });
        } catch (error) {
            throw error;
        }
    },

    // Update product
    async updateProduct(id, productData) {
        try {
            requireAuth();
            return await apiInstance.put('/products/:id', {
                pathVariables: {id},
                data: productData
            });
        } catch (error) {
            throw error;
        }
    },

    // Delete product
    async deleteProduct(id) {
        try {
            requireAuth();
            return await apiInstance.delete('/products/:id', {
                pathVariables: {id}
            });
        } catch (error) {
            throw error;
        }
    },

    // Search products with pagination and filters
    async searchProducts(query, {page = 0, size = 12, sortBy, sortOrder}) {
        try {
            return await apiInstance.get('/products/search', {
                params: {
                    query: query,
                    page,
                    size,
                    sortBy,
                    sortOrder
                }
            });
        } catch (error) {
            throw error;
        }
    },

    // Get products by category with pagination
    async getProductsByCategory(categoryName, {page = 0, size = 12}) {
        try {
            return await apiInstance.get('/products/category', {
                params: {categoryName, page, size}
            });
        } catch (error) {
            throw error;
        }
    }
};

export default productService; 