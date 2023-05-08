function SettingsSidebarItems ({ onClick, text, index, select })
{
    return (
        <div 
            className={`w-full h-[45px] pl-[25px] flex items-center cursor-pointer ${select == index ? "text-black font-bold border-l-[2px] border-l-[rgb(0,0,0)]" : "text-[rgb(5,5,5)] hover:bg-[rgb(250,250,250)] hover:border-l-[2px] hover:border-l-[rgb(219,219,219)]"}`}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default SettingsSidebarItems