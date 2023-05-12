//hooks
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks"

//firebase
import {db} from "../../src/firebase"
import {update, ref} from "firebase/database"

//components
import Unfollow from "./Unfollow"

function FollowersContent({handleClose, follower, isFollowing, getFollowing, getFollower, isUser }){
    const [follow, setFollow] = useState(false)
    const [unfollow, setUnfollow] = useState(false)
    const router = useRouter()

    const userData = useUserPackageHook()

    useEffect(() => {
        if(isFollowing(follower)){
            setFollow(true)
        }
    })

    const handleUnfollow = () => {
        setUnfollow(!unfollow)
    }

    const handleClckOtherUser = () => {
        router.push(`/user/${follower?.username}`)
        handleClose()
    }

    const handleFollow = () => {
        const following = getFollowing(userData.userId)
        const followers = getFollower(follower?.userId)
        update(ref(db, 'users/' + userData.userId),{
            following: [...following, follower?.userId]
        })
        update(ref(db, 'users/' + follower?.userId), {
            follower: [...followers, userData.userId]
        })
        setFollow(true)
    }

    return(
        <div className="w-full">
            <div className={unfollow ? "block" : "hidden"}>
                <Unfollow handleUnfollowPopUp = {handleUnfollow} getFollower = {getFollower} setFollowing = {setFollow} getFollowing = {getFollowing} userData = {userData} otherUser = {follower} />
            </div>
            <div className="flex items-center justify-between mx-3 mb-[10px]">
                <div onClick={handleClckOtherUser} className="flex items-center cursor-pointer">
                    <img className="w-[40px] h-[40px] rounded-full" src={follower?.avatar} />
                    <div className="text-[14px] ml-2">
                        <div className="font-[600]">{follower?.name}</div>
                        <div className="text-[rgb(172,172,172)]">{follower?.username}</div>
                    </div>
                </div>
                {
                    follow ? 
                    (
                        <div onClick={handleUnfollow} className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Following</div>
                    ) :
                    (
                        isUser(follower?.username) ? 
                        (<div className="bg-[#efefef] mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Edit Profile</div>) :
                        (<div onClick={handleFollow} className=" bg-sky-400 mr-[10px] rounded py-[7px] px-[16px] font-semibold text-[14px] cursor-pointer">Follow</div>) 
                    )
                }
            </div>
        </div>
    )
}

export default FollowersContent