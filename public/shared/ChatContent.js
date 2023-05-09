
// icon/image
import Image from "next/image"
import XinSoo from "../icons/xinsoo.jpg"
import {Phone, VideoCamera, MoreDotIcon, Photo, LoveIcon} from "../icons/icons"
import { useState } from "react"

function ChatContent() {

    const [send, setSend] = useState(false)

    const handleChange = (e) => {
        if(e.target.value == ""){
            setSend(false)
        }else{
            setSend(true)
        }
    }

    return(
        <div className="w-full h-full">
            <div className="h-[10%] border-b-[1px] flex items-center justify-between px-4">
                <div className="flex items-center">
                    <Image src={XinSoo} className="max-h-[30px] max-w-[30px] rounded-full mr-3" />
                    <div className="text-black font-semibold cursor-pointer hover:text-[#777373c6]">xinsooo</div>
                </div>
                <div className="flex items-center justify-around w-[150px]">
                    <div className=" cursor-pointer">{Phone}</div>
                    <div className=" cursor-pointer">{VideoCamera}</div>
                    <div className=" cursor-pointer"> {MoreDotIcon} </div>
                </div>
            </div>
            <div className="h-[90%]">
                <div className="h-[80%]">
                    <div className=" my-4 mx-4 w-fit h-auto rounded-xl border-[1px] px-3 py-2">
                        hello
                    </div>
                    <div className="my-4 mx-4 w-fit h-auto rounded-xl border-[1px] float-right px-3 py-2 flex ">Homnay toi buon</div>
                </div>
                <div className="h-[20%] flex items-center justify-center">
                    <div className=" rounded-3xl border-[1px] w-[90%] h-[50%] flex items-center justify-between px-6">
                        <input onChange={handleChange} className=" outline-none w-[90%]" placeholder="Messages...."/>
                        <div className={send ? "hidden" : "flex w-[10%] justify-between"}>
                            <div>{Photo}</div>
                            <div> {LoveIcon} </div>
                        </div>
                        <div className={send ? "w-[10%] text-blue-400" : "hidden"}>
                            Send
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContent