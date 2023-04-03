import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import IMG from "../data-test/assets/img/BangTan-3.jpeg"
import COMT2 from "../data-test/assets/img/Jimin.jpeg"
import COMT3 from "../data-test/assets/img/Jin-4.jpeg"
import COMT4 from "../data-test/assets/img/JK-2.jpeg"
import COMT5 from "../data-test/assets/img/NamJoon-2.jpeg"
import COMT6 from "../data-test/assets/img/Suga_4.jpeg"
import COMT7 from "../data-test/assets/img/TaeHyung-2.jpeg"
import { CloseIcon, MoreDotIcon } from "../icons/icons"
import Comment from "./Comment"

// firebase
import { onValue, query, ref } from "firebase/database"
import { db } from "../../src/firebase"

function PostPopUp ({ close, caption, owner, amountOfLove, loveStatus, createAt })
{

    const [love, setLove] = useState(loveStatus)
    const [save, setSave] = useState(false)
    const [share, setShare] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [userPost, setUserPost] = useState([])
    const [timeOfPost, setTimeOfPost] = useState("")

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

    const handleFocus = () =>
    {   
        setComment(true)
        commentRef.current.focus()
    }

    const handleChangeComment = (e) =>
    {
        setCommentText(e.target.value)

        if(commentText.length > 0 )
        {
            const changeText = document.getElementById("post-text")
            changeText.style.color = "rgb(0,149,246)"
        }
        else if(commentText.length === 0){
            const changeText = document.getElementById("post-text")
            changeText.style.color = "rgb(186,223,255)"
        }
    }

    return (
        <>
            <div className="h-[90%] w-[90%] max-h-[90%] flex relative">
                <div className="w-[60%] h-full bg-black flex justify-center items-center">
                    <Image alt="img" src={IMG} className="max-w-full max-h-full" />
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
                                <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)]" onClick={() => setLove(!love)}>
                                {
                                    love ?
                                    (
                                        <svg aria-label="Unlike" class="x1lliihq x1n2onr6" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24">
                                            <title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                        </svg>
                                    )
                                    :
                                    (
                                        <svg aria-label="Like" class="x1lliihq x1n2onr6" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                        </svg>
                                    )
                                }
                                </div>
                                <div className="text-[rgb(38,38,38)] px-2  hover:text-[rgb(142,142,142)]" onClick={handleFocus}>
                                    <svg aria-label="Comment" class="x1lliihq x1n2onr6" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                    </svg>
                                </div>
                                <div className="text-[rgb(38,38,38)]  hover:text-[rgb(142,142,142)]" onClick={() => setShare(true)}>
                                    <svg aria-label="Share Post" class="x1lliihq x1n2onr6" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                </div>
                            </div>

                            <div className="text-[rgb(38,38,38)] cursor-pointer flex items-center  hover:text-[rgb(142,142,142)]" onClick={() => setSave(!save)}>
                            {
                                save ?
                                (
                                    <svg aria-label="Remove" class="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                                )
                                :
                                (
                                    <svg aria-label="Save" class="x1lliihq x1n2onr6" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                                    </svg>
                                )
                            }
                            </div>
                        </div>
                        <div className="text-[14px] font-[600] cursor-pointer">{`${amountOfLove.length} likes`}</div>
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