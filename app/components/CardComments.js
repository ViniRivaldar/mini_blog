import Comment from "./Comment"
import FormsComments from "./FormsComments"

export default function CardComments(){
    return(
        <div className="w-[1192px] bg-[#D3D3D3] mb-10 p-10">
            <p className="text-[#070D21] text-center font-anton 
            text-[48px] font-normal leading-none"
            >Comentários</p>
           <FormsComments/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    )
}