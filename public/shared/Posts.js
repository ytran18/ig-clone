//hooks
import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks"

//firebase
import { db } from "../../src/firebase"
import {onValue, ref, set } from "firebase/database"

// icons/image
import { CommentIcon, LoveIcon } from "../icons/icons"
import Image from "next/image"
import Camera  from "../icons/camera.png"
import CreatePost from "./CreatePost"
import Loading from "./Loading"

function Posts({ userData, posts }) {
    const [createPost, setCreatePost] = useState(false)

    console.log(posts)

    const handleCreatePost = () => {
        setCreatePost(!createPost)
    }

    return (
        <div>
            <div className={createPost ? "block" : "hidden"}>
                <CreatePost
                    handleCreatePost = {handleCreatePost} 
                    userData = { userData }
                />
            </div>

            { posts == undefined ? 
                (
                    <div className="flex items-center justify-center">
                        <Loading/>
                    </div>
                ) :
                (
                    <div>
                        {posts.length == 0 ?
                            (
                                <div className="flex flex-col items-center justify-center">
                                    <Image className="w-[50px] h-[50px] mb-[20px]" src={Camera} />

                                    <div className="text-[32px] font-extrabold mb-[20px]">Share Photos</div>

                                    <div className="mb-[10px]">When you share photos, they will appear on your profile.</div>

                                    <div 
                                        className="text-[#2997f6] cursor-pointer hover:text-black"
                                        onClick={handleCreatePost}
                                    >
                                        Share your first photo
                                    </div>
                                </div>
                            ) :
                            (
                                <div className="flex flex-wrap justify-between">
                                {
                                    posts.map( (post) => {
                                        return(
                                            <div className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 h-[300px] w-[300px] flex items-center justify-center">
                                                <img
                                                        className="max-h-[300px] max-w-[300px]"
                                                        src={post.media[0].url}  
                                                        alt = "y ngu"
                                                />
                                                <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                                                    <div className="flex items-center text-white">
                                                        {CommentIcon} 
                                                        <div className=" font-bold text-white">{post.comment == undefined ? "0" : `${post.comment.length}`}</div>
                                                    </div>
                                                    <div className="flex items-center text-white">
                                                        {LoveIcon}
                                                        <div className=" font-bold text-white">{post.likes == undefined ? "0" : `${post.comment.length}`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } )
                                }
                                </div>
                            )
                        }
                    </div>
                    
                )
            }
        </div>
    )
}

export default Posts