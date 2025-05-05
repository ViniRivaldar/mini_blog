'use client'

import React, { useState } from 'react';
import CommentStore from '../../store/CommentStore';
import useAuthStore from '../../store/authStore';

export default function FormsComments({ postId, editComment = null, onCancelEdit = null }) {
    const { createComment, updateComment } = CommentStore();
    const { user } = useAuthStore();
    
    const [content, setContent] = useState(editComment ? editComment.content : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError('Você precisa estar logado para comentar');
            return;
        }

        if (!content.trim()) {
            setError('O comentário não pode estar vazio');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (editComment) {
                await updateComment(editComment.id, { content });
                if (onCancelEdit) onCancelEdit();
            } else {
                await createComment({ 
                    content,
                    postId
                });
                setContent(''); 
            }
        } catch (err) {
            setError(err.message || 'Erro ao processar comentário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            className="w-[1125px] bg-white flex flex-col p-10 mt-5"
            onSubmit={handleSubmit}
        >
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Deixe seu comentário"
                className="resize-none border-2 border-black bg-[#D9D9D9]
                focus:border-[#191970] focus:shadow-[0_0_5px_#191970] 
                outline-none p-10"
                disabled={loading || !user}
            />
            
            <div className="flex mt-5">
                <button
                    type="submit"
                    className="w-[200px] h-[50px] bg-[#191970] p-5 text-white 
                    flex items-center justify-center rounded 
                    hover:bg-[#7B68EE] transition-all duration-300
                    hover:shadow-lg hover:-translate-y-1 cursor-pointer
                    disabled:bg-gray-400 disabled:hover:transform-none disabled:hover:shadow-none"
                    disabled={loading || !user}
                >
                    {loading ? 'ENVIANDO...' : editComment ? 'ATUALIZAR' : 'COMENTAR'}
                </button>
                
                {editComment && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="w-[200px] h-[50px] bg-gray-300 p-5 text-gray-800 
                        flex items-center justify-center ml-4 rounded 
                        hover:bg-gray-400 transition-all duration-300
                        hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    >
                        CANCELAR
                    </button>
                )}
            </div>
            
            {!user && (
                <p className="mt-3 text-red-500">
                    Você precisa estar logado para comentar.
                </p>
            )}
        </form>
    );
}