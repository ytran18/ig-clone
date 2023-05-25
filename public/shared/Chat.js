//icon/images
import Image from "next/image"
import XinSoo from "../icons/xinsoo.jpg"

//component
import ChatContent from "./ChatContent"
import ChatUser from "./ChatUser"

//firebase
import {fireStore} from "../../src/firebase"
import { collection, addDoc, doc, setDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore'


//redux 
import {useUserPackageHook} from "../redux/hooks"
import { useEffect, useState } from "react"

function Chat({handleNewMessage}) {
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
    },[messages])

    return(
        <div className="w-full h-full flex">
            <div className="w-[20%] sm:w-[30%] h-full border-r-[1px]">
                <div className="hidden sm:flex h-[10%] border-b-[1px] items-center justify-center">
                    <div className="text-black font-semibold">{user?.username}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div className="h-[90%] overflow-y-scroll scrollbar-hide"> 
                    {messages.map((mess) => {
                        return(
                            <ChatUser messId = {mess?.messId} userId = {mess?.userId} setMessId = {setMessId} messIdState = {messId} setOtherUser = {setOtherUser} />
                        )
                    })}
                </div>
            </div>
            <div className="w-[80%] h-full">
                <ChatContent handleNewMessage = {handleNewMessage} messId = {messId} otherUser = {otherUser} />
            </div>
        </div>
    )
}

export default Chat