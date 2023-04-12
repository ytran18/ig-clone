import Image from "next/image"
import { useEffect, useState } from "react"

import { get, onValue, orderByChild, query, ref, set } from "firebase/database"
import { db } from "../../src/firebase"

import { getHoursBetween, compare } from "../utils/functions"
import { MiniHearth, MiniHearthRed } from "../icons/icons"

import { useUserPackageHook } from "../redux/hooks"
import ReplyComment from "./ReplyComment"

function Comment ({ id, commentId, name, comment, avt, isOwner, time, like, setIsReply, postId })
{
    // user
    const user = useUserPackageHook()

    // state
    const [reply, setReply] = useState([])
    const [love, setLove] = useState(false)

    // query
    const getReplys = query(ref(db,`reply/${postId}/`), orderByChild("time"))
    const getComment = query(ref(db, `comments/${postId}/${commentId}`))
    const getLoveStatus = query(ref(db, `comments/${postId}/${commentId}/like`))

    // get replys from database
    useEffect(() =>
    {
        onValue(getReplys, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                const valueObject = Object.values(value)
                valueObject.sort(compare)
                setReply(valueObject)
            }
        })
    },[])

    // get love status
    useEffect(() =>
    {
        onValue(getLoveStatus, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                value?.map((item, index) =>
                {
                    if (item === user?.userId) setLove(true)
                })
            }
        })
    },[])


    const handleLove = () =>
    {
        setLove(!love)
        get(getComment).then((snapshot) =>
        {
            if (snapshot.val()?.like)
            {
                snapshot.val()?.like?.some((item) =>
                {
                    if (item === user?.userId)
                    {
                        const newArr = snapshot.val()?.like?.filter((data) => data !== user?.userId)
                        const commentPath = query(ref(db, `comments/${postId}/${commentId}/like`))
                        set(commentPath, newArr)
                        return true
                    }
                    else {
                        const before = snapshot.val()?.like
                        before?.push(user?.userId)
                        const commentPath = query(ref(db, `comments/${postId}/${commentId}/like`))
                        set(commentPath, before)
                    }
                })
            }
            else {
                const commentPath = query(ref(db, `comments/${postId}/${commentId}/like`))
                set(commentPath, [user?.userId])
            }
        })
    }

    return (
        <>
        {
            isOwner ? 
            (
                <div className="h-[43px] w-full flex items-center mb-4">
                    <div className=""><Image alt="avt" src={avt} width={32} height={32} className="w-[32px] h-[32px] rounded-full cursor-pointer"/></div>
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="text-[14px] font-[600] px-2 cursor-pointer hover:text-[rgb(146,146,146)]">{name}</div>
                            <div className="text-[14px]">{comment}</div>
                        </div>
                        <div className="text-[12px] text-[rgb(196,196,196)] px-2 cursor-default">{time}</div>
                    </div>
                </div>
            )
            :
            (
                <>
                    <div className="h-[43px] w-full flex items-center mb-4">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex items-center">
                                <div className=""><Image alt="avt" src={avt} width={32} height={32} className="w-[32px] h-[32px] rounded-full cursor-pointer"/></div>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <div className="text-[14px] font-[600] px-2 cursor-pointer hover:text-[rgb(146,146,146)]">{name}</div>
                                        <div className="text-[14px] cursor-default">{comment}</div>
                                    </div>
                                    <div className="text-[12px] flex text-[rgb(196,196,196)] cursor-pointer px-2">
                                        <div className="">{time}</div>
                                        <div className="mx-4 font-[600]">{`${like} likes`}</div>
                                        <div className="font-[600]" onClick={() => setIsReply({isReply: true, name: name, id:id, commentId:commentId})}>Reply</div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer hover:text-[rgb(152,152,152)]" onClick={handleLove}>{love ? MiniHearthRed : MiniHearth}</div>
                        </div>
                    </div>
                    <div className="ml-[40px]">
                        {
                            reply.map((item, index) =>
                            {
                                return (
                                    item?.reply === commentId ? 
                                    (
                                        <div key={index} className="h-[43px] w-full flex items-center mb-4">
                                            <ReplyComment item={item} postId={postId} replyId={item?.commentId} commentId={commentId} />
                                        </div>
                                    )
                                    : (<></>)
                                )
                            })
                        }
                    </div>
                </>
            )
        }
        </>
    )
}

export default Comment

