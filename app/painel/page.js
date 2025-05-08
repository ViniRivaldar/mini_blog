import CardPostagen from "./components/CardPostagen"

export default function Painel(){
    return(
        <div className="w-[1192px] bg-[#191970] mt-10 mb-10 p-10">
            <h1 className="font-anton font-bold text-white text-5xl text-center mb-10">Postagens</h1>
            <CardPostagen/>
        </div>
    )
}