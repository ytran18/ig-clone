//icon/images
import {  } from "../icons/icons"

//component
import ChatContent from "./ChatContent"
import ChatUser from "./ChatUser"

//firebase
import {fireStore} from "../../src/firebase"
import { collection, addDoc, doc, setDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore'


//redux 
import {useUserPackageHook} from "../redux/hooks"
import { useEffect, useState } from "react"

function Chat() {
    const [messages, setMess] = useState([])
    const [messId, setMessId] = useState("")
    const [otherUser, setOtherUser] = useState()

    const user = useUserPackageHook()

    useEffect(() => {
        const q = query(collection(fireStore, `${user?.userId}`))
        onSnapshot(q, (snapshot) => {
            let mess = []
            snapshot.forEach((doc) => {
                mess.push(doc.data())
            })
            setMess(mess)
        })
    },[])

    console.log(messages)

    console.log(messId)

    return(
        <div className="w-full h-full flex">
            <div className="w-[30%] h-full border-r-[1px]">
                <div className="h-[10%] border-b-[1px] flex items-center justify-center">
                    <div className="text-black font-semibold">{user?.username}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div className="h-[90%]"> 
                    {messages.map((mess) => {
                        return(
                            <ChatUser messId = {mess?.messId} lastestMess = {mess?.lastestMess} userId = {mess?.userId} setMessId = {setMessId} messIdState = {messId} setOtherUser = {setOtherUser} />
                        )
                    })}
                </div>
            </div>
            <div className="w-[70%] h-full">
                <ChatContent messId = {messId} otherUser = {otherUser} />
            </div>
        </div>
    )
}

export default Chat