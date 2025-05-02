import Image from "next/image"
import Link from "next/link"

export default function CardHome(){
    return(
        <Link href='#'
            className="flex justify-center gap-10 bg-[#D3D3D3] mb-10 p-10
            transition-all duration-300 hover:bg-[#c0c0c0] hover:shadow-lg 
            hover:-translate-y-1"
        >
            <Image
            src='/download.jpg'
            alt="imagen"
            width={499}
            height={153}
            />
            <div className="w-[499px] h-[153px] flex flex-col">
                <h1 className="font-openSans text-primary text-center text-[32px] 
                    font-bold leading-[30px] mb-5"
                >
                    Treino do Corinthians: Memphis volta a trabalhar 
                    com bola e pode ser reforço contra o Inter
                </h1>

                <p className="font-openSans text-primary text-[16px] font-normal">
                    Atacante é liberado para treinar com o restante 
                    do grupo depois de se recuperar dos traumas sofridos 
                    no pé direito e perna direita; Gustavo Henrique 
                    passará por cirurgia e é baixa
                </p>

            </div>
        </Link>
    )
}