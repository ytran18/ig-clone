import Link from "next/link"
import { useEffect, useState } from "react"
import { IgSidebar, IgIcon, HomeIcon, SearchIcon, Explore, ReelIcon, MessagesIcon, PostsIcon, NotificationIcon, MoreIcon, CreateIcon } from "../icons/icons"

function Sidebar ()
{
    const [state, setState] = useState(0)

    useEffect(() =>
    {
        state === 1 ? console.log("search") : console.log("notifications")
    },[state])

    return (
        <div className={`hidden md:flex md:flex-col md:justify-between md:items-center lg:flex lg:flex-col lg:justify-between lg:items-center md:w-[73px] h-full border-r-[1px] border-[rgb(219,219,219)] py-8 ${state === 1 ? "lg:w-[73px]]" : `${state === 2 ? "lg:w-[73px]" : "lg:w-[245px]"}`}`}>
            <div className="flex flex-col w-full">
                <Link className={`md:hidden lg:flex px-7 mb-8 ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`} href="/" >
                    {IgSidebar}
                </Link>
                <Link className={`md:flex justify-center mb-8 ${state === 1 ? "lg:flex" : `${state === 2 ? "lg:flex" : "lg:hidden"}`}`} href="/" >
                    {IgIcon}
                </Link>
                <div className="flex flex-col w-full">
                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{HomeIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Home</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{SearchIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Search</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{Explore}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Explore</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{ReelIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Reels</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{MessagesIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Messages</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{NotificationIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Notifications</div>
                    </Link>

                    <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                        <div className="lg:pl-2 flex md:justify-center md:items-center">{CreateIcon}</div>
                        <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>Create</div>
                    </Link>
                </div>  
            </div>
            <div className="flex flex-col w-full">
                <Link className="flex lg:mx-5 lg:h-[56px] md:h-[48px] lg:justify-start md:justify-center items-center hover:bg-[rgb(250,250,250)] rounded-[25px]" href="/">
                    <div className="lg:pl-2 flex md:justify-center md:items-center">{MoreIcon}</div>
                    <div className={`font-[500] ml-5 md:hidden lg:justify-center lg: items-center ${state === 1 ? "lg:hidden" : `${state === 2 ? "lg:hidden" : "lg:flex"}`}`}>More</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar