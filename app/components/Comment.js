export default function Comment(){
    return(
        <div className="w-[1125px] h-[187px] border-[3px] border-black bg-white flex p-5 justify-between items-start mt-5">
            <div className="flex">
                <div className="w-[84px] h-[84px] bg-[#D9D9D9] rounded-full border border-black mr-5" />
                <div>
                    <p className="text-[#070D21] font-bold text-lg leading-tight">userName</p>
                    <p className="text-[#070D21] text-sm leading-tight mt-1 max-w-[880px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac magna a tortor
                        tincidunt egestas. Donec euismod, velit eget varius efficitur, ante odio pretium
                        arcu, eget faucibus felis arcu a nisi. Mauris vel turpis nec libero tincidunt
                        efficitur. In ut nisl nec erat vulputate tincidunt. Donec vel sagittis ante. Integer
                        consequat justo eget est malesuada, sed tincidunt felis laoreet. Pellentesque ut
                        purus malesuada, pretium libero non, malesuada dui.
                    </p>
                </div>
            </div>
                
            <div className="flex flex-col items-end justify-between h-full">
                <p className="text-[#070D21] font-semibold text-base">2/12/25</p>
                <div className="text-2xl font-bold text-[#070D21]">•••</div>
            </div>
        </div>
    )
}