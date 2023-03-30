import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import AVT from "../img/default-avatar.png"
import SuggestionsFollow from "./SuggestionsFollow"
import SwitchAccountPopUp from "./SwichAccountPopUp"
import OverLayBlock from "./OverLayBlock"

import AVT01 from "../data-test/assets/img/Hobi-2.jpeg"
import AVT02 from "../data-test/assets/img/Jin-4.jpeg"
import AVT03 from "../data-test/assets/img/JK-2.jpeg"
import AVT04 from "../data-test/assets/img/Suga_4.jpeg"
import AVT05 from "../data-test/assets/img/NamJoon-2.jpeg"

function Right ()
{

    const [isSwitch, setIsSwitch] = useState(false)

    const switchRef = useRef(null)

    useEffect(() =>
    {
        function handleClickOutSide (e) {
            if(switchRef.current && switchRef.current.contains(e.target))
            {
                setIsSwitch(false)
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
            <div className="w-[319px] flex flex-col px-5">
                <div className="flex justify-between items-center h-[117px]">
                    <div className="flex items-center w-[80%]">
                        <div className="w-[56px] h-[56px]"><Image alt="avt" src={AVT} className="w-full h-full"/></div>
                        <div className="mx-4 text-[14px]">
                            <div className="font-[600]">jineu13</div>
                            <div className="text-[rgb(172,172,172)]">Jin___Eu</div>
                        </div>
                    </div>
                    <div className="text-[14px] w-[20%] text-[rgb(78,157,247)] font-[500] cursor-pointer" onClick={() => setIsSwitch(!isSwitch)}>Switch</div>
                </div>
                <div className="text-[14px] flex mb-[20px]">
                    <div className="text-[rgb(142,142,142)] font-[600] w-[80%]">Suggestions for you</div>
                    <div className="w-[20%]">See all</div>
                </div>
                <div className="w-full">
                    <SuggestionsFollow AVT={AVT01} name="urmyhope" />
                    <SuggestionsFollow AVT={AVT02} name="Jin" />
                    <SuggestionsFollow AVT={AVT03} name="J.K" />
                    <SuggestionsFollow AVT={AVT04} name="agustd" />
                    <SuggestionsFollow AVT={AVT05} name="rkive" />
                </div>
            </div>

            <div ref={switchRef}>
                {
                    isSwitch ? (
                        <OverLayBlock><SwitchAccountPopUp /></OverLayBlock>
                    )
                    :
                    (<></>)
                }
            </div>
        </>
    )
}

export default Right