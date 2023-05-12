import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { db } from "../../src/firebase"
import { query, ref, get, set } from "firebase/database"

import { useUserPackageHook } from "../redux/hooks"

import AVT_DEFAUT from "../img/default-avatar.png"
import OverLayBlock from "./OverLayBlock"
import Unfollow from "./Unfollow"

function SuggestionsFollow ({ AVT, name, username, id })
{
    // router
    const router = useRouter()

    // user
    const user = useUserPackageHook()

    // state
    const [follow, setFollow] = useState(false)
    const [followState, setFollowState] = useState(0) // 0 no follow, 1 following, 2 follow and unfollow

    // query
    const getFollow = query(ref(db, `users/${user?.userId}`))

    const handleFollow = () =>
    {
        setFollow(!follow)
        get(getFollow).then((snapshot) =>
        {
            if (snapshot.val()?.following)
            {
                snapshot.val()?.following?.some((item) =>
                {
                    if (item === id)
                    {
                        console.log("here");
                        setFollowState(2)
                        return true
                    }
                    else {
                        console.log("here");
                        const before = snapshot.val()?.following
                        before.push(id)
                        const followPath = query(ref(db, `users/${user?.userId}/following`))
                        setFollowState(1)
                        set(followPath, before)
                    }
                })
            }
            else {
                const followPath = query(ref(db, `users/${user?.userId}/following`))
                set(followPath, [id])
            }
        })
    }

    const handleClose = () => { setFollowState(1) }

    const handleState = (state) => { setFollowState(state) }

    const handleClick = () => { router.push(`/user/${username}`) }

    return (
        <>
            <div className="w-full flex items-center text-[14px] mb-4 cursor-pointer">
                <div className="w-[80%] flex items-center" onClick={handleClick}>
                    {
                        AVT !== "" ?
                        (
                            <img alt="suga" src={AVT} className="w-[32px] h-[32px] rounded-[50px]"/>
                        )
                        :
                        ( <Image alt="suga" src={AVT_DEFAUT} className="w-[32px] h-[32px] rounded-[50px]"/> )
                    }
                    <div className="px-2 font-[600]">{name}</div>
                </div>
                <div className={`w-[20%] font-[500] cursor-pointer hover:text-black ${follow ? "text-black" : "text-[rgb(0,149,246)]"}`} onClick={handleFollow}>{follow ? "Following" : "Follow"}</div>
            </div>
            {
                followState === 2 ? 
                (<OverLayBlock> <Unfollow id={id} AVT={AVT} username={username} close={handleClose} followState={handleState} /> </OverLayBlock>)
                :
                (<></>)
            }
        </>
    )
}

export default SuggestionsFollow