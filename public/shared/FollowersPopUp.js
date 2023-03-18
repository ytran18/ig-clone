import Image from "next/image"
import { CloseIcon } from "../icons/icons"
import Followers from "../icons/followers.png"


function FollowersPopUp({handleClose}) {
    return(
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
                
                <div className="h-[90%]">
                    <div className="flex flex-col items-center justify-center py-[40px]">
                        <Image
                            className="h-[100px] w-[100px] mb-[10px]"
                            src={Followers}
                        />

                        <div className="mb-[10px] font-bold text-[20px]">FOLLOWERS</div>
                        <div className="text-[15px]">You'll see all the people who follow you here.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersPopUp