
//icon/images
import {  } from "../icons/icons"
import ChatUser from "./ChatUser"

function Chat() {
    return(
        <div className="w-full h-full flex">
            <div className="w-[30%] h-full border-[1px]">
                <div className="h-[10%] border-[1px] flex items-center justify-center">
                    <div className="text-black font-semibold">username</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div className="h-[90%]"> 
                    <ChatUser/>
                </div>
            </div>
            <div className="w-[70%] h-full">
                Chat
            </div>
        </div>
    )
}

export default Chat