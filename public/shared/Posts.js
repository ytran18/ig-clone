//hooks
import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks"

// icons/image
import { CommentIcon, LoveIcon, DocumentDuplicate } from "../icons/icons"
import Image from "next/image"
import Camera  from "../icons/camera.png"
import CreatePost from "./CreatePost"
import Loading from "./Loading"

//component
import PostPopUp from "../shared/PostPopUp"

function Posts({ userData, posts, isUser }) {
    const [createPost, setCreatePost] = useState(false)
    const [postPopUp, setPostPopUp] = useState(false)

    console.log(posts)

    console.log(userData);

    const handleCreatePost = () => {
        setCreatePost(!createPost)
    }

    const handlePostPopUp = () => {
        setPostPopUp(!postPopUp)
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
                                isUser(userData?.username) ? 
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
                                ): 
                                (
                                    <div className="flex flex-col items-center justify-center">
                                        <Image className="w-[50px] h-[50px] mb-[20px]" src={Camera} />
                                        <div className="text-[32px] font-semibold">User doesn't up any posts</div>
                                    </div>
                                )
                            ) :
                            (
                                <div className="flex flex-wrap">
                                {
                                    posts.map( (post) => {
                                        return(
                                            <div onClick={handlePostPopUp} className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 h-[300px] w-[300px] flex items-center justify-center mr-[10px]">
                                                
                                                { post.media[0].type == "img" ? 
                                                    (<img className="max-h-[300px] max-w-[300px]" src={post.media[0].url} alt = "post"/>) : 

                                                    (<video className="max-h-[300px] max-w-[300px]" src={post.media[0].url} alt = "post" autoPlay muted/>)
                                                } 

                                                <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                                                    <div className="flex items-center text-white">
                                                        {CommentIcon} 
                                                        <div className=" font-bold text-white">{post.comment == undefined ? "0" : `${post.comment.length}`}</div>
                                                    </div>
                                                    <div className="flex items-center text-white">
                                                        {LoveIcon}
                                                        <div className=" font-bold text-white">{post.likes == undefined ? "0" : `${post.likes.length}`}</div>
                                                    </div>
                                                </div>
                                                    
                                                {   post.media.length > 1 &&
                                                    (<div className=" absolute top-2 right-2 text-white">
                                                        {DocumentDuplicate}
                                                    </div>)
                                                }
                                                <div className={postPopUp ? "fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl" : "hidden"}>
                                                    <PostPopUp caption={post.caption} createAt={post.createAt} amountOfLove={post.likes} owner={userData.userId} />
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