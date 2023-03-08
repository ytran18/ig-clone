import Image from "next/image"

function Button ({ icon, content, backgroundColor, hoverColor, onClick, rounded, iconColor, contentColor, border })
{
    return (
        <div 
            className={`w-full h-full flex items-center select-none cursor-pointer justify-center bg-[${backgroundColor}] rounded-[${rounded}]
                ${hoverColor ? `hover:bg-[${hoverColor}]` : ""}
                ${border ? "border-[1px] border-[#333]" : ""}
            `}
            onClick={onClick}
        >
            { icon? (<Image className="w-[24px] h-[24px]" src={icon} alt="img" />) : (<></>)}
            <div 
                className={`text-${contentColor} text-[14px] font-[600] ${icon ? "ml-2" : ""}`}
            >
                {content}
            </div>
        </div>
    )
}

export default Button