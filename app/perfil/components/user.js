'use client';

import useAuthStore from '../../../store/authStore';
import FotoUser from '../../../store/FotoUser';
import { useState, useRef } from 'react';
import FormeEdits from './FormEdits';
import UploadFotoHiddenInput from './FormPhoto';

export default function User() {
  const { user } = useAuthStore();
  const { loading, deleteFoto } = FotoUser();
  const [isEditing, setIsEditing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const uploadRef = useRef();

  const handleClickAlterar = () => {
    uploadRef.current?.openFileDialog();
  };

  if (isEditing) {
    return <FormeEdits onCancel={() => setIsEditing(false)} />;
  }

  const fotoUrl = user?.fotoUrl;

  const handleDeleteFoto = async () => {
    try {
      await deleteFoto();
    } catch (err) {
      alert('Erro ao excluir foto');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Perfil</h2>

      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <UploadFotoHiddenInput
            ref={uploadRef}
            onStart={() => setLocalLoading(true)}
            onFinish={() => setLocalLoading(false)}
          />

          <div
            className={`w-28 h-28 bg-gray-300 rounded-full 
              flex items-center justify-center text-4xl text-gray-700 
              ${fotoUrl ? '' : 'cursor-pointer hover:bg-black'} 
              overflow-hidden`}
            onClick={fotoUrl ? undefined : handleClickAlterar}
          >
            {localLoading || loading ? (
              <span className="text-2xl animate-pulse">...</span>
            ) : fotoUrl ? (
              <img src={fotoUrl} alt="Foto do usuário" className="w-full h-full object-cover" />
            ) : (
              '👤'
            )}
          </div>

          <button className="text-sm text-red-600 hover:underline cursor-pointer" onClick={handleDeleteFoto}>
            Excluir foto
          </button>
        </div>

        <div className="bg-gray-300 text-black rounded-md p-4 flex flex-col gap-2 w-full">
          <p>
            <strong>Nome:</strong> {user?.name || 'N/A'}
          </p>
          <p>
            <strong>Username:</strong> {user?.userName || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <span className="font-semibold">{user?.email || 'N/A'}</span>
          </p>

          <button
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Editar perfil
          </button>
        </div>
      </div>
    </>
  );
}
