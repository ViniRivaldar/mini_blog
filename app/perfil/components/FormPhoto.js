import { useRef, forwardRef, useImperativeHandle } from 'react';
import FotoUser from '../../../store/FotoUser';
import useAuthStore from '@/store/authStore';

const UploadFotoHiddenInput = forwardRef(({ onStart, onFinish }, ref) => {
  const fileInputRef = useRef(null);
  const { creteFoto, foto } = FotoUser();
  const { user } = useAuthStore();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('foto_user', file);
    formData.append('id', user.id);

    try {
      onStart?.();
      await creteFoto(formData);
    } catch (err) {
      console.error('Erro ao enviar foto', err);
    } finally {
      onFinish?.();
    }
  };

  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      fileInputRef.current?.click();
    },
  }));

  return (
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      disabled={!!foto}
      style={{ display: 'none' }}
    />
  );
});

export default UploadFotoHiddenInput;
