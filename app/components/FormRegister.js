import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import useAuthStore from "../../store/authStore";
import { handleApiError, parseError } from "../../utils/errorHandler";
import errorMessages from "../../utils/errorMessages";

export default function FormRegister({ onSuccess }) {
    const registerUser = useAuthStore((state) => state.register);
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    useEffect(() => {
        if (clearError) clearError();
        setAuthError(null);
    }, [clearError]);
  
    const onSubmit = async (data) => {
      try {
        setIsSubmitting(true);
        if (clearError) clearError();
        setAuthError(null);
        
        await registerUser(data);
        
        setSuccessMessage("Cadastro realizado com sucesso!");
        
        setTimeout(() => {
            if (onSuccess) onSuccess();
        }, 1500);
        
      } catch (err) {
        setAuthError(handleApiError(err));
      } finally {
        setIsSubmitting(false);
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
        <h2 className="text-xl font-semibold mb-4">Cadastre-se</h2>

        {renderErrors()}
        {renderSuccess()}
        {renderAuthError()}

        <div className="space-y-4">
            <Input
                label="Nome"
                name="name"
                register={register("name", { 
                    required: errorMessages.validation.required("Nome") 
                })}
            />
            <Input
                label="Username"
                name="username"
                register={register("username", { 
                    required: errorMessages.validation.required("Username"),
                    pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Username deve conter apenas letras, números e underscore"
                    }
                })}
            />
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
                    text={isSubmitting ? 'Cadastrando...' : 'Cadastrar'} 
                    type="submit"
                    disabled={isSubmitting}
                />
            </div>
        </div>
      </form>
    );
}