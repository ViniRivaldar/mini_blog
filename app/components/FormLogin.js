import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import useAuthStore from "../../store/authStore";

export default function FormLogin({ onClose }) {
    const loginUser = useAuthStore((state) => state.login);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const onSubmit = async (data) => {
      try {
        setIsSubmitting(true); 
        await loginUser(data);
        if (onClose) onClose(); 
      } catch (err) {
        console.error("Erro no login:", err);
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
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {renderErrors()}
            
        <div className="space-y-4">
            <Input
                label="Email"
                name="email"
                type="email"
                register={register("email", { 
                    required: "Email é obrigatório",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                    }
                })}

            />
            <Input
                label="Senha"
                name="password"
                type="password"
                register={register("password", { 
                    required: "Senha é obrigatória"
                })}
            />

            <div className="mt-6">
                <Button 
                    text={isSubmitting ? 'Entrando...' : 'Entrar'} 
                    type="submit"
                    disabled={isSubmitting}
                />
            </div>
        </div>
      </form>
    );
}
