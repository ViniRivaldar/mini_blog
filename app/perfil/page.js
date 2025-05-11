'use client'

import { useState, useEffect } from 'react';
import User from "./components/user";
import useAuthStore from "../../store/authStore";

export default function Perfil() {
    const { logout, deleteUser, loading, user } = useAuthStore();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const PAINEL_ORIGIN = process.env.NEXT_PUBLIC_URL;

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== PAINEL_ORIGIN) {
                return;
            }

            if (event.data?.type === 'REQUEST_AUTH_USER') {
                if (event.source && user) {
                    event.source.postMessage(
                        { type: 'AUTH_USER', payload: user },
                        event.origin
                    );
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [user, PAINEL_ORIGIN]);

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

    const handleOpenPanel = () => {
        const panelWindow = window.open(PAINEL_ORIGIN, '_blank');
        
        if (panelWindow && user) {
            setTimeout(() => {
                try {
                    panelWindow.postMessage(
                        { type: 'AUTH_USER', payload: user },
                        PAINEL_ORIGIN
                    );
                } catch (e) {
                    console.error("Erro ao enviar mensagem (1ª tentativa):", e);
                }
            }, 1000);
            
            setTimeout(() => {
                try {
                    if (!panelWindow.closed) {
                        panelWindow.postMessage(
                            { type: 'AUTH_USER', payload: user },
                            PAINEL_ORIGIN
                        );
                    }
                } catch (e) {
                    console.error("Erro ao enviar mensagem (2ª tentativa):", e);
                }
            }, 3000);
        }
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
                    <button
                    onClick={handleOpenPanel}
                    className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                        🛠 Painel
                    </button>
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