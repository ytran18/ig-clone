import { useState } from "react"
import Image from "next/image"

import { useUserPackageHook } from "../redux/hooks"

import GenderPopUp from "./GenderPopUp"
import OverLayBlock from "./OverLayBlock"

function EditProfile ()
{

    const user = useUserPackageHook()

    const [textArea, setTextArea] = useState("")
    const [countTextArea, setCountTextArea] = useState(0)
    const [gender, setGender] = useState("Prefer not to say")
    const [isGender, setIsGender] = useState(false)

    const handleTextArea = (e) =>
    {
        const value = e.target.value
        setTextArea(value)
        setCountTextArea(value?.length)
    }

    const handleGender = (data) =>
    {
        setGender(data)
        setIsGender(false)
    }

    const handleClose = () =>
    {
        setIsGender(false)
    }

    return (
        <>
            <div className="w-full h-full flex flex-col py-10">
                <div className="w-full flex items-center mb-4">
                    <div className="w-[40%] flex justify-end"> <Image alt="avt" className="w-[38px] h-[38px] rounded-full cursor-pointer" width={38} height={38} src={user?.avatar}/> </div>
                    <div className="w-full pl-8 text-[13px]">
                        <div className="font-[500]">{user?.username}</div>
                        <div className="text-[rgb(0,149,246)] font-bold hover:text-[rgb(1,55,107)] cursor-pointer">Change profile photo</div>
                    </div>
                </div>
                <div className="w-full flex mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Name</div>
                    <div className="w-full pl-8 flex flex-col">
                        <input className="w-[355px] h-[32px] border-[1px] border-[rgb(219,219,219)] px-4 mb-4" type={"text"} defaultValue={user?.name}/>
                        <p className="w-[355px] text-[12px] text-[rgb(115,115,115)] mb-2">{`Help people discover your account by using the name that you're known by: either your full name, nickname or business name.`}</p>
                        <p className="w-[355px] text-[12px] text-[rgb(115,115,115)]">{`You can only change your name twice within 14 days.`}</p>
                    </div>
                </div>
                <div className="w-full flex mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Username</div>
                    <div className="w-full pl-8">
                        <input className="w-[355px] h-[32px] border-[1px] border-[rgb(219,219,219)] px-4 mb-4 rounded-[5px]" type={"text"} defaultValue={user?.username}/>
                        <p className="w-[355px] text-[12px] text-[rgb(115,115,115)]">{`In most cases, you'll be able to change your username back to ${user?.username} for another 14 days.`}</p>
                    </div>
                </div>
                <div className="w-full flex mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Bio</div>
                    <div className="w-full pl-8">
                        <textarea maxLength={150} value={textArea} onChange={handleTextArea} className="w-[355px] h-[60px] rounded-[5px] border-[1px] border-[rgb(219,219,219)] px-[10px] py-[5px] mb-2"></textarea>
                        <p className="text-[12px] text-[rgb(115,115,115)] mb-8">{`${countTextArea} / 150`}</p>
                        <p className="text-[13px] font-semibold">Personal information</p>
                        <p className="text-[12px] text-[rgb(115,115,115)] w-[355px]">{`Provide your personal information, even if the account is used for a business, pet or something else. This won't be part of your public profile.`}</p>
                    </div>
                </div>
                <div className="w-full flex items-center mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Email address</div>
                    <div className="w-full pl-8">
                        <input defaultValue={user?.email} className="w-[355px] h-[32px] border-[1px] border-[rgb(219,219,219)] px-4 rounded-[5px]"/>
                    </div>
                </div>
                <div className="w-full flex items-center mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Phone number</div>
                    <div className="w-full pl-8">
                        <input placeholder={"Phone number"} className="w-[355px] h-[32px] border-[1px] border-[rgb(219,219,219)] px-4 rounded-[5px]"/>
                    </div>
                </div>
                <div className="w-full flex items-center mb-4">
                    <div className="w-[40%] flex justify-end font-bold">Gender</div>
                    <div className="w-full pl-8">
                        <input type="text" onClick={() => setIsGender(true)} value={gender} className="w-[355px] h-[32px] border-[1px] border-[rgb(219,219,219) px-4 rounded-[5px] outline-none hover:text-[rgb(128,128,128)]"/>
                    </div>
                </div>
            </div>

            {
                isGender ? 
                (
                    <div className="w-screen h-screen">
                        <OverLayBlock><GenderPopUp close={handleClose} genderValue={handleGender} /></OverLayBlock>
                    </div>
                )
                :
                (<></>)
            }
        </>
    )
}

export default EditProfile