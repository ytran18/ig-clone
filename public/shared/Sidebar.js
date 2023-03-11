import Link from "next/link"
import { IgSidebar, IgIcon, HomeIcon } from "../icons/icons"

function Sidebar ()
{

    const handleZoomIcon = (id) =>
    {
        const icon = document.getElementById(id)
        console.log(icon);
    }

    return (
        <div className="hidden md:flex md:flex-col md:justify-between md:items-center lg:flex lg:flex-col lg:justify-between lg:items-center md:w-[73px] lg:w-[245px] h-full border-r-[1px] border-[rgb(219,219,219)] py-8">
            <div className="flex flex-col w-full">
                <Link className="md:hidden lg:flex justify-center mb-8" href="/" >
                    {IgSidebar}
                </Link>
                <Link className="md:flex lg:hidden justify-center mb-8" href="/" >
                    {IgIcon}
                </Link>
                <div className="flex flex-col w-full items-center">
                    <Link className="flex items-center justify-center lg:w-[220px] md:w-[48px] md:h-[48px] lg:h-[56px] hover:bg-[rgb(250,250,250)] rounded-[25px]" onMouseEnter={handleZoomIcon("home")} href="/">
                        <div id="home" className="lg:mr-3 md:flex md:items-center md:justify-center transition-transform duration-300 transform">{HomeIcon}</div>
                        <div className="font-[500] ml-3 md:hidden lg:flex lg:justify-center lg: items-center">Home</div>
                    </Link>
                </div>  
            </div>
            <div className="">
                third
            </div>
        </div>
    )
}

export default Sidebar