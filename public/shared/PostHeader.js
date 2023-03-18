import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import AVT from "../../public/img/default-avatar.png"
import { MoreDotIcon } from "../icons/icons"
import OverLayBlock from "./OverLayBlock"
import PostOptions from "./PostOptions"

function PostHeader ()
{

    const [showOptions, setShowOptions] = useState(false)

    const optionsRef = useRef(null)

    useEffect(() =>
    {
        function handleClickOutSide(e) {
            if(optionsRef.current && optionsRef.current.contains(e.target))
            {
                setShowOptions(false)
            }
        }

        document.addEventListener("click", handleClickOutSide)
        return () =>
        {
            document.removeEventListener("click", handleClickOutSide)
        }
    },[])

    return (
        <>
            <div className="w-full h-[56px] items-center flex justify-between">
                <div className="">
                    <div className="flex items-center">
                        <Image alt="avt" src={AVT} className="w-[32px] h-[32px] cursor-pointer"/>
                        <div className="font-[600] hover:text-[rgb(147,147,147)] cursor-pointer px-[10px]">skuukzky</div>
                        <span className="text-[rgb(142,142,142)] pr-[10px]">•</span>
                        <div className="text-[rgb(142,142,142)] tracking-widest">1h</div>
                    </div>
                </div>
                <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)] cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
                    {MoreDotIcon}
                </div>
            </div>
            {
                showOptions ?
                (
                    <div ref={optionsRef}>
                        <OverLayBlock><PostOptions close={() => setShowOptions(false)}/></OverLayBlock> 
                    </div>
                )
                :
                (<></>)
            }
        </>
    )
}

export default PostHeader