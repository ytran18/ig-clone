import Image from "next/image"
import { useEffect, useState, useLayoutEffect } from "react"
import { CommentIcon, LoveIcon } from "../icons/icons"
import { db } from "../../src/firebase"
import {onValue, ref, set } from "firebase/database"
import Camera  from "../icons/camera.png"
import Messi from "../icons/messi.jpg"
import CreatePost from "./CreatePost"
import Loading from "./Loading"

function Posts({ userData }) {
    const [createPost, setCreatePost] = useState(false)
    const [posts, setPosts] = useState([])

    // useLayoutEffect( () => {
    //     onValue(ref(db, '/posts'), (snapshot) => {
    //         var posts1 = []
    //         snapshot.forEach( (childSnapshot) => {
    //             posts1.push(childSnapshot.val())
    //         });
    //         setPosts(posts1)
    //         console.log(posts)
    //     });
    // }, [])

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
                                            <div className=" relative group mt-[10px]">
                                                <img
                                                        className="h-[300px] w-[300px]"
                                                        src={post.assets}  
                                                        alt = "y ngu"
                                                />
                                                <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                                                    <div className="flex items-center text-white">
                                                        {CommentIcon} 
                                                        <div className=" font-bold text-white">{post.comment}</div>
                                                    </div>
                                                    <div className="flex items-center text-white">
                                                        {LoveIcon}
                                                        <div className=" font-bold text-white">{post.likes}</div>
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