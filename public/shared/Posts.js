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
import PostsContent from "./PostsContent"
import OverLayBlock from "./OverLayBlock"

//firebase
import { ref, onValue} from "firebase/database"
import { db } from "../../src/firebase"


function Posts({ userData, isUser }) {
    const [createPost, setCreatePost] = useState(false)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        onValue(ref(db, `/posts/${userData?.userId}/`), (snapshot) => {
            var posts1 = []
            snapshot.forEach( (childSnapshot) => {
                posts1.push(childSnapshot.val())
            });
            setPosts(posts1)
        });
    }, [userData])
    
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
                                        <div className="text-[32px] font-semibold text-center">User doesn't up any posts</div>
                                    </div>
                                )
                            ) :
                            (
                                <div className="flex flex-wrap">
                                {
                                    posts.map( (post) => {
                                        return(
                                            <div className="cursor-pointer select-none relative group mt-[10px] bg-slate-900 sm:h-[300px] h-[100px] sm:w-[300px] w-[100px] flex items-center justify-center mr-[10px]">
                                                <PostsContent post = {post}/>
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