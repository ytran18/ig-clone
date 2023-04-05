import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import COMT2 from "../data-test/assets/img/Jimin.jpeg"
import COMT3 from "../data-test/assets/img/Jin-4.jpeg"
import COMT4 from "../data-test/assets/img/JK-2.jpeg"
import COMT5 from "../data-test/assets/img/NamJoon-2.jpeg"
import COMT6 from "../data-test/assets/img/Suga_4.jpeg"
import COMT7 from "../data-test/assets/img/TaeHyung-2.jpeg"
import { ChevronLeft, ChevronRight, CloseIcon, CommentPost, Dot, LovePost, MoreDotIcon, NotLovePost, NotSavedPost, SavedPost, SharePost } from "../icons/icons"
import Comment from "./Comment"

// firebase
import { onValue, query, ref } from "firebase/database"
import { db } from "../../src/firebase"

function PostPopUp ({ close, caption, owner, amountOfLove, loveStatus, createAt, media })
{

    const [love, setLove] = useState(loveStatus)
    const [save, setSave] = useState(false)
    const [share, setShare] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [userPost, setUserPost] = useState([])
    const [timeOfPost, setTimeOfPost] = useState("")
    const [currImageIndex, setCurrImageIndex] = useState(0)
    const [width, setWidth] = useState([])
    const [height, setHeight] = useState([])

    const commentRef = useRef(null)

    // query
    const getUser = query(ref(db,`users/${owner}`))

    // get post'user infor of this post 
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

    const handleFocus = () => { setComment(true); commentRef.current.focus() } // focus input

    const handleChangeComment = (e) =>
    {
        setCommentText(e.target.value)

        if(commentText.length > 0 ) {
            const changeText = document.getElementById("post-text")
            changeText.style.color = "rgb(0,149,246)"
        }
        else if(commentText.length === 0){
            const changeText = document.getElementById("post-text")
            changeText.style.color = "rgb(186,223,255)"
        }
    }

    const previousImage = () => {
        if (currImageIndex !== 0) { setCurrImageIndex(prev => prev - 1); }
    }

    const nextImage = () => {
        if (currImageIndex < media?.length - 1) { setCurrImageIndex(prev => prev + 1); }
    }
    
    const handleImageOnload = (e) => {
        setWidth(prev => [...prev, e.target.naturalWidth]) 
        setHeight(prev => [...prev, e.target.naturalHeight])
    }

    useEffect(() =>
    {
        media.map((item ,index) =>
        {
            if(index == currImageIndex)
            {
                const dot = document.getElementById(index)
                dot.classList.remove("text-[rgb(138,131,111)]")
                dot.classList.add("text-[rgb(255,255,255)]")
            }
            else {
                const disable = document.getElementById(index)
                disable.classList.remove("text-[rgb(255,255,255)]")
                disable.classList.add("text-[rgb(138,131,111)]")
            }
        })
    },[currImageIndex])

    return (
        <>
            <div className="h-[90%] w-[90%] max-h-[90%] flex relative">
                <div className="relative w-[60%] h-full bg-black flex justify-center items-center">
                {
                    media[currImageIndex]?.type == "img" ?
                    (
                        <Image onLoad={handleImageOnload} alt="img" className="w-full h-full bg-center object-cover" width={500} height={300} src={media[currImageIndex]?.url}/>
                    )
                    :
                    (
                        <video className="w-[full] max-h-[585px] bg-cover bg-center" loop autoPlay>
                            <source src={media?.[currImageIndex]?.url} />
                        </video>
                    )
                }
                    <div className={`absolute top-[50%] w-full h-full left-0 right-0 px-4 py-2 text-transparent flex text-white ${currImageIndex > 0 ? "justify-between" : "justify-end"}`}>
                        <div onClick={previousImage} className={`text-black items-center justify-center cursor-pointer bg-[rgb(181,181,181)] rounded-full w-[30px] h-[30px] ${currImageIndex == 0 ? "hidden" : "flex"}`}> {ChevronLeft} </div>
                        <div onClick={nextImage} className={`text-black items-center justify-center bg-[rgb(181,181,181)] w-[30px] h-[30px] rounded-full cursor-pointer ${currImageIndex == media?.length - 1 ? "hidden" : "flex"}`}> {ChevronRight} </div>
                    </div>
                    <div className={`absolute bottom-0 ${media?.length - 1 === 0 ? "hidden" : "flex"}`}>
                        {
                            media.map((item, index) =>
                            {
                                return (
                                    <div key={index}>
                                        <div id={index} className="text-[rgb(138,131,111)] -mx-[10px]"> {Dot} </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-[40%] h-full bg-white flex flex-col">
                    {/* user info */}
                    <div className="h-[60px] flex justify-between items-center px-4 border-b-[1px] border-b-[rgb(240,240,240)]">
                        <div className="flex items-end h-full">
                            <div className="h-full flex items-center"><Image alt="avt" src={userPost?.avatar} width={32} height={32} className="w-[32px] h-[32px] rounded-full"/></div>
                            <div className="mx-2 font-[600] h-full flex items-center text-[14px] hover:text-[rgb(142,142,142)] cursor-pointer">{userPost?.username}</div>
                        </div>
                        <div className="hover:text-[rgb(142,142,142)] cursor-pointer">{MoreDotIcon}</div>
                    </div>
                    {/* comments */}
                    <div className="h-[518px] border-b-[1px] border-b-[rgb(240,240,240)] overflow-x-auto scrollbar-hide px-4 py-2">
                        <Comment name={userPost?.username} comment={caption} avt={userPost?.avatar} isOwner time={timeOfPost}/>
                        <Comment name={"agustd"} comment={"오늘도 💪🏻"} avt={COMT2} time={"20h"} like={"22"}/>
                        <Comment name={"uaremyhope"} comment={"지민 (Jimin) 'FACE' Release"} avt={COMT3} time={"20h"} like={"21"}/>
                        <Comment name={"j.m"} comment={"JP’s handles last night were CRAZY 🤯 "} avt={COMT4} time={"20h"} like={"24"}/>
                        <Comment name={"rkive"} comment={"RM 1st Album #Indigo"} avt={COMT5} time={"20h"} like={"27"}/>
                        <Comment name={"jin"} comment={"어서와"} avt={COMT6} time={"20h"} like={"30"}/>
                        <Comment name={"thv"} comment={"From Veaufiful days"} avt={COMT7} time={"20h"} like={"20"}/>
                        <Comment name={"agustd"} comment={"오늘도 💪🏻"} avt={COMT2} time={"20h"} like={"22"}/>
                        <Comment name={"j.m"} comment={"JP’s handles last night were CRAZY 🤯 "} avt={COMT4} time={"20h"} like={"24"}/>
                        <Comment name={"thv"} comment={"From Veaufiful days"} avt={COMT7} time={"20h"} like={"20"}/>
                        <Comment name={"rkive"} comment={"RM 1st Album #Indigo"} avt={COMT5} time={"20h"} like={"27"}/>
                    </div>
                    {/* likes, share */}
                    <div className="h-[114px] border-b-[1px] border-b-[rgb(240,240,240)] px-4">
                        <div className="flex justify-between h-[55px]">
                            <div className="flex cursor-pointer items-center">
                                <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)]" onClick={() => setLove(!love)}> { love ? ( LovePost ) : ( NotLovePost ) } </div>
                                <div className="text-[rgb(38,38,38)] px-2  hover:text-[rgb(142,142,142)]" onClick={handleFocus}> {CommentPost} </div>
                                <div className="text-[rgb(38,38,38)]  hover:text-[rgb(142,142,142)]" onClick={() => setShare(true)}> {SharePost} </div>
                            </div>

                            <div className="text-[rgb(38,38,38)] cursor-pointer flex items-center  hover:text-[rgb(142,142,142)]" onClick={() => setSave(!save)}> { save ? ( SavedPost ) : ( NotSavedPost ) } </div>
                        </div>
                        <div className="text-[14px] font-[600] cursor-pointer">{`${amountOfLove || 0} likes`}</div>
                    </div>
                    {/* comment input */}
                    <div className="h-[55px] w-full flex px-4">
                        <input value={commentText} ref={commentRef} onChange={handleChangeComment} className="w-[80%] h-full outline-none text-[14px] placeholder:text-[14px]" placeholder="Add a comments..."/>
                        <div id="post-text" className="select-none flex justify-end font-[600] w-[20%] items-center text-[rgb(0,149,246)]">Post</div>
                    </div>
                </div>
            </div>
            <div className="text-white absolute top-0 right-0 p-4 cursor-pointer" onClick={close}>{CloseIcon}</div>
        </>
    )
}

export default PostPopUp