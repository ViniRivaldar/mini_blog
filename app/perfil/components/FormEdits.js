'use client';

import { useForm } from 'react-hook-form';
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";

export default function FormEdits({ onCancel }) {
  const { EditUser, user, loading } = useAuthStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setFormError("");
      await EditUser(data);
      onCancel()
    } catch (err) {
      setFormError(err?.response?.data?.message || "Erro ao atualizar perfil.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 text-black rounded-md p-4 flex flex-col gap-2 w-full">
      <h1 className="font-anton font-bold text-center">Edite seu Perfil</h1>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {formError}
        </div>
      )}

      <p>
        <strong>Nome:</strong>
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={user?.name || ""}
          {...register("name", { required: "Nome é obrigatório" })} 
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </p>
      <p>
        <strong>Username:</strong>
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={user?.username || ""}
          {...register("username", { required: "Username é obrigatório" })} 
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
      </p>
      <p>
        <strong>Email:</strong>
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email" 
          defaultValue={user?.email || ""}
          {...register("email", { 
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })} 
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </p>
      <p>
        <strong>Senha:</strong>
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password" 
          id="password"
          autoComplete="current-password"
          placeholder="Digite sua senha para confirmar alterações" 
          {...register("password", { required: "Senha é obrigatória para confirmar alterações" })}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </p>

      <div className="flex justify-center items-center gap-10">
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 px-4 py-1 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "SALVANDO..." : "SALVAR"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          CANCELAR
        </button>
      </div>
    </form>
  );
}