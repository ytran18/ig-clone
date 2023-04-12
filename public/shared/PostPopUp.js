import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

// firebase
import { get, onValue, query, ref, set } from "firebase/database"
import { db } from "../../src/firebase"

import { ChevronLeft, ChevronRight, CloseIcon, CommentPost, Dot, LovePost, MoreDotIcon, MuteAudio, NotLovePost, NotSavedPost, OnAudio, SavedPost, SharePost } from "../icons/icons"
import Comment from "./Comment"
import { getHoursBetween, compare } from "../utils/functions"

// redux
import { useUserPackageHook, useReplyCommentPakageHook } from "../redux/hooks"
import { clearReply } from "../redux/actions"
import { useDispatch } from "react-redux"

const uuid = require("uuid")

function PostPopUp ({ close, caption, owner, amountOfLove, loveStatus, createAt, media, postId })
{
    // user
    const user = useUserPackageHook()
    const replyState = useReplyCommentPakageHook()
    const dispatch = useDispatch()

    const [love, setLove] = useState(loveStatus)
    const [save, setSave] = useState(false)
    const [share, setShare] = useState(false)
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [userPost, setUserPost] = useState([])
    const [timeOfPost, setTimeOfPost] = useState("")
    const [currImageIndex, setCurrImageIndex] = useState(0)
    const [captionArr, setCaptionArr] = useState([])
    const [isReply, setIsReply] = useState(false)
    const [replyInfo, setReplyInfo] = useState({})
    const [reply, setRelpy] = useState([])
    
    const commentRef = useRef(null)
    const videoRef = useRef(null)
    
    // query
    const getUser = query(ref(db,`users/${owner}`))
    const getComments = query(ref(db, `comments/${postId}/`))

    // get post'user infor of this post 
    useEffect(() =>
    {
        onValue(getUser, (snapshot) => {
            const value = snapshot.val()
            if (value != null) { setUserPost(value); }
        })
    },[])

    // get comments from database
    useEffect(() =>
    {
        onValue(getComments, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null) { 
                const valueObject = Object.values(value)
                valueObject.sort(compare)
                setCaptionArr(valueObject) 
            }
        })
    },[])

    useEffect(() =>
    {
            const newDate = new Date().getTime()
            setTimeOfPost(getHoursBetween(createAt, newDate))
    },[createAt])

    const handleFocus = () => { setComment(true); commentRef.current.focus() } // focus input

    const previousImage = useCallback(() => {
        if (currImageIndex !== 0) { setCurrImageIndex(prev => prev - 1); }
    })

    const nextImage = useCallback(() => {
        if (currImageIndex < media?.length - 1) { setCurrImageIndex(prev => prev + 1); }
    })
    
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
    },[currImageIndex, media])

    const handleAudio = useCallback(() =>
    {
        const audio = document.getElementById("video")
        audio.muted = !audio.muted
    })

    const handleLove = useCallback(() =>
    {
        setLove(!love)
        const getLove = query(ref(db, `posts/${owner}/${postId}/`))
        get(getLove).then((snapshot) =>
        {
            if(snapshot?.val()?.likes)
            {
                snapshot?.val()?.likes?.some((item) =>
                {
                    if(item == user?.userId) {
                        const newArr = snapshot?.val()?.likes?.filter((data) => data !== user?.userId)
                        const lovePath = query(ref(db, `posts/${owner}/${postId}/likes`))
                        set(lovePath, newArr)
                        return true
                    }
                    else {
                        const before = snapshot?.val()?.likes
                        before?.push(user?.userId)
                        const lovePath = query(ref(db, `posts/${owner}/${postId}/likes`))
                        set(lovePath, before)
                    }
                })
            }
            else {
                const lovePath = query(ref(db, `posts/${owner}/${postId}/likes`))
                set(lovePath, [user?.userId])
            }
        })
    })

    const handleInput = useCallback((e) =>
    {
        setCommentText(e.target.value)
        if(commentText === "@")
        {
            setIsReply(false)
            dispatch(clearReply())
            setCommentText("")
        } 
    })

    const handleReply = (value) => 
    {
        setReplyInfo(value)
        setIsReply(true)
        setCommentText(`@${value?.name} `)
        commentRef.current.focus()
    }

    useEffect(() =>
    {   
        const replyObject = Object.values(replyState)
        if (replyObject.length > 0)
        {
            setReplyInfo(replyState)
            setIsReply(true)
            setCommentText(`@${replyState?.name}`)
            commentRef.current.focus()
        }
        else {
            setCommentText("")
            setIsReply(false)
        }
    },[replyState])

    const handleComment = useCallback(() =>
    {
        const commentId = uuid.v4()
        const replyId = uuid.v4()
        const setComments = ref(db, `comments/${postId}/${commentId}`)
        const setReplyComments = ref(db, `reply/${postId}/${replyId}`)
        const newComment = {
            postId: postId,
            commentId: commentId,
            isOwner: false,
            caption: commentText,
            userIdOfCommenter: user?.userId,
            nameOfCommenter: user?.username,
            avtOfCommenter: user?.avatar,
            time: new Date().getTime(),
            like: [],
            isReply: isReply,
        }
        const newReply = {
            postId: postId,
            commentId: replyId,
            isOwner: false,
            caption: commentText,
            userIdOfCommenter: user?.userId,
            nameOfCommenter: user?.username,
            avtOfCommenter: user?.avatar,
            time: new Date().getTime(),
            like: [],
            isReply: isReply,
            reply: replyInfo?.commentId
        }
        if (isReply)
        {
            set(setReplyComments, newReply)   
        }
        else {
            set(setComments, newComment)
        }
        setCommentText("")
        setIsReply(false)
    })

    const renderMedia = useMemo(() =>
    {
        return (
            <>
            {
                media[currImageIndex]?.type == "img" ?
                ( <Image key={currImageIndex} alt="img" className="w-full h-full object-cover bg-cover bg-center" width={500} height={300} src={media[currImageIndex]?.url}/> )
                :
                (
                    <div className="max-w-full max-h-full object-cover flex justify-center" key={currImageIndex}>
                        <video ref={videoRef} id="video" className="max-w-full max-h-full relative" autoPlay muted>
                            <source src={media[currImageIndex]?.url} />
                        </video>
                        <div className="absolute bottom-4 right-4 cursor-pointer" onClick={handleAudio}> {videoRef.current?.muted ? MuteAudio : OnAudio} </div>
                    </div>
                )
            }
            </>
        )
    },[currImageIndex, handleAudio, media])

    const renderNavigate = useMemo(() =>
    {
        return (
            <>
                <div className={`absolute top-[50%] left-0 right-0 px-4 py-2 text-transparent flex text-white ${currImageIndex > 0 ? "justify-between" : "justify-end"}`}>
                    <div onClick={previousImage} className={`text-black items-center justify-center cursor-pointer bg-[rgb(181,181,181)] rounded-full w-[25px] h-[25px] ${currImageIndex == 0 ? "hidden" : "flex"}`}> {ChevronLeft} </div>
                    <div onClick={nextImage} className={`text-black items-center justify-center bg-[rgb(181,181,181)] w-[25px] h-[25px] rounded-full cursor-pointer ${currImageIndex == media?.length - 1 ? "hidden" : "flex"}`}> {ChevronRight} </div>
                </div>
            </>
        )
    },[currImageIndex, nextImage, previousImage, media])

    const renderDot = useMemo(() =>
    {
        return (
            <>
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
            </>
        )
    },[media])

    const renderPostOwnerInfo = useMemo(() =>
    {
        return (
            <>
                <div className="h-[60px] flex justify-between items-center px-4 border-b-[1px] border-b-[rgb(240,240,240)]">
                    <div className="flex items-end h-full">
                        <div className="h-full flex items-center"><Image alt="avt" src={userPost?.avatar} width={32} height={32} className="w-[32px] h-[32px] rounded-full"/></div>
                        <div className="mx-2 font-[600] h-full flex items-center text-[14px] hover:text-[rgb(142,142,142)] cursor-pointer">{userPost?.username}</div>
                    </div>
                    <div className="hover:text-[rgb(142,142,142)] cursor-pointer">{MoreDotIcon}</div>
                </div>
            </>
        )
    },[userPost])

    const renderComment = useMemo(() =>
    {
        const newTime = new Date().getTime()
        return (
            <>
                <div className="h-[518px] hidden md:block border-b-[1px] border-b-[rgb(240,240,240)] overflow-x-auto scrollbar-hide px-4 py-2">
                    <Comment name={userPost?.username} comment={caption} avt={userPost?.avatar} isOwner time={timeOfPost}/>
                    {
                        captionArr?.map((item, index) =>
                        {
                            return (
                                <div key={index} className="">
                                    <Comment postId={postId} commentId={item?.commentId} id={item?.userIdOfCommenter} name={item?.nameOfCommenter} comment={item?.caption} avt={item?.avtOfCommenter} time={getHoursBetween(item?.time,newTime)} like={item?.like?.length || 0} setIsReply={handleReply}/>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    },[caption, timeOfPost, userPost, captionArr, postId])

    const renderLikeShare = useMemo(() =>
    {
        return (
            <>
                <div className="border-b-[1px] border-b-[rgb(240,240,240)] px-4">
                    <div className="flex justify-between h-[55px]">
                        <div className="flex cursor-pointer items-center">
                            <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)]" onClick={handleLove}> { love ? ( LovePost ) : ( NotLovePost ) } </div>
                            <div className="text-[rgb(38,38,38)] px-2  hover:text-[rgb(142,142,142)]" onClick={handleFocus}> {CommentPost} </div>
                            <div className="text-[rgb(38,38,38)]  hover:text-[rgb(142,142,142)]" onClick={() => setShare(true)}> {SharePost} </div>
                        </div>

                        <div className="text-[rgb(38,38,38)] cursor-pointer flex items-center  hover:text-[rgb(142,142,142)]" onClick={() => setSave(!save)}> { save ? ( SavedPost ) : ( NotSavedPost ) } </div>
                    </div>
                    <div className="text-[14px] font-[600] cursor-pointer">{`${amountOfLove || 0} likes`}</div>
                </div>
            </>
        )
    },[amountOfLove, love, save, handleLove])

    const renderInput = useMemo(() =>
    {
        return (
            <>
                <div className="h-[55px] w-full flex px-4">
                    <input value={commentText} ref={commentRef} onChange={handleInput} className="w-[80%] h-full outline-none text-[14px] placeholder:text-[14px]" placeholder="Add a comments..."/>
                    <div className={`select-none flex cursor-pointer justify-end font-[600] w-[20%] items-center ${commentText.length !== "" ? "text-[rgb(0,149,246)]" : "text-[rgb(179,219,255)]"}`} onClick={handleComment}>Post</div>
                </div>
            </>
        )
    },[commentText, handleComment, handleInput])

    const renderClose = useMemo(() =>
    {
        return ( <div className="text-white absolute top-0 right-0 p-4 cursor-pointer" onClick={close}>{CloseIcon}</div> )
    },[close])

    return (
        <>
            <div className="h-[80%] w-[70%] md:h-[90%] md:w-[90%] md:max-h-[90%] flex justify-center items-center flex-col md:flex-row relative">
                <div className="md:hidden w-full md:w-[40%] h-[10%] bg-white flex flex-col">{renderPostOwnerInfo}</div>
                <div className="relative w-full h-[75%] md:h-full bg-black flex justify-center items-center">
                    {renderMedia}
                    {renderNavigate}
                    {renderDot}
                </div>
                <div className="w-full md:w-[680px] h-full bg-white flex flex-col">
                    {/* user info */}
                    <div className="hidden md:flex"> {renderPostOwnerInfo} </div>
                    {/* comments */}
                    {renderComment}
                    {/* likes, share */}
                    {renderLikeShare}
                    {/* comment input */}
                    {renderInput}
                </div>
            </div>
            {renderClose}
        </>
    )
}

export default PostPopUp