"use client"
import { useState } from "react";
import Link from "next/link";

import Modal from "./Modal";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import useAuthStore from "../../store/authStore";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex justify-center items-center">
      <div className="mr-[500px]">
        <Link href="/" className="text-white font-anton text-[29px] font-bold hover:text-black">
          LOGO
        </Link>
      </div>

      <nav className="flex gap-10 ml-10">
        {!user ? (
          <>
            <button onClick={() => setLoginModalOpen(true)} className="text-white hover:text-black cursor-pointer">
              LOGIN
            </button>
            <button onClick={() => setModalOpen(true)} className="text-white hover:text-black cursor-pointer">
              REGISTRE-SE
            </button>
          </>
        ) : (
          <div className="relative group">
            <img src="/avatar.png" alt="Perfil" className="w-10 h-10 rounded-full cursor-pointer" />
            <div className="absolute hidden group-hover:block bg-white shadow-md right-0 mt-2 rounded-md">
              <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">Perfil</Link>
              
            </div>
          </div>
        )}
      </nav>

      <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <FormLogin onClose={() => setLoginModalOpen(false)} />
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormRegister
          onSuccess={() => {
            setModalOpen(false);
            setLoginModalOpen(true); 
          }}
        />
      </Modal>
    </div>
  );
}
