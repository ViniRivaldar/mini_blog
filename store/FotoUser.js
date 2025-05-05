import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import {axiosFotoUser} from '../config/axios'

import useAuthStore from './authStore'


const FotoUser = create(persist(
  (set,get)=>({
    foto: null,
    loading:false,
    erro:null,

    creteFoto: async (data) => {
      const { user } = useAuthStore.getState();          
        set({ loading: true, erro: null });
          
        try {
          const token = user?.token;          
            if (!token) {
              throw new Error('Usuário não autenticado');
            }
          
            const response = await axiosFotoUser.post('/fotouser', data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          
            const fotoUrl = response.data
          
            set({ foto: fotoUrl, loading: false });          
            useAuthStore.getState().setUser({
              ...user,
              fotoUrl: fotoUrl.url,
            });
          
            return response.data;
          } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erro ao postar uma foto';
            set({ erro: errorMessage, loading: false });
            throw err;
          }
      },
    deleteFoto: async () => {
      const { user } = useAuthStore.getState();
      const { foto } = get()          
      set({ loading: true, erro: null });          
      try {
        const token = user?.token;
        const fotoid = foto?.id;
        if (!token || !fotoid) {
          throw new Error('tente novamente');
        }  

        const response = await axiosFotoUser.delete(`/fotouser/${fotoid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          
        set({ foto: null, loading: false });
          
        useAuthStore.getState().setUser({
          ...user,
          fotoUrl: null,
        });
          
        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Erro ao excluir a foto';
        set({ erro: errorMessage, loading: false });
          throw err;
        }
      },
                   
    }),
    {
      name: 'foto-user-storage'
    }
))

export default FotoUser