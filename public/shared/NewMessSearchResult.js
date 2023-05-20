import Image from "next/image"
import Xinsoo from "../icons/xinsoo.jpg"

function NewMessSearchResult({item}){
    return(
        <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-[rgb(250,250,250)]">
            {/* <Image className="h-[50px] w-[50px] rounded-full" src={Xinsoo}/> */}

            <img src={item?.avatar} className="h-[50px] w-[50px] rounded-full" />

            <div>
                <div className=" font-medium">{item?.username}</div>
                <div className=" text-[#7b7b7b] text-[15px]">{item?.name}</div>
            </div>
        </div>
    )
}

export default NewMessSearchResult