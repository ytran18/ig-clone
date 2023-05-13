// icon/image
import Image from "next/image"
import XinSoo from "../icons/xinsoo.jpg"

//hook
import { useEffect, useState } from "react"

//redux 
import {useUserPackageHook} from "../redux/hooks"

//firebase
import {db, fireStore} from "../../src/firebase"
import { set, ref, update, onValue} from "firebase/database"
import { collection, addDoc,serverTimestamp, doc, setDoc,where, getDocs, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore'

function ChatUser({messId,userId,setMessId, messIdState, setOtherUser}){
    const [user, setUser] = useState()
    const [lastMess, setLastMess] = useState()

    //user who login
    const mainUser = useUserPackageHook()

    useEffect(() => {
        onValue(ref(db, 'users/' + userId), (snapshot) => {
            const data = snapshot.val()
            setUser(data)
        })
    },[])

    useEffect(() => {
        const queryMessages = query(collection(fireStore, "messages"),where("messId", "==", `${messId}`), orderBy("createdAt"))
        onSnapshot(queryMessages, (snapshot) => {
            let mess = []
            snapshot.forEach((doc) => {
                mess.push(doc.data())
            })
            setLastMess(mess[mess.length - 1])
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
                {/* <div className=" text-[#73737c] text-[14px]">{lastMess}</div> */}
                {
                    mainUser?.userId === lastMess?.userId ?
                    (
                        <div className=" text-[#73737c] text-[14px]">
                            You: {lastMess?.text}
                        </div>
                    ) :
                    
                    (
                        <div className=" text-[#73737c] text-[14px]">{lastMess?.text}</div>
                    )
                }
            </div>
        </div>
    )
}

export default ChatUser