export default function FormsComments(){
    return(
        <form className="w-[1125px] bg-white flex flex-col p-10 mt-5"
        >
            <textarea
            type="text"
            placeholder="Deixe seu comentário"
            className="resize-none border-2 border-black bg-[#D9D9D9]
            focus:border-[#191970] focus:shadow-[0_0_5px_#191970] 
            focus:border-blur-sm outline-none p-10"
            />
            <button
            className="w-[200px] h-[50px] bg-[#191970] p-5 text-white 
            flex items-center justify-center mt-5 rounded 
            hover:bg-[#7B68EE] transition-all duration-300
            hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
                COMENTAR
            </button>
        </form>
    )
}