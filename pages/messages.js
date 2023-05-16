//component
import Chat from "../public/shared/Chat"
import SideBar from "../public/shared/Sidebar"

import {useUserPackageHook} from "../public/redux/hooks"
import { useEffect } from "react"
import { useRouter } from "next/router"

function Messages() {

    const user = useUserPackageHook()

    const router = useRouter()

    useEffect(() => {
        if(user.userId == null) router.push("/auth/Login") 
    })

    return(
        <div className=" w-screen flex">
            <div className="">
                <SideBar/>
            </div>
            <div className="w-[80%] h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="bg-white w-full h-[90%] m-8 border-[1px]">
                    <Chat/>
                </div>
            </div>
        </div>
    )
}

export default Messages