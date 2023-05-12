// icon/image
import Image from "next/image"
import XinSoo from "../icons/xinsoo.jpg"

//hook
import { useEffect, useState } from "react"

//firebase
import {db} from "../../src/firebase"
import { set, ref, update, onValue} from "firebase/database"




function ChatUser({messId,lastestMess,userId,setMessId, messIdState, setOtherUser}){
    const [user, setUser] = useState()

    useEffect(() => {
        onValue(ref(db, 'users/' + userId), (snapshot) => {
            const data = snapshot.val()
            setUser(data)
        })
    },[])

    const handleClick = () => {
        setMessId(messId)
        setOtherUser(user)
    }

    console.log("user: ", user)

    console.log("messId: ", messId)

    console.log("userId: ", userId)

    return(
        <div onClick={handleClick} className={`flex items-center w-full p-2 cursor-pointer ${messId === messIdState ? "bg-[#efefef]" : ""} hover:bg-[#efefef]`}>
            {/* <Image src={XinSoo} className=" rounded-full max-w-[50px] max-h-[50px] mr-4" /> */}
            <img src={user?.avatar} className=" rounded-full max-w-[50px] max-h-[50px] mr-4"/>
            <div className=" overflow-hidden">
                <div className="text-black font-semibold">{user?.username}</div>
                <div className=" text-[#73737c] text-[14px]">{lastestMess}</div>
            </div>
        </div>
    )
}

export default ChatUser