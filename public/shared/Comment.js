import Image from "next/image"

function Comment ({ name, comment, avt, isOwner, time, like })
{
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
                <div className="h-[43px] w-full flex items-center mb-4">
                    <div className=""><Image alt="avt" src={avt} className="w-[32px] h-[32px] rounded-full cursor-pointer"/></div>
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="text-[14px] font-[600] px-2 cursor-pointer hover:text-[rgb(146,146,146)]">{name}</div>
                            <div className="text-[14px] cursor-default">{comment}</div>
                        </div>
                        <div className="text-[12px] flex text-[rgb(196,196,196)] cursor-pointer px-2">
                            <div className="">{time}</div>
                            <div className="mx-4 font-[600]">{`${like} likes`}</div>
                            <div className="font-[600]">Reply</div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Comment

