'use client'

import { useState } from 'react';
import User from "./components/user";
import useAuthStore from "../../store/authStore";

export default function Perfil() {
    const { logout, deleteUser, loading, user } = useAuthStore();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser();
        } catch (error) {
            console.error("Erro ao excluir o perfil:", error);
            setShowConfirmation(false);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="bg-[#1D1B7B] rounded-md p-8 w-full max-w-md text-white mt-10 mb-10">
            <User />
            <div className="mt-6 flex justify-center gap-4">
                <button
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-1 cursor-pointer"
                    onClick={logout}
                    disabled={loading}
                >
                    ↩ Sair
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 cursor-pointer"
                    onClick={handleDeleteClick}
                    disabled={loading}
                >
                    🗑 Excluir perfil
                </button>
                {user?.admin && (
                    <a
                        href="/painel" 
                        className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                        🛠 Painel
                    </a>
                )}

            </div>

            {showConfirmation && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Confirmar exclusão</h3>
                        <p className="mb-6">Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={handleCancelDelete}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleConfirmDelete}
                                disabled={loading}
                            >
                                {loading ? 'Excluindo...' : 'Confirmar exclusão'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}