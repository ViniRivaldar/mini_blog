import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {axiosAuth} from '../config/axios'



const useAuthStore = create(persist(
  (set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (userData) => {
      set({ loading: true, error: null });

      try {
        const response = await axiosAuth.post('/register', userData);
        set({ loading: false }); 
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
        const user = {
          token: response.data.token,
          id: response.data.Id,
          name: response.data.Name,
          userName: response.data.userName,
          email: response.data.Email,
          admin: response.data.Admin,
        };
        set({ user, loading: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro no login';
        set({ error: errorMessage });
        throw error;
      }finally{
       set({loading: false})
      }
    },

    logout:() => {
      set({ user: null, error: null })
      window.location.href = '/';
    },

    setUser: (user) => set({ user }),

    clearError: () => set({ error: null }),
  }),
  {
    name: 'auth-storage',
    getStorage: () => localStorage,
  }
));

export default useAuthStore;
