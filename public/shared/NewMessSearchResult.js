import Image from "next/image"
import Xinsoo from "../icons/xinsoo.jpg"

function NewMessSearchResult({item, setUserChat, setSearch}){

    const handleClickResult = () => {
        setUserChat(item?.userId)
        setSearch(item?.username)
    }

    return(
        <div onClick={handleClickResult} className="p-4 flex items-center gap-3 cursor-pointer hover:bg-[rgb(250,250,250)]">
            <img src={item?.avatar} className="h-[50px] w-[50px] rounded-full" />
            <div>
                <div className=" font-medium">{item?.username}</div>
                <div className=" text-[#7b7b7b] text-[15px]">{item?.name}</div>
            </div>
        </div>
    )
}

export default NewMessSearchResult