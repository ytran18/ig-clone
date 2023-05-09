
//component
import Chat from "../public/shared/Chat"
import SideBar from "../public/shared/Sidebar"

function Messages() {
    return(
        <div className=" w-screen flex">
            <div className="">
                <SideBar/>
            </div>
            <div className="w-[80%] flex items-center justify-center bg-[#fafafa]">
                <div className="bg-white w-full h-[90%] m-8">
                    <Chat/>
                </div>
            </div>
        </div>
    )
}

export default Messages