
// icon/image
import Image from "next/image"
import MessageIcon from "../icons/images.png"
import {Phone, VideoCamera, MoreDotIcon, Photo, LoveIcon} from "../icons/icons"
import { useEffect, useState, useRef } from "react"

//firebase
import {fireStore} from "../../src/firebase"
import { collection, addDoc,serverTimestamp, doc, setDoc,where, getDocs, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore'

//redux 
import {useUserPackageHook} from "../redux/hooks"

function ChatContent({handleNewMessage, messId, otherUser}) {

    const [send, setSend] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMess, setNewMess] = useState("")
    const messRef = useRef()

    const user = useUserPackageHook()

    useEffect(() => {
        const queryMessages = query(collection(fireStore, "messages"),where("messId", "==", `${messId}`), orderBy("createdAt"))
        onSnapshot(queryMessages, (snapshot) => {
            let mess = []
            snapshot.forEach((doc) => {
                mess.push(doc.data())
            })
            setMessages(mess)
        })
    },[messId])

    useEffect(() => {
        messRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])

    const handleChange = (e) => {
        if(e.target.value == ""){
            setSend(false)
        }else{
            setSend(true)
        }
        setNewMess(e.target.value)
    }

    console.log(messages)

    console.log(otherUser)

    const handleSend = async (e) => {
        if (e.key === "Enter"){
            await addDoc(collection(fireStore, "messages"), {
                text: newMess,
                createdAt: serverTimestamp(),
                userId: user?.userId,
                messId: messId
            })
            await setNewMess("")
            messRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }

    return(
        <div className="w-full h-full flex items-center justify-center">
            {
                messId === "" ?
                (
                    <div className="flex flex-col items-center">
                        <Image src={MessageIcon} />
                        <div className=" font-medium text-[20px]">Your messages</div>
                        <div>Send private photos and messages to a friend or group</div>
                        <div onClick={handleNewMessage} className="p-4 bg-blue-600 rounded-xl text-white font-semibold cursor-pointer">Send message</div>
                    </div> 
                ) :

                (
                    <div className="w-full h-full">
                        <div className="h-[10%] border-b-[1px] flex items-center justify-between px-4">
                            <div className="flex items-center">
                                <img src={otherUser?.avatar} className="h-[30px] w-[30px] rounded-full mr-3" />
                                <div className="text-black font-semibold cursor-pointer hover:text-[#777373c6]">{otherUser?.username}</div>
                            </div>
                            <div className="flex items-center justify-around w-[150px]">
                                <div className=" cursor-pointer">{Phone}</div>
                                <div className=" cursor-pointer">{VideoCamera}</div>
                                <div className=" cursor-pointer"> {MoreDotIcon} </div>
                            </div>
                        </div>
                        <div className="h-[90%]">
                            <div className="h-[80%] overflow-y-scroll scrollbar-hide">
                                {
                                    messages?.map((message) => {
                                        if(user?.userId == message?.userId){
                                            return(
                                                <div className="flex flex-row-reverse my-2 mx-2">
                                                    <div className="w-fit h-auto rounded-xl border-[1px] px-3 py-2">
                                                        <div>{message?.text}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else{
                                            return(
                                                <div className=" my-4 mx-4 w-fit h-auto rounded-xl border-[1px] px-3 py-2">
                                                    {message?.text}
                                                </div>
                                            )
                                        }
                                    })   
                                }
                                <div ref={messRef}></div>
                            </div>
                            <div className="h-[20%] flex items-center justify-center">
                                <div className=" rounded-3xl border-[1px] w-[90%] h-[50%] flex items-center justify-between px-6">
                                    <input 
                                        onChange={handleChange} 
                                        className=" outline-none w-[90%]" 
                                        placeholder="Messages...."
                                        value={newMess}
                                        onKeyDown={handleSend}/>
                                    <div className={send ? "hidden" : "flex w-[10%] justify-between"}>
                                        <div>{Photo}</div>
                                        <div> {LoveIcon} </div>
                                    </div>
                                    <div className={send ? "w-[10%] text-blue-400" : "hidden"}>
                                        Send
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default ChatContent