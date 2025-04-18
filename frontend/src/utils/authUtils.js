import authService from '../services/authService';

export const isAuthenticated = () => {
  return authService.getCurrentUser() !== null;
};

export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new Error('Authentication required');
  }
}; 