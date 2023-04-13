import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import AVT from "../img/default-avatar.png"
import SuggestionsFollow from "./SuggestionsFollow"
import SwitchAccountPopUp from "./SwichAccountPopUp"
import OverLayBlock from "./OverLayBlock"

// redux
import { useUserPackageHook } from "../redux/hooks"


function Right ({ users })
{
    // user
    const user = useUserPackageHook()
    // router
    const router = useRouter()

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

    const handleAccountPage = () =>
    {
        router.push(`/user/${user?.username}`)
    }
    
    return (
        <>
            <div className="w-[319px] flex flex-col px-5">
                <div className="flex justify-between items-center h-[117px]">
                    <div className="flex items-center w-[80%]">
                        <div className="w-[56px] h-[56px]" onClick={handleAccountPage}><Image width={56} height={56} alt="avt" src={user?.avatar || AVT} className="w-full h-full rounded-full cursor-pointer"/></div>
                        <div className="mx-4 text-[14px]">
                            <div className="font-[600]">{user?.username}</div>
                            <div className="text-[rgb(172,172,172)]">{user?.name}</div>
                        </div>
                    </div>
                    <div className="text-[14px] w-[20%] text-[rgb(78,157,247)] font-[500] cursor-pointer" onClick={() => setIsSwitch(!isSwitch)}>Switch</div>
                </div>
                <div className="text-[14px] flex mb-[20px]">
                    <div className="text-[rgb(142,142,142)] font-[600] w-[80%]">Suggestions for you</div>
                    <div className="w-[20%]">See all</div>
                </div>
                <div className="w-full">
                    {
                        users?.map((item, index) =>
                        {
                            return (
                                <div key={index}> <SuggestionsFollow id={item?.userId} AVT={item?.avatar} name={item?.name} username={item?.username}/> </div>
                            )
                        })
                    }
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