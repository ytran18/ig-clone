//component
import Chat from "../public/shared/Chat"
import SideBar from "../public/shared/Sidebar"
import NewMessage from "../public/shared/NewMessage"

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
        <div className=" w-screen flex">
            <div className="">
                <SideBar/>
            </div>
            <div className="w-[80%] h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="bg-white w-full h-[90%] m-8 border-[1px]">
                    <Chat handleNewMessage = {handleNewMessage} />
                </div>
            </div>
            <div className={newMessage ? "block" : "hidden"}>
                <NewMessage handleClose = {handleNewMessage} />
            </div>
        </div>
    )
}

export default Messages