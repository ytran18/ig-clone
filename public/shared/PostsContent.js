//hooks
import { useState, useEffect } from "react"
import { useUserPackageHook } from "../redux/hooks"

// icons/image
import { CommentIcon, LoveIcon, DocumentDuplicate } from "../icons/icons"

//firebase
import {db} from "../../src/firebase"
import { ref, onValue } from "firebase/database"

//component
import PostPopUp from "./PostPopUp"
import OverLayBlock from "./OverLayBlock"

function PostsContent ({post}) {
    const [postPopUp, setPostPopUp] = useState(false)

    const user = useUserPackageHook()

    const getComment = () => {
        let comment = []
        onValue(ref(db,'comments/' + post.postId), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                comment.push(childSnapshot.val())
            })
        })
        return comment
    }

    console.log("likes: ",post?.likes )

    const isLove = () => {
        const likes = post?.likes
        return (
            likes?.some((like) => {
                if(like === user.userId) {return true}
            })
        )
    }

    const love = isLove()

    const handlePostPopUp = () => {
        setPostPopUp(!postPopUp)
    }

    return(
        <div onClick={handlePostPopUp}>
            { post.media[0].type == "img" ? 
                (<img className="sm:max-h-[300px] max-h-[100px] sm:max-w-[300px] max-w-[100px]" src={post.media[0].url} alt = "post"/>) : 

                (<video className="sm:max-h-[300px] max-h-[100px] sm:max-w-[300px] max-w-[100px]" src={post.media[0].url} alt = "post" autoPlay muted/>)
            } 

            <div className=" absolute group-hover:flex justify-evenly items-center inset-0 hidden bg-[rgba(35,35,35,0.16)]">
                <div className="flex items-center text-white">
                    {CommentIcon} 
                    <div className=" font-bold text-white">{getComment().length}</div>
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

            {
                post?.isReels && 
                (<div className=" absolute top-2 right-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                    </svg>
                </div>)
            }
            <div onClick={(e) => {e.stopPropagation()}} className={postPopUp ? "fixed z-50 w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl" : "hidden"}>
                <OverLayBlock><PostPopUp close={handlePostPopUp} caption={post?.caption} createAt={post?.createAt} amountOfLove={post?.likes?.length || 0} owner={post?.userId} media={post?.media} postId={post?.postId} loveStatus={love}/></OverLayBlock>
            </div>
        </div>
    )
}

export default PostsContent