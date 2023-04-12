import Image from "next/image"
import { useEffect, useState } from "react"

import { get, onValue, orderByChild, query, ref, set } from "firebase/database"
import { db } from "../../src/firebase"

import { MiniHearth, MiniHearthRed } from "../icons/icons"
import { getHoursBetween } from "../utils/functions"

import { useUserPackageHook } from "../redux/hooks"

function ReplyComment ({ item, postId, commentId, replyId, setIsReply })
{
    const newDate = new Date().getTime()

    // user
    const user = useUserPackageHook()

    // state
    const [replyLove, setReplyLove] = useState(false)

    // query
    const getReplys = query(ref(db,`reply/${postId}/${replyId}`))

    // get reply love status
    useEffect(() =>
    {
        onValue(getReplys, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                if (value?.like)
                {
                    value?.like?.some((item) =>
                    {
                        if (item === user?.userId) setReplyLove(true)
                    })  
                }
            }
        })
    },[])

    const handleReplyLove = (commentIds) =>
    {
        setReplyLove(!replyLove)
        const getReply = query(ref(db,`reply/${postId}/${commentIds}`))
        get(getReply).then((snapshot) =>
        {
            if (snapshot.val()?.like)
            {
                snapshot.val()?.like?.some((item) =>
                {
                    if (item === user?.userId)
                    {
                        const newArr = snapshot.val()?.like?.filter((data) => data !== user?.userId)
                        const replyPath = query(ref(db,`reply/${postId}/${commentIds}/like`))
                        set(replyPath, newArr)
                        return true
                    }
                    else {
                        const before = snapshot.val()?.like
                        before.push(user?.userId)
                        const replyPath = query(ref(db,`reply/${postId}/${commentIds}/like`))
                        set(replyPath, before)
                    }
                })
            }
            else {
                const replyPath = query(ref(db,`reply/${postId}/${commentIds}/like`))
                set(replyPath, [user?.userId])
            }
        })
    }
    
    return (
        <div className="flex items-center w-full h-full">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center">
                    <div className=""><Image alt="avt" src={item?.avtOfCommenter} width={32} height={32} className="w-[32px] h-[32px] rounded-full cursor-pointer"/></div>
                    <div className="flex flex-col">
                        <div className="flex">
                        <div className="text-[14px] font-[600] px-2 cursor-pointer hover:text-[rgb(146,146,146)]">{item?.nameOfCommenter}</div>
                            <div className="text-[14px] cursor-default">{item?.caption}</div>
                        </div>
                        <div className="text-[12px] flex text-[rgb(196,196,196)] cursor-pointer px-2">
                            <div className="">{getHoursBetween(item?.time, newDate)}</div>
                            <div className="mx-4 font-[600]">{`${item?.like?.length || 0} likes`}</div>
                            <div className="font-[600]" onClick={() => setIsReply({isReply: true, name: item?.nameOfCommenter, id:item?.userIdOfCommenter, commentId:commentId})}>Reply</div>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer hover:text-[rgb(152,152,152)]" onClick={() => handleReplyLove(item?.commentId)}>{replyLove ? MiniHearthRed : MiniHearth}</div>
            </div>
        </div>
    )
}

export default ReplyComment