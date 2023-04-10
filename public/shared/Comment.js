import Image from "next/image"
import { useEffect, useState } from "react"

import { onValue, query, ref } from "firebase/database"
import { db } from "../../src/firebase"

function Comment ({ id, commentId, name, comment, avt, isOwner, time, like, setIsReply, postId })
{
    // state
    const [reply, setReply] = useState([])

    // query
    const getReplys = query(ref(db,`reply/${postId}/`))

    // get difference time between 2 unix time
    const getHoursBetween = (time1, time2) =>
    {
        const diffInMs = Math.abs(time2 - time1)
        let diff = Math.floor(diffInMs / (1000 * 60 * 60))
        if (diff < 1) return (`${Math.floor(diffInMs / 60000)} m`)
        else if (diff > 24) return (`${Math.floor(diff / 24)} d`)
        else return (`${diff} h`)
    }

    // get replys from database
    useEffect(() =>
    {
        onValue(getReplys, (snapshot) =>
        {
            const value = snapshot.val()
            if (value != null)
            {
                const valueObject = Object.values(value)
                setReply(valueObject)
            }
        })
    },[])

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
                    <div className="ml-[40px]">
                        {
                            reply.map((item, index) =>
                            {
                                const newDate = new Date().getTime()
                                return (
                                    item?.reply === commentId ? 
                                    (
                                        <div key={index} className="h-[43px] w-full flex items-center mb-4">
                                            <div className=""><Image alt="avt" src={item?.avtOfCommenter} width={32} height={32} className="w-[32px] h-[32px] rounded-full cursor-pointer"/></div>
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                <div className="text-[14px] font-[600] px-2 cursor-pointer hover:text-[rgb(146,146,146)]">{item?.nameOfCommenter}</div>
                                                    <div className="text-[14px] cursor-default">{item?.caption}</div>
                                                </div>
                                                <div className="text-[12px] flex text-[rgb(196,196,196)] cursor-pointer px-2">
                                                    <div className="">{getHoursBetween(item?.time, newDate)}</div>
                                                    <div className="mx-4 font-[600]">{`${item?.like?.length || 0} likes`}</div>
                                                    <div className="font-[600]" onClick={() => setIsReply({isReply: true, name: name, id:id, commentId:commentId})}>Reply</div>
                                                </div>
                                            </div>
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

