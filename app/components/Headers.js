import Link from "next/link"

export default function Headers(){
    return(
        <div className="flex justify-center items-center">
            <div className="mr-[500px]">
                <Link href='/' 
                className="text-white 
                text-center font-anton
                text-[29px] font-bold 
                leading-normal hover:text-black"
                >
                    LOGO
                </Link>
            </div>
            <nav className="flex gap-10 ml-10">
                <Link href='#'
                className="text-white 
                text-center font-openSans 
                text-[22px] font-semibold 
                leading-normal hover:text-black"
            >
                LOGIN
            </Link>
                <Link href='#'
                className="text-white 
                text-center font-openSans 
                text-[22px] font-semibold 
                leading-normal hover:text-black"
            >
                REGISTRE-SE
            </Link>
            </nav>
        </div>
    )
}