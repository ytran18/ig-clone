

// icon/image
import Image from "next/image"
import XinSoo from "../icons/xinsoo.jpg"

function ChatUser(){
    return(
        <div className="flex items-center w-full p-2 hover:bg-[#efefef]">
            <Image src={XinSoo} className=" rounded-full max-w-[50px] max-h-[50px] mr-4" />
            <div className="">
                <div className="text-black font-semibold">xinsooo</div>
                <div className=" text-[#73737c] text-[14px]">You're so beautifull</div>
            </div>
        </div>
    )
}

export default ChatUser