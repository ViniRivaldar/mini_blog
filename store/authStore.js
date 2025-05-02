import { create } from 'zustand';
import { axiosAuth } from '../config/axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  register: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axiosAuth.post('/register', userData);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  
  login: async (credentials) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axiosAuth.post('/login', credentials);
      set({ user: response.data, loading: false });
      console.log('logado')
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro no login';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  
  logout: async () => {
    set({ loading: true });
    
    try {
      await axiosAuth.post('/logout');
      set({ user: null, loading: false, error: null });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer logout';
      set({ error: errorMessage, loading: false });
    }
  },
  
  clearUser: () => set({ user: null, error: null }),
  
  clearError: () => set({ error: null })
}));

export default useAuthStore;