//component
import Chat from "../public/shared/Chat"
import SideBar from "../public/shared/Sidebar"
import NewMessage from "../public/shared/NewMessage"
import MobileSidebar from "../public/shared/MobileSidebar"


import {useUserPackageHook} from "../public/redux/hooks"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

function Messages() {

    const user = useUserPackageHook()

    const router = useRouter()

    const [newMessage, setNewMessage] = useState(false)

    useEffect(() => {
        if(user.userId == null) router.push("/auth/Login") 
    })

    const handleNewMessage = () => {
        setNewMessage(!newMessage)
    }

    return(
        <div className=" w-screen sm:flex">
            <div className="hidden sm:block">
                <SideBar/>
            </div>
            <div className="w-full sm:w-[80%] h-screen sm:flex sm:items-center sm:justify-center bg-[#fafafa]">
                <div className="bg-white w-full h-[95%] sm:m-8 border-[1px]">
                    <Chat handleNewMessage = {handleNewMessage} />
                </div>
            </div>
            <div className={newMessage ? "block" : "hidden"}>
                <NewMessage handleClose = {handleNewMessage} />
            </div>

            <div className="fixed bottom-3 right-0 left-0 sm:hidden">
                <MobileSidebar/>
            </div>
        </div>
    )
}

export default Messages