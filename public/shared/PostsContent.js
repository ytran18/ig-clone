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

    console.log("Comment: ", getComment().length)


    console.log("likes: ",post?.likes )

    const isLove = () => {
        const likes = post?.likes
        return (
            likes.some((like) => {
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
            <div onClick={(e) => {e.stopPropagation()}} className={postPopUp ? "fixed z-50 w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgba(19,18,18,0.71)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl" : "hidden"}>
                <OverLayBlock><PostPopUp close={handlePostPopUp} caption={post?.caption} createAt={post?.createAt} amountOfLove={post?.likes?.length || 0} owner={post?.userId} media={post?.media} postId={post?.postId} loveStatus={love}/></OverLayBlock>
            </div>
        </div>
    )
}

export default PostsContent