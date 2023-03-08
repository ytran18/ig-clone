function Button ({ icon, content, backgroundColor, hoverColor, onClick, rounded, iconColor, contentColor })
{
    return (
        <div 
            className={`w-full h-full flex items-center select-none cursor-pointer justify-center bg-[${backgroundColor}] rounded-[${rounded}]
                ${hoverColor ? `hover:bg-[${hoverColor}]` : ""}
            `}
            onClick={onClick}
        >
            { icon? (<div className={`text-${iconColor} mr-1`}>{icon}</div>) : (<></>)}
            <div 
                className={`text-${contentColor} text-[14px] font-[600] ${icon ? "ml-1" : ""}`}
            >
                {content}
            </div>
        </div>
    )
}

export default Button