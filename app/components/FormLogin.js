import Button from "./Button";
import Input from "./Input";

export default function FormLogin(){
    return(
        <form className="w-full">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <div className="space-y-4">
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
                    <Button text='Entrar'/>
                </div>
            </div>
        </form>
    )
}