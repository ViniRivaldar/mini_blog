import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosComments } from "@/config/axios";
import useAuthStore from "./authStore";

const CommentStore = create(
  persist(
    (set, get) => ({
      comments: [],
      comment: null,
      loading: false,
      error: null,

      fetchComments: async () => {
        set({ loading: true, error: null });

        try {
          const response = await axiosComments.get("/comments");
          set({ comments: response.data, loading: false });
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Erro ao buscar comentários";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      fetchCommentById: async (commentId) => {
        set({ loading: true, error: null });

        try {
          const response = await axiosComments.get(`/comments/${commentId}`);
          set({ comment: response.data, loading: false });
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Erro ao buscar comentário";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      createComment: async (commentData) => {
        const { user } = useAuthStore.getState();
        set({ loading: true, error: null });

        try {
          const token = user?.token;
          
          if (!token) {
            throw new Error("Usuário não autenticado");
          }

          const response = await axiosComments.post("/comments", commentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set((state) => ({ 
            comments: [...state.comments, response.data],
            loading: false 
          }));
          
          return response.data;
        } catch (error) {
          console.error("Erro ao criar comentário:", error);
          const errorMessage = error.response?.data?.message || "Erro ao criar comentário";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      updateComment: async (commentId, commentData) => {
        const { user } = useAuthStore.getState();
        set({ loading: true, error: null });

        try {
          const token = user?.token;
          
          if (!token) {
            throw new Error("Usuário não autenticado");
          }

          const response = await axiosComments.put(`/comments/${commentId}`, commentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set((state) => ({
            comments: state.comments.map((comment) => 
              comment.id === commentId ? response.data : comment
            ),
            loading: false,
          }));
          
          return response.data;
        } catch (error) {
          console.error("Erro ao atualizar comentário:", error);
          const errorMessage = error.response?.data?.message || "Erro ao atualizar comentário";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      deleteComment: async (commentId) => {
        const { user } = useAuthStore.getState();
        set({ loading: true, error: null });

        try {
          const token = user?.token;
          
          if (!token) {
            throw new Error("Usuário não autenticado");
          }

          await axiosComments.delete(`/comments/${commentId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set((state) => ({
            comments: state.comments.filter((comment) => comment.id !== commentId),
            loading: false,
          }));
          
          return { success: true, message: "Comentário excluído com sucesso" };
        } catch (error) {
          console.error("Erro ao excluir comentário:", error);
          const errorMessage = error.response?.data?.message || "Erro ao excluir comentário";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      resetComment: () => set({ comment: null }),
    }),
    {
      name: "comments-storage",
      getStorage: () => localStorage,
    }
  )
);

export default CommentStore;