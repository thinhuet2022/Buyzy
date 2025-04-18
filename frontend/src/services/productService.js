import api from './api';
import { requireAuth } from '../utils/authUtils';

const productService = {
  // Get all products with optional filters
  async getAllProducts(filters = {}) {
    try {
      return await api.get('/products', {
        queryParams: filters
      });
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      return await api.get('/products/:id', {
        pathVariables: { id }
      });
    } catch (error) {
      throw error;
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      requireAuth();
      return await api.post('/products', {
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
      return await api.put('/products/:id', {
        pathVariables: { id },
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
      return await api.delete('/products/:id', {
        pathVariables: { id }
      });
    } catch (error) {
      throw error;
    }
  },

  // Search products with pagination and filters
  async searchProducts({ query, page = 1, limit = 10, sortBy, sortOrder }) {
    try {
      return await api.get('/products/search', {
        queryParams: {
          q: query,
          page,
          limit,
          sortBy,
          sortOrder
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // Get products by category with pagination
  async getProductsByCategory(categoryId, { page = 1, limit = 10 }) {
    try {
      return await api.get('/categories/:categoryId/products', {
        pathVariables: { categoryId },
        queryParams: { page, limit }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default productService; 