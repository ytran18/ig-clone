import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { CreateIcon, CreateSelectIcon, HomeIcon, HomeSelectIcon, MessagesIcon, MessagesSelectIcon, ReelIcon, ReelSelectIcon, SearchIcon, SearchSelectIcon } from "../icons/icons"

import { useUserPackageHook } from "../redux/hooks"
import CreatePost from "./CreatePost"

function MobileSidebar ()
{
    // user
    const user = useUserPackageHook()

    const [select, setSelect] = useState(0)
    const [createPost, setCreatePost] = useState(false)

    const handleCreatePost = () =>
    {
        setSelect(6); setCreatePost(!createPost)
    }

    return (
        <>
            <div className="flex justify-between w-full h-full px-6">
                <Link href={"/"} onClick={() => { setSelect(0) }}>
                    <div className={`${select === 0 ? "hidden" : "flex"} justify-center items-center`}> {HomeIcon} </div>
                    <div className={`${select === 0 ? "flex" : "hidden"} justify-center items-center`}> {HomeSelectIcon} </div>
                </Link>
                <Link href={"/"} onClick={() => { setSelect(1) }}>
                    <div className={`${select === 1 ? "hidden" : "flex"} justify-center items-center`}> {SearchIcon} </div>
                    <div className={`${select === 1 ? "flex" : "hidden"} justify-center items-center`}> {SearchSelectIcon} </div>
                </Link>
                <Link href={"/"} onClick={() => { setSelect(2) }}>
                    <div className={`${select === 2 ? "hidden" : "flex"} justify-center items-center`}> {ReelIcon} </div>
                    <div className={`${select === 2 ? "flex" : "hidden"} justify-center items-center`}> {ReelSelectIcon} </div>
                </Link>
                <Link href={"/"} onClick={handleCreatePost}>
                    <div className={`${select === 3 ? "hidden" : "flex"} justify-center items-center`}> {CreateIcon} </div>
                    <div className={`${select === 3 ? "flex" : "hidden"} justify-center items-center`}> {CreateSelectIcon} </div>
                </Link>
                <Link href={"/"} onClick={() => { setSelect(4) }}>
                    <div className={`${select === 4 ? "hidden" : "flex"} justify-center items-center`}> {MessagesIcon} </div>
                    <div className={`${select === 4 ? "flex" : "hidden"} justify-center items-center`}> {MessagesSelectIcon} </div>
                </Link>
                <Link href={`/user/${user?.username}`}>
                    <div className="lg:pl-2 md:justify-center md:items-center"> <Image alt="avt" src={user?.avatar} className="w-[24px] h-[24px] rounded-full" width={24} height={24}/> </div>
                </Link>
            </div>
            {
                createPost ? (
                    <div className="z-20">
                        <CreatePost handleCreatePost={handleCreatePost} userData={user} />
                    </div>) 
                : (<></>)
            }
        </>
    )
}

export default MobileSidebar