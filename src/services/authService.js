// Mock Authentication Service for Banteay Digital Admin

import { currentAdmin } from '../data/mockData';

export const authService = {
  login: async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Accept valid format credentials for mock development
    if (email && password) {
      localStorage.setItem('bd-admin-auth', 'true');
      return { success: true, user: currentAdmin };
    }
    return { success: false, message: 'Invalid email or password' };
  },

  logout: async () => {
    localStorage.removeItem('bd-admin-auth');
    return { success: true };
  },

  getCurrentUser: () => {
    const isAuth = localStorage.getItem('bd-admin-auth') !== 'false';
    return isAuth ? currentAdmin : null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('bd-admin-auth') !== 'false';
  }
};

export default authService;
