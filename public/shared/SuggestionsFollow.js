import Image from "next/image"

function SuggestionsFollow ({ AVT, name })
{
    return (
        <div className="w-full flex items-center text-[14px] mb-2">
            <div className="w-[80%] flex items-center">
                <Image alt="suga" src={AVT} className="w-[32px] h-[32px] rounded-[50px]"/>
                <div className="px-2 font-[600]">{name}</div>
            </div>
            <div className="w-[20%] text-[rgb(0,149,246)] font-[500] cursor-pointer hover:text-black">Follow</div>
        </div>
    )
}

export default SuggestionsFollow