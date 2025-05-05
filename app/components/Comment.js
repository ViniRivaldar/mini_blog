'use client'

import React, { useState, useRef, useEffect } from 'react';
import useCommentsStore from '../../store/CommentStore';
import useAuthStore from '../../store/authStore';
import FormsComments from './FormsComments';

export default function Comment({ comment }) {
    const { deleteComment } = useCommentsStore();
    const { user } = useAuthStore();
    
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const optionsRef = useRef(null);
    
    const formattedDate = comment?.createdAt 
        ? new Date(comment.createdAt).toLocaleDateString('pt-BR')
        : new Date().toLocaleDateString('pt-BR');
    
    const isAuthor = user && comment && user.id === comment.userId;
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleDelete = async () => {
        if (!isAuthor || isDeleting) return;
        
        setIsDeleting(true);
        try {
            await deleteComment(comment.id);
        } catch (error) {
            console.error('Erro ao excluir comentário:', error);
            alert('Não foi possível excluir o comentário. Tente novamente.');
        } finally {
            setIsDeleting(false);
            setShowOptions(false);
        }
    };
    
    const handleEdit = () => {
        if (!isAuthor) return;
        
        setIsEditing(true);
        setShowOptions(false);
    };
    
    if (isEditing) {
        return <FormsComments 
            postId={comment.postId} 
            editComment={comment} 
            onCancelEdit={() => setIsEditing(false)} 
        />;
    }
    
    return (
        <div className="w-[1125px] h-[187px] border-[3px] border-black bg-white flex p-5 justify-between items-start mt-5">
            <div className="flex">
                <div className="w-[84px] h-[84px] bg-[#D9D9D9] rounded-full border border-black mr-5" />
                <div>
                    <p className="text-[#070D21] font-bold text-lg leading-tight">
                        {comment?.userName || 'Usuário'}
                    </p>
                    <p className="text-[#070D21] text-sm leading-tight mt-1 max-w-[880px]">
                        {comment?.content || 'Sem conteúdo'}
                    </p>
                </div>
            </div>
                
            <div className="flex flex-col items-end justify-between h-full">
                <p className="text-[#070D21] font-semibold text-base">{formattedDate}</p>
                
                {isAuthor && (
                    <div className="relative" ref={optionsRef}>
                        <button 
                            className="text-2xl font-bold text-[#070D21] cursor-pointer hover:text-[#191970]"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            •••
                        </button>
                        
                        {showOptions && (
                            <div className="absolute right-0 bottom-8 bg-white shadow-lg border border-gray-200 rounded p-2 w-32 z-10">
                                <button
                                    onClick={handleEdit}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Excluindo...' : 'Excluir'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}