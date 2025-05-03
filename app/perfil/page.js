"use client";
import { useState, useEffect } from 'react';
import { MdAccountCircle, MdEdit, MdSave, MdLogout, MdDelete, MdCancel } from 'react-icons/md';
import useAuthStore from '../../store/authStore';
import { axiosAuth } from '../../config/axios'; 

export default function Perfil() {
  const { user, logout, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    userName: user?.userName || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        userName: user.userName || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'string' && value.trim() !== '') {
          payload[key] = value.trim();
        } else if (value !== null && value !== undefined && value !== '') {
          payload[key] = value;
        }
      });

      const response = await axiosAuth.put(`/register/${user.id}`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const responseData = response.data;
      
      console.log('Resposta da API:', responseData);
      
      const updatedUser = {
        ...user,
        name: responseData?.name || formData.name || user.name,
        userName: responseData?.userName || formData.userName || user.userName,
        email: responseData?.email || formData.email || user.email,
      };
      
      setUser(updatedUser);
      
      setFeedback({
        type: 'success',
        message: 'Perfil atualizado com sucesso!'
      });

      setFormData(prev => ({...prev, password: ''}));

      setTimeout(() => {
        setIsEditing(false);
        setFeedback({ type: '', message: '' }); // Limpa a mensagem
      }, 3000);
    } catch (err) {
      console.error('Erro completo:', err);
      
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Erro ao atualizar perfil'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    setLoading(true);
    try {
      await axiosAuth.delete(`/register/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      logout();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Erro ao excluir conta. Tente novamente.'
      });
      console.error('Erro ao excluir conta:', err);
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  const renderFeedback = () => {
    if (!feedback.message) return null;
    
    const bgColor = feedback.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
                    'bg-red-100 border-red-400 text-red-700';
    
    return (
      <div className={`${bgColor} border px-4 py-3 rounded mb-4 w-full`}>
        {feedback.message}
      </div>
    );
  };

  if (!user) {
    return (
      <div className='w-full max-w-6xl bg-[#191970] mt-8 p-5 rounded shadow-lg'>
        <div className='w-full bg-[#D3D3D3] flex flex-col items-center justify-center rounded p-8'>
          <h1 className='font-anton font-bold text-2xl mb-6'>Perfil</h1>
          <p className='font-opensans text-lg mb-6'>Usuário não autenticado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-6xl bg-[#191970] my-8 p-6 rounded shadow-lg'>
      <h1 className='font-anton font-bold text-white text-center text-3xl mb-6'>Perfil</h1>

      <div className='flex flex-col md:flex-row justify-center items-start gap-6'>
        {/* Foto de perfil */}
        <div className='w-full md:w-1/3 bg-[#D3D3D3] flex flex-col items-center justify-center p-6 rounded shadow-md'>
          <MdAccountCircle className='w-32 h-32 text-gray-700' />
          <button className='mt-4 text-blue-600 hover:text-blue-800 text-sm'>
            Alterar foto
          </button>
          <button className='mt-2 text-red-600 hover:text-red-800 text-sm'>
            Excluir foto
          </button>
        </div>

        {/* Formulário/Info */}
        <div className='w-full md:w-2/3 bg-[#D3D3D3] p-6 rounded shadow-md'>
          {renderFeedback()}
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className='w-full'>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2'>Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={loading}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2'>Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={loading}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2'>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={loading}
                />
              </div>

              <div className='mb-6'>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Senha: <span className='text-sm font-normal text-gray-500'>(deixe em branco para manter a atual)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={loading}
                />
              </div>

              <div className='flex justify-end space-x-3'>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name || '',
                      userName: user.userName || '',
                      email: user.email || '',
                      password: '',
                    });
                    setFeedback({ type: '', message: '' }); 
                  }}
                  className='flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200'
                  disabled={loading}
                >
                  <MdCancel className="mr-1" /> Cancelar
                </button>
                <button
                  type="submit"
                  className='flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'
                  disabled={loading}
                >
                  {loading ? (
                    <span>Salvando...</span>
                  ) : (
                    <>
                      <MdSave className="mr-1" /> Salvar
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className='space-y-4'>
              <div>
                <p className='text-gray-500 text-sm'>Nome</p>
                <p className='text-gray-800 font-semibold text-lg'>{user.name}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Username</p>
                <p className='text-gray-800 font-semibold text-lg'>{user.userName}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Email</p>
                <p className='text-gray-800 font-semibold text-lg'>{user.email}</p>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className='flex items-center mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'
              >
                <MdEdit className="mr-1" /> Editar perfil
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ações do usuário */}
      <div className='flex flex-wrap justify-center gap-4 mt-8'>
        <button
          onClick={logout}
          className='flex items-center text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition duration-200'
        >
          <MdLogout className="mr-1" /> Sair
        </button>
        
        {showDeleteConfirm ? (
          <div className='flex items-center space-x-2'>
            <span className='text-white'>Confirmar exclusão?</span>
            <button
              onClick={handleDeleteAccount}
              className='flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200'
              disabled={loading}
            >
              {loading ? 'Excluindo...' : 'Sim, excluir'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className='flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200'
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={handleDeleteAccount}
            className='flex items-center text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-200'
          >
            <MdDelete className="mr-1" /> Excluir perfil
          </button>
        )}
      </div>
    </div>
  );
}