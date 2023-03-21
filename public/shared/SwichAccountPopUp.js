import Image from "next/image"
import { CheckIcon } from "../icons/icons"
import AVT from "../img/default-avatar.png"

function SwitchAccountPopUp ()
{
    return (
        <>
            <div className="w-[400px] flex flex-col justify-between bg-white h-[246px] rounded-[15px]">
                <div className="h-[42px] w-full flex justify-center items-center font-[600] border-b-[1px] border-[rgb(237,237,237)]">Switch accounts</div>
                <div className="w-full h-full px-2 py-2 flex justify-between cursor-pointer">
                    <div className="flex items-center">
                        <Image alt="img" src={AVT} className="w-[56px] h-[56px]"/>
                        <div className="mx-2 font-[600]">jineu13</div>
                    </div>
                    <div className="flex items-center">
                        {CheckIcon}
                    </div>
                </div>
                <div className="h-[42px] w-full flex justify-center items-center font-[600] border-t-[1px] border-[rgb(237,237,237)] text-[rgb(0,148,246)] hover:text-black cursor-pointer">Log In to an Existing Account</div>
            </div>
        </>
    )
}

export default SwitchAccountPopUp