//hooks
import { useState, useEffect } from "react"

//component
import FollowingContent from "./FollowingContent"

//images/icons
import { CloseIcon } from "../icons/icons"

//firebase
import { db } from "../../src/firebase"
import { onValue, ref, update } from "firebase/database"


function FollowingPopUp( { handleClose,isFollowing, getFollowing, getFollower, userData, isUser } ) {

    // const [following, setFollowing] = useState()

    // useEffect(() => {
    //     const followings = getFollowing(userData?.userId)
    //     let following1 = []
    //     followings.forEach((flwing) => {
    //         const user = getUser(flwing)
    //         following1.push(user)
    //     })
    //     setFollowing(following1)
    // }, [])

    const getUser = (userId) => {
        let user = null
        onValue(ref(db, 'users/' + userId), (snapshot) => {
            user = snapshot.val()
        })
        return user
    }

    const handleFollow = (otherUser, setFollow) => {
        const following = getFollowing(userData.userId)
        const follower = getFollower(otherUser?.userId)
        update(ref(db, 'users/' + userData.userId),{
            following: [...following, otherUser?.userId]
        })
        update(ref(db, 'users/' + otherUser?.userId), {
            follower: [...follower, userData.userId]
        })
        setFollow(true)
    }

    const followings = () => {
        const followings = getFollowing(userData?.userId)
        let following1 = []
        followings.forEach((flwing) => {
            const user = getUser(flwing)
            following1.push(user)
        })
        return following1
    }

    const following = followings()

    console.log("following: ", following)

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(35,35,35,0.16)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-50">
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

                <div className="h-[90%] overflow-y-scroll scrollbar-hide">
                    { following?.map((flwing) => {
                        return(
                            <FollowingContent following = {flwing} handleFollow = {handleFollow} isFollowing = {isFollowing} isUser = {isUser} getFollower = {getFollower} getFollowing = {getFollowing} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FollowingPopUp

