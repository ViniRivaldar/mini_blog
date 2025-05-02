import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import useAuthStore from "../../store/authStore";

export default function FormRegister() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const registerUser = useAuthStore((state) => state.register);
    const error = useAuthStore((state) => state.error);
    
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await registerUser(data);
            alert("Cadastro realizado com sucesso!");
        } catch (err) {
            console.error("Erro no cadastro:", err);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-semibold mb-4">Cadastre-se</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <div className="space-y-4">
                <Input
                    label="Nome"
                    name="name"
                    register={register("name", { required: "Nome é obrigatório" })}
                    error={errors.name?.message}
                />
                <Input
                    label="Username"
                    name="username"
                    register={register("username", { required: "Username é obrigatório" })}
                    error={errors.username?.message}
                />
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
                    error={errors.email?.message}
                />
                <Input
                    label="Senha"
                    name="password"
                    type="password"
                    register={register("password", { 
                        required: "Senha é obrigatória",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter pelo menos 6 caracteres"
                        }
                    })}
                    error={errors.password?.message}
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