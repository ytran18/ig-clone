//hooks
import Image from "next/image"
import { useUserPackageHook } from "../redux/hooks"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

//images/icons

//components
import Unfollow from "../shared/Unfollow"

//firebase
import {db} from "../../src/firebase"
import {update, ref, query} from "firebase/database"

function FollowingContent({handleClose, following, isFollowing, handleFollow, isUser, getFollower, getFollowing }) {
    
    const [unfollow, setUnfollow] = useState(false)
    const userData = useUserPackageHook()
    const [follow, setFollow] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if(isFollowing(following)){
            setFollow(true)
        }
    })


    const handleUnfollow = () => {
        setUnfollow(!unfollow)  
    }

    const handleOtherUserAccountPage = () => {
        router.push(`/user/${following?.username}`)
        handleClose()
    }

    return(
        <div className="w-full">
            <div className={unfollow ? "block" : "hidden"}>
                <Unfollow handleUnfollowPopUp = {handleUnfollow} getFollower = {getFollower} getFollowing = {getFollowing} setFollowing = {setFollow} userData = {userData} otherUser = {following}  />
            </div>
            <div className="w-full flex justify-between items-center px-[10px] py-[5px]">
                <div onClick={handleOtherUserAccountPage} className="flex items-center cursor-pointer">
                    <img src={following?.avatar} className="w-[40px] h-[40px] rounded-full" />

                    <div className="ml-[10px] text-[14px]">
                        <div className=" font-[600]">{following?.name}</div>
                        <div className="text-[rgb(172,172,172)]">{following?.username}</div>
                    </div>
                </div>

                {   follow ? 
                    (
                        <div onClick={handleUnfollow} className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Following</div>
                    ) :
                    (
                        isUser(following?.username) ? 
                        (<div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Edit Profile</div>) :
                        (<div onClick={() => handleFollow(following, setFollow)} className=" bg-sky-400 mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Follow</div>) 
                    )
                }
            </div>
        </div>
    )
}

export default FollowingContent