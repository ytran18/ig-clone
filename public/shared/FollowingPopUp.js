import Image from "next/image"
import { CloseIcon } from "../icons/icons"
import Messi from "../icons/messi.jpg"


function FollowingPopUp( {handleClose} ) {
    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(35,35,35,0.16)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl">
            <div className="w-[440px] h-[440px] bg-white rounded-2xl">
                <div className="flex h-[10%] items-center justify-center border-b-[1px]">
                    <div className="w-[90%] text-center font-semibold text-[16px]">Following</div> 

                    <div 
                        className="float-right font-bold cursor-pointer"
                        onClick={handleClose}
                    >
                        {CloseIcon}
                    </div>
                </div>

                <div className="h-[10%] border-b-[1px] flex items-center justify-center">
                    <div className="w-[90%] text-center text-[16px] font-semibold ml-[-20px]">People</div>
                </div>

                <div className="h-[80%] overflow-y-scroll">
                    <div className="flex justify-between px-[16px] py-[8px]">

                        <div className="flex items-center">
                            <Image
                                src={Messi}
                                className = "h-[50px] w-[50px] rounded-full"
                            />
                            <div className="ml-[10px]">
                                <div className=" font-semibold">leomessi</div>
                                <div className="text-[#8e8e8e]"> Leo Messi</div>
                            </div>
                        </div>

                        <div className="bg-[#efefef] px-[12px] py-[8px] flex items-center justify-center rounded-lg cursor-pointer">
                            Following
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default FollowingPopUp

