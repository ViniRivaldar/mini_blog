import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Button from "./Button";
import Input from "./Input";
import useAuthStore from "../../store/authStore";
import { handleApiError, parseError } from "../../utils/errorHandler";
import errorMessages from "../../utils/errorMessages";

export default function FormLogin({ onClose }) {
    const loginUser = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);
    const [authError, setAuthError] = useState(null);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState("");
  
    useEffect(() => {
        clearError();
        setAuthError(null);
    }, [clearError]);

    const onSubmit = async (data) => {
      try {
        clearError();
        await loginUser(data);
        setSuccessMessage("Login realizado com sucesso!");
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500); 
      } catch (err) {
        setAuthError(handleApiError(err));
      }
    };

    const renderErrors = () => {
        const errorMessages = Object.values(errors).map((error) => error.message);
        return errorMessages.length > 0 ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessages.join(", ")}
            </div>
        ) : null;
    };

    const renderSuccess = () => {
        return successMessage ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        ) : null;
    };

    const renderAuthError = () => {
        const errorMessage = authError || parseError(error);
        
        return errorMessage ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        ) : null;
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {renderErrors()}
        {renderSuccess()}
        {renderAuthError()}
            
        <div className="space-y-4">
            <Input
                label="Email"
                name="email"
                type="email"
                register={register("email", { 
                    required: errorMessages.validation.required("Email"),
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: errorMessages.validation.email
                    }
                })}
            />
            <Input
                label="Senha"
                name="password"
                type="password"
                register={register("password", { 
                    required: errorMessages.validation.required("Senha"),
                    minLength: {
                        value: 6,
                        message: errorMessages.validation.minLength("A senha", 6)
                    }
                })}
            />

            <div className="mt-6">
                <Button 
                    text={loading ? 'Entrando...' : 'Entrar'} 
                    type="submit"
                    disabled={loading}
                />
            </div>
        </div>
      </form>
    );
}