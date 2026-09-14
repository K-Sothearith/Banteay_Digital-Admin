import { api } from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.auth.login({ email, password });
    if (response.user?.role !== 'ADMIN') {
      return { success: false, message: 'This account does not have administrator access.' };
    }
    return { success: true, user: response.user };
  },
  logout: () => api.auth.logout(),
  getCurrentUser: async () => {
    const response = await api.auth.me();
    return response.user;
  },
};

export default authService;
