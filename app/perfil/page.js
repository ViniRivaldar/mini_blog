'use client'

import User from "./components/user";
import useAuthStore from "../../store/authStore";
export default function Perfil(){

    const{logout} = useAuthStore()



    return(
        <div className="bg-[#1D1B7B] rounded-md p-8 w-full max-w-md text-white mt-10 mb-10">
            <User/>
            <div className="mt-6 flex justify-center gap-4">
                <button
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-1"
                    onClick={logout}
                >
                    ↩ Sair
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                >
                    🗑 Excluir perfil
                </button>
            </div>
        </div>
    )
}