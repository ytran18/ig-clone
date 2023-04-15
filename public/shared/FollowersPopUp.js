//hooks
import Image from "next/image"
import { useEffect, useState } from "react"

//images/icons
import { CloseIcon } from "../icons/icons"

//component
import Followers from "../icons/followers.png"

//firebase
import { db } from "../../src/firebase"
import { onValue, ref, update } from "firebase/database"
import FollowersContent from "./FollowersContent"


function FollowersPopUp({handleClose, isFollowing, userData, getFollower, getFollowing, isUser }) {
//     const [follower, setFollower] = useState()

//     useEffect(() => {
//         const follower1 = getFollower(userData?.userId)
//         let follower2 = []
//         follower1.forEach((fler) => {
//             const user = getUser(fler)
//             follower2.push(user)
//             console.log(user)
//         })
//         console.log("follower2: ", follower2)
//         setFollower(follower2)
//     },[])

    
    const getUser = (userId) => {
        let user = null
        onValue(ref(db, 'users/' + userId), (snapshot) => {
            user = snapshot.val()
        })
        return user
    }
    const followers = () => {
        const follower1 = getFollower(userData?.userId)
        let follower2 = []
        follower1.forEach((fler) => {
            const user = getUser(fler)
            follower2.push(user)
            console.log(user)
        })
        console.log("follower2: ", follower2)
        return follower2
    }

    const follower = followers()

    return(
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(35,35,35,0.16)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-50">
            {
                follower?.length == 0 ? 
                ( 
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
                ) : 
                (
                    <div className="w-[440px] h-[440px] bg-white rounded-2xl">
                        <div className="flex h-[10%] items-center justify-center border-b-[1px]">
                            <div className="w-[90%] text-center font-semibold text-[16px]">Followers</div> 

                            <div 
                                className="float-right font-bold cursor-pointer"
                                onClick={handleClose}
                            >
                                {CloseIcon}
                            </div>
                        </div>
                        <div className="h-[90%] pt-2">
                            <div className="flex flex-col">
                                {follower?.map((fler) => {
                                    return(
                                        <FollowersContent handleClose = {handleClose} follower = {fler} isFollowing = {isFollowing} getFollower = {getFollower} getFollowing = {getFollowing} isUser = {isUser}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default FollowersPopUp