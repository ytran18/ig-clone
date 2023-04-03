import { useEffect, useRef, useState } from "react"

// firebase
import { db } from "../../src/firebase"
import { ref, onValue, query } from "firebase/database"

import { MoreDotIcon } from "../icons/icons"
import OverLayBlock from "./OverLayBlock"
import PostOptions from "./PostOptions"
import PopUp from "./PopUp"

function PostHeader ({ user, createAt })
{
    const [showOptions, setShowOptions] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [statement, setStatement] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [userPost, setUserPost] = useState({})
    const [timeOfPost, setTimeOfPost] = useState("")

    const optionsRef = useRef(null)

    const getUser = query(ref(db,`users/${user}`))

    useEffect(() =>
    {
        onValue(getUser, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null) { setUserPost(value); }
        })
    },[])
    // get difference time between 2 unix time
    const getHoursBetween = (time1, time2) =>
    {
        const diffInMs = Math.abs(time2 - time1)
        let diff = Math.floor(diffInMs / (1000 * 60 * 60))
        if (diff < 1) return (`${Math.floor(diffInMs / 60000)} m`)
        else if (diff > 24) return (`${Math.floor(diff / 24)} d`)
        else return (`${diff} h`)
    }

    useEffect(() =>
    {
            const newDate = new Date().getTime()
            setTimeOfPost(getHoursBetween(createAt, newDate))
    },[])

    useEffect(() =>
    {
        function handleClickOutSide(e) {
            if(optionsRef.current && optionsRef.current.contains(e.target)) { setShowOptions(false) }
        }

        document.addEventListener("click", handleClickOutSide)
        return () => { document.removeEventListener("click", handleClickOutSide) }
    },[])

    const handleClosePopUp = () => { setShowPopUp(false) }

    const handleCopyLink = (value) =>
    {
        if ( value = false ) return 
        setShowPopUp(true)
        setIsSuccess(true)
        setStatement("Link copied !!!")
        setTimeout(() => { setShowPopUp(false) },2000)
    }

    const handleUnfollow = (value) =>
    {
        if ( value = false ) return
        setShowPopUp(true)
        setIsSuccess(true)
        setStatement("Successfull unfollow !!!")
        setTimeout(() => { setShowPopUp(false) },2000)
    }

    return (
        <>
            <div className="w-full h-[56px] items-center flex justify-between">
                <div className="">
                    <div className="flex items-center">
                        <img alt="avt" src={userPost?.avatar} className="w-[32px] h-[32px] cursor-pointer rounded-full"/>
                        <div className="font-[600] hover:text-[rgb(147,147,147)] cursor-pointer px-[10px]">{userPost?.username}</div>
                        <span className="text-[rgb(142,142,142)] pr-[10px]">•</span>
                        <div className="text-[rgb(142,142,142)] tracking-wide">{timeOfPost}</div>
                    </div>
                </div>
                <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)] cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
                    {MoreDotIcon}
                </div>
            </div>
            {
                showOptions ?
                (
                    <div ref={optionsRef}>
                        <OverLayBlock><PostOptions unFollow={handleUnfollow} copyLink={handleCopyLink} close={() => setShowOptions(false)}/></OverLayBlock> 
                    </div>
                ) : (<></>)
            }
            {
                showPopUp ? 
                (
                    <div><PopUp statement={statement} isSuccess={isSuccess} closePopUp={handleClosePopUp}/></div>
                ) : (<></>)
            }
        </>
    )
}

export default PostHeader