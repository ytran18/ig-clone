//hooks
import Image from "next/image"
import { useUserPackageHook } from "../redux/hooks"

//images/icons

function FollowingContent({ following, isUser }) {

    return(
        <div className="w-full flex justify-between items-center px-[10px] py-[5px]">
            <div className="flex items-center">
                <img src={following?.avatar} className="w-[40px] h-[40px] rounded-full cursor-pointer" />

                <div className="ml-[10px] text-[14px]">
                    <div className=" font-[600]">{following?.name}</div>
                    <div className="text-[rgb(172,172,172)]">{following?.username}</div>
                </div>
            </div>

            <div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">
                {isUser(following?.username) ? "Edit profile" : "Following"}
            </div>
        </div>
    )
}

export default FollowingContent