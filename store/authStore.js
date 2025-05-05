import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosAuth } from '../config/axios';

const useAuthStore = create(persist(
  (set, get) => ({
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

    EditUser: async (userData) => {
      set({ loading: true, error: null });
    
      try {
        const token = get().user?.token;
        const userId = get().user?.id;
        
        if (!token || !userId) {
          throw new Error('Usuário não autenticado');
        }
        
        const dataToSend = {
          ...userData,
          username: userData.username
        };
        
        const response = await axiosAuth.put(`/register/${userId}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const updatedUser = {
          ...get().user,
          name: userData.name || get().user.name,
          username: userData.username || get().user.username, 
          userName: userData.username || get().user.userName, 
          email: userData.email || get().user.email,
        };
    
        set({ user: updatedUser, loading: false });
        return response.data;
      } catch (error) {
        console.error('Erro completo:', error);
        const errorMessage = error.response?.data?.message || 'Erro ao editar usuário';
        set({ error: errorMessage, loading: false });
        throw error;
      }
    },

    deleteUser: async () => {
      set({ loading: true, error: null });
      
      try {
        const token = get().user?.token;
        const userId = get().user?.id;
        
        if (!token || !userId) {
          throw new Error('Usuário não autenticado');
        }
        
        const response = await axiosAuth.delete(`/register/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('foto-user-storage');
        
        set({ user: null, loading: false });
        window.location.href = '/';
        return response.data;
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário';
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
          username: response.data.userName, 
          userName: response.data.userName, 
          email: response.data.Email,
          admin: response.data.Admin,
        };
        set({ user, loading: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro no login';
        set({ error: errorMessage, loading: false });
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('foto-user-storage');
      
      set({ user: null, error: null });
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