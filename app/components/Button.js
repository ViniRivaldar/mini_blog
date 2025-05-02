export default function Button({text, onClick, disabled = false,type = "button"}){
    return (

        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-[200px] h-[50px] bg-[#191970] p-5 text-white 
            flex items-center justify-center mt-5 rounded 
            hover:bg-[#7B68EE] transition-all duration-300
            hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
            {text}
        </button>
    )
}