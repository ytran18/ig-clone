import Image from "next/image"
import {CloseIcon} from "../icons/icons"
import Xinsoo from "../icons/xinsoo.jpg"

// firebase
import { auth,db } from "../../src/firebase"
import { endAt, onValue, orderByChild, query, ref, startAt } from "firebase/database"

//hooks
import { useState } from "react"

import NewMessSearchResult from "./NewMessSearchResult"

function NewMessage({handleClose}) {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        onValue(query(ref(db, "/users"), orderByChild("username"), startAt(e.target.value), endAt(e.target.value + '\uf8ff')), (snapshot) =>
        {
            const record = snapshot.val()
            if (record !== null)
            {
                const data = Object.values(record)
                setSearchResult(data)
            }
        })
    }

    const handleCloseNewMess = () => {
        handleClose()
        setSearch("")
        setSearchResult([])
    }

    console.log(searchResult)

    return(
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl">
            <div className=" h-[400px] w-[500px] bg-white rounded-2xl" >
                <div className="h-[15%] relative border-b-[1px] flex items-center justify-center">
                    <div className=" font-semibold text-[20px]">New message</div>
                    <div onClick={handleCloseNewMess} className=" absolute right-2 cursor-pointer">{CloseIcon}</div>
                </div>
                <div className="h-[15%] border-b-[1px] flex items-center px-8">
                    <div className=" font-semibold">TO:</div>
                    <input className=" flex-1 px-5 h-full outline-none" value={search} onChange={handleChangeSearch} placeholder="Search..."/>
                </div>
                <div className="h-[50%] overflow-y-scroll">
                    {searchResult?.map((item, index) => {
                        return(
                            <div key={index} > <NewMessSearchResult item={item} /> </div>
                        )
                    })}
                </div>
                <div className="h-[20%]">
                    <div className="h-[50%] mx-3 my-5 flex items-center justify-center bg-blue-500 rounded-2xl text-white font-semibold cursor-pointer">Chat</div>
                </div>
            </div>
        </div>
    )
}

export default NewMessage