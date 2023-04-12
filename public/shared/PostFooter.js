import { useEffect, useMemo, useState } from "react"

import { get, onValue, query, ref, set } from "firebase/database"
import { db } from "../../src/firebase"

import OverLayBlock from "./OverLayBlock"
import PostPopUp from "./PostPopUp"

import { useUserPackageHook } from "../redux/hooks"
import { clearReply } from "../redux/actions"
import { useDispatch } from "react-redux"

import { CommentPost, LovePost, NotLovePost, NotSavedPost, SavedPost, SharePost } from "../icons/icons"

const uuid = require("uuid")

function PostFooter ({ caption, amountOfLove, owner, postId, createAt, media })
{
    const [love, setLove] = useState(false)
    const [save, setSave] = useState(false)
    const [comment, setComment] = useState(false)
    const [share, setShare] = useState(false)
    const [userPost, setUserPost] = useState({})
    const [captionText, setCaptionText] = useState("")
    const [amountOfComment, setAmmountOfComment] = useState(0)
    const [amountOfReply, setAmountOfReply] = useState(0)

    const user = useUserPackageHook() // get user sign in in this session
    const dispatch = useDispatch()

    // query
    const getUser = query(ref(db,`users/${owner}`))
    const getTagged = query(ref(db, `users/${user?.userId}`))
    const getLoveStatus = query(ref(db, `posts/${owner}/${postId}/likes`))
    const getComments = query(ref(db, `comments/${postId}`))
    const getReplys = query(ref(db, `reply/${postId}`))
    const getSavedStatus = query(ref(db, `users/${user?.userId}/saved`))
    
    // get post'user infor of this post 
    useEffect(() =>
    {
        onValue(getUser, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null) { setUserPost(value); }
        })
    },[])
    
    // get love status
    useEffect(() =>
    {
        get(getLoveStatus).then((snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                value?.map((item, index) =>
                {
                    if (item === user?.userId) {setLove(true)}
                })
            }
        })
    },[])

    // get saved status
    useEffect(() =>
    {
        get(getSavedStatus).then((snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                value?.map((item, index) =>
                {   
                    if (item === postId) {setSave(true)}
                })
            }
        })
    },[])

    // get amount of comments 
    useEffect(() =>
    {
        onValue(getComments, (snapshot) =>
        {
            const value = snapshot.val()
            if(value != null) {
                const valueObject = Object.values(value)
                setAmmountOfComment(valueObject.length)
            }
        })
    },[])

    //  get reply number of this post
    useEffect(() =>
    {
        onValue(getReplys, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null) { 
                const valueObject = Object.values(value)
                setAmountOfReply(valueObject.length)
            }
        })
    },[])

    // handle love actions
    const handleLove = () =>
    {
        setLove(!love)
        const getLove = query(ref(db, `posts/${owner}/${postId}/`))
        get(getLove)
            .then((snapshot) =>
            {
                if(snapshot?.val()?.likes)
                {
                    snapshot?.val()?.likes?.some((item) =>
                    {
                        if(item == user?.userId)
                        {
                            const newArr = snapshot?.val()?.likes?.filter((data) => data !== user?.userId)
                            const lovePath = query(ref(db, `posts/${userPost?.userId}/${postId}/likes`))
                            set(lovePath, newArr)
                            return true
                        }
                        else {
                            const before = snapshot?.val()?.likes
                            before?.push(user?.userId)
                            const lovePath = query(ref(db, `posts/${userPost?.userId}/${postId}/likes`))
                            set(lovePath, before)
                        }
                    })
                }
                else {
                    const lovePath = query(ref(db, `posts/${userPost?.userId}/${postId}/likes`))
                    set(lovePath, [user?.userId])
                }
            })
    }

    // close pop up function
    const handleClose = () => {
        dispatch(clearReply())
        setComment(false) 
    } 

    // handle save action
    const handleSave = () =>
    {
        setSave(!save)
        get(getTagged)
            .then((snapshot) =>
            {
                if(snapshot.val()?.saved)
                {
                    snapshot.val()?.saved?.some((item) =>
                    {
                        if (item == postId)
                        {
                            const newArr = snapshot.val()?.saved?.filter((data) => data !== postId)
                            const taggedPath = query(ref(db, `users/${user?.userId}/saved`))
                            set(taggedPath, newArr)
                            return true;
                        }
                        else {
                            const before = snapshot.val()?.saved
                            before?.push(postId)
                            const taggedPath = query(ref(db, `users/${user?.userId}/saved`))
                            set(taggedPath, before)
                        }
                    })
                }
                else {
                    const taggedPath = query(ref(db, `users/${user?.userId}/saved`))
                    set(taggedPath, [postId])
                }
            })
    }

    const handleComment = (e) => { setCaptionText(e.target.value) }

    const handlePostComment = () =>
    {
        const commentId = uuid.v4()
        const setComments = ref(db, `comments/${postId}/${commentId}`)
        const newComment = {
            postId: postId,
            commentId: commentId,
            isOwner: false,
            caption: captionText,
            userIdOfCommenter: user?.userId,
            nameOfCommenter: user?.username,
            avtOfCommenter: user?.avatar,
            time: new Date().getTime(),
            like: [],
            isReply: false,
        }
        set(setComments, newComment)
        setCaptionText("")
    }

    return (
        <>
            <div className="w-full flex flex-col justify-center">
                <div className="flex w-full justify-between items-center h-[46px]">
                    <div className="flex cursor-pointer">
                        <div className="text-[rgb(38,38,38)] hover:text-[rgb(142,142,142)]" onClick={handleLove}>
                            { love ? ( LovePost ) : ( NotLovePost ) }
                        </div>
                        <div className="text-[rgb(38,38,38)] px-2  hover:text-[rgb(142,142,142)]" onClick={() => setComment(true)}>
                            {CommentPost}
                        </div>
                        <div className="text-[rgb(38,38,38)]  hover:text-[rgb(142,142,142)]" onClick={() => setShare(true)}>
                            {SharePost}
                        </div>
                    </div>
                    <div className="text-[rgb(38,38,38)] cursor-pointer  hover:text-[rgb(142,142,142)]" onClick={handleSave}>
                        { save ? SavedPost : NotSavedPost }
                    </div>
                </div>
                <div className="h-[18px] text-[14px] font-[700] mb-[8px]">{`${amountOfLove?.length || 0} likes`}</div>
                <div className="h-[18px] text-[14px] font-[700] mb-[8px]">{`${userPost?.username}`}<span className="text-[rgb(100,100,100)] font-[400] px-1">{caption}</span></div>
                <div className="text-[rgb(179,179,179)] text-[14px] cursor-pointer h-[18px] mb-[8px]" onClick={() => setComment(true)}>{`View all ${(amountOfComment + amountOfReply) || 0} comments`}</div>
                <div className="h-[18px] mb-[30px] flex items-center">
                        <input value={captionText} className="text-[14px] placeholder:text-[rgb(179,179,179)] placeholder:text-[14px] w-full outline-none" placeholder="Add a comment..." onChange={handleComment}/>
                        <div className={`text-[14px] text-[rgb(0,149,246)] cursor-pointer font-[600] ${captionText !== "" ? "block" : "hidden"}`} onClick={handlePostComment}>Post</div>
                </div>
            </div>
            {
                comment ?
                ( <OverLayBlock><PostPopUp postId={postId} owner={owner} media={media} amountOfLove={amountOfLove?.length || 0} caption={caption} createAt={createAt} close={handleClose} loveStatus={love}/></OverLayBlock> )
                :
                (<></>)
            }
        </>
    )
}

export default PostFooter