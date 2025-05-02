"use client"
import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";

export default function Headers() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div className="mr-[500px]">
        <Link
          href="/"
          className="text-white text-center font-anton text-[29px] font-bold leading-normal hover:text-black"
        >
          LOGO
        </Link>
      </div>

      <nav className="flex gap-10 ml-10">
        <button
          onClick={()=>(setLoginModalOpen(true))}
          className="text-white text-center font-openSans text-[22px] font-semibold leading-normal hover:text-black"
        >
          LOGIN
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="text-white text-center font-openSans text-[22px] font-semibold leading-normal hover:text-black"
        >
          REGISTRE-SE
        </button>
      </nav>

      <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <FormLogin />
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormRegister />
      </Modal>
    </div>
  );
}