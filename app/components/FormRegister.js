import Button from "./Button";
import Input from "./Input";

export default function FormRegister(){
    return(
        <form className="w-full">
            <h2 className="text-xl font-semibold mb-4">Cadastre-se</h2>
            <div className="space-y-4">
                <Input
                    label="Nome"
                    name="name"
                />
                <Input
                    label="Username"
                    name="username"
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                />
                <Input
                    label="Senha"
                    name="password"
                    type="password"
                />

                <div className="mt-6">
                    <Button text='Cadastrar'/>
                </div>
            </div>
        </form>
    )
}